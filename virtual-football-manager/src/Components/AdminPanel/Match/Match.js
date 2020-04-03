import React, {Component} from "react";
import {Link} from "react-router-dom";
import MatchService from "../../AxiosRepository/axiosMatch";


class Match extends Component {

    constructor() {
        super();
        this.state={
            matches:[]
        }
    }

    componentDidMount() {
        MatchService.getAllMatches().then((response)=>{
            const newdata = response.data;
            console.log(newdata);
            this.setState((prevState) => {
                return {
                    matches: newdata
                }
            });
        });
    }

    deletematch=(id)=>{
        alert("deleting "+id);
        MatchService.deleteMatch(id).then((response)=>{

            alert("deleted "+id);
            this.setState((prevState) => {
                const newmatches = prevState.matches.filter((m) => {
                    return m.id!== id;
                });
                return {matches: newmatches}
            })


        });

    }


    showContent=()=> {
        if(this.state.matches.length===0){
            return <h1>No data</h1>
        }
        else
            return (
                <table className="table table-bordered table-dark">
                    <thead>
                    <tr>
                        <th scope="col">Home Team</th>
                        <th scope="col">Away Team</th>
                        <th scope="col">Home Score</th>
                        <th scope="col">Away Score</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.matches.map((match)=>{

                            return (
                                <tr key={match.id}>
                                    <td>{match.homeTeam.teamName}</td>
                                    <td>{match.awayTeam.teamName}</td>
                                    <td>{match.homeTeamScores}</td>
                                    <td>{match.awayTeamScores}</td>
                                    <td>
                                        <button onClick={()=>this.deletematch(match.id)} type="button" className="btn btn-danger mr-2">Delete</button>

                                        <button type="button" className="btn btn-light">
                                            <Link to={"/match/"+match.id}>Edit</Link>
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
export default Match