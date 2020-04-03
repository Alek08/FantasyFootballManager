import React, {Component} from "react";
import {Link} from "react-router-dom";
import TeamService from "../../AxiosRepository/axiosTeam";


class Team extends Component {



    constructor() {
        super();
        this.state={
            teams:[]
        }
    }


    componentDidMount() {
        TeamService.getAllTeams().then((response)=>{
            const newdata = response.data;
            this.setState((prevState) => {
                return {
                    teams: newdata
                }
            });
        });
    }

    deleteteam=(teamName)=>{
        alert("deleting "+teamName);
        TeamService.deleteTeam(teamName).then((response)=>{

            console.log(response);

            alert("deleted "+teamName);
            this.setState((prevState) => {
                const newteam = prevState.teams.filter((t) => {
                    return t.teamName !== teamName;
                });
                return {teams: newteam}
            })


        });

    }


    showContent=()=> {
        if(this.state.teams.length===0){
            return <h1>No data</h1>
        }
        else
            return (
                <table className="table table-bordered table-dark">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Played Matches</th>
                        <th scope="col">Wins</th>
                        <th scope="col">Draws</th>
                        <th scope="col">Losts</th>
                        <th scope="col">Points</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.teams.map((team)=>{

                            return (
                                <tr key={team.id}>
                                    <td>{team.teamName}</td>
                                    <td>{team.played_matches}</td>
                                    <td>{team.wins}</td>
                                    <td>{team.draws}</td>
                                    <td>{team.losts}</td>
                                    <td>{team.total_points}</td>
                                    <td>
                                        <button onClick={()=>this.deleteteam(team.teamName)} type="button" className="btn btn-danger mr-2">Delete</button>

                                        <button type="button" className="btn btn-light">
                                            <Link to={"/team/"+team.teamName}>Edit</Link>
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
export default Team