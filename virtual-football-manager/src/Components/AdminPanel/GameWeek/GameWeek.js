import React, {Component} from "react";
import {Link} from "react-router-dom";
import GameWeekService from "../../AxiosRepository/axiosGameWeek";


class GameWeek extends Component {

    constructor() {
        super();
        this.state={
            gameweeks:[]
        }
    }

    componentDidMount() {
        GameWeekService.getAllGameWeeks().then((response)=>{
            const newdata = response.data;
            console.log(newdata);
            this.setState((prevState) => {
                return {
                    gameweeks: newdata
                }
            });
        });
    }

    deletegameweek=(id)=>{
        alert("deleting "+id);
        GameWeekService.deleteGameWeek(id).then((response)=>{

            alert("deleted "+id);
            this.setState((prevState) => {
                const newgameweeks = prevState.gameweeks.filter((g) => {
                    return g.id!== id;
                });
                return {gameweeks: newgameweeks}
            })


        });

    }


    showContent=()=> {
        if(this.state.gameweeks.length===0){
            return <h1>No data</h1>
        }
        else
            return (
                <table className="table table-bordered table-dark">
                    <thead>
                    <tr>
                        <th scope="col">GameWeek Name</th>

                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.gameweeks.map((gameweek)=>{

                            return (
                                <tr key={gameweek.id}>
                                    <td>{gameweek.name}</td>
                                    <td>
                                        <button onClick={()=>this.deletegameweek(gameweek.id)} type="button" className="btn btn-danger mr-2">Delete</button>

                                        <button type="button" className="btn btn-light">
                                            <Link to={"/gameweek/"+gameweek.id}>Edit</Link>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>
            )
    }


    render() {
        return(
            <div>
                {
                    this.showContent()
                }


            </div>
        )
    }

}
export default GameWeek