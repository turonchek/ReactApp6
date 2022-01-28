import React, {PureComponent} from "react";
import { Pagination } from "../Pagination/Pagination";
import { SWShipsList } from "../SWShipsList/SWShipsList";

export class SWShipsPage extends PureComponent{

    constructor(props){
        super(props);

        this.state = {
            status: 'initial',
            error:null,
            data:[],
            currentPage:1
        };
    }


    handlePageClick = (data) => {
        let currentPage=1+data.selected;
        this.setState ({
            currentPage,
        }, ()=>{
            this.fetchData();
        })
    }
    componentDidUpdate(){
        console.log(`update`)
    }

    fetchData = () => {
        this.setState({
            status:'loading',
            error:null,
            data:[],
        });

        fetch(`https://www.swapi.tech/api/starships?page=${this.state.currentPage}&limit=10`)
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                this.setState({
                    status: `success`,
                    error: null,
                    data:result,
                });
            })
            .catch((error) => {
                this.setState({
                    status: `error`,
                    error:error.message,
                });
            })
    }

    render(){
        console.log(`render`)
        const { status, error, data, currentPage } = this.state;
        return(
            <div>
                <SWShipsList 
                    data={data.results}
                    status={status}
                    error={error}
                    />
                {status===`success` && <Pagination 
                                            handlePageClick={this.handlePageClick}
                                            pageCount={data.total_pages}
                                            currentPage={currentPage}
                                        />
                }
            </div>
        );
    }

    componentDidMount() {
        console.log(`mount`)
        this.fetchData();
    }
}
