import React, {Component} from "react";
import {Link} from "react-router-dom";
import PlayerService from "../../AxiosRepository/axiosPlayer";


class Player extends Component {

    constructor() {
        super();
        this.state={
            players:[]
        }
    }

    componentDidMount() {
        PlayerService.getAllPlayers().then((response)=>{
            const newdata = response.data;
            this.setState((prevState) => {
                return {
                    players: newdata
                }
            });
        });
    }

    deleteplayer=(playerName)=>{
        alert("deleting "+playerName);
        PlayerService.deletePlayer(playerName).then((response)=>{

            alert("deleted "+playerName);
            this.setState((prevState) => {
                const newplayer = prevState.players.filter((p) => {
                    return p.name !== playerName;
                });
                return {players: newplayer}
            })


        });

    }


    showContent=()=> {
        if(this.state.players.length===0){
            return <h1>No data</h1>
        }
        else
            return (
                <table className="table table-bordered table-dark">
                    <thead>
                    <tr>
                        <th scope="col">Player Name</th>
                        <th scope="col">Team</th>
                        <th scope="col">Total Points</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.players.map((player)=>{

                            return (
                                <tr key={player.id}>
                                    <td>{player.name}</td>
                                    <td>{player.team.teamName}</td>
                                    <td>{player.total_points || "0"}</td>
                                    <td>
                                        <button onClick={()=>this.deleteplayer(player.name)} type="button" className="btn btn-danger mr-2">Delete</button>

                                        <button type="button" className="btn btn-light">
                                            <Link to={"/player/"+player.name}>Edit</Link>
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
export default Player