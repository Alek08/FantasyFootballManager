import React, {Component} from "react";
import premierleagueimg from "../premierleagueimg.png";
import UserService from "../AxiosRepository/axiosUser";

class FantasyTable extends Component {

    constructor() {
        super();
        this.state={
            fantasy_users:[]
        }


    }

    componentDidMount(){

        UserService.getAllUsersWithFantasyTeams().then((response)=>{
            if(response.status===200)
            {
                this.setState((prevState)=>{
                    return{
                        fantasy_users:response.data
                    }
                })



            }
        })






    }



     showContent=()=>{
         this.state.fantasy_users.sort((a, b) => b.fantasyTeam.total_points - a.fantasyTeam.total_points)

         if(this.state.fantasy_users.length===0)
            return(<h2>No users</h2>)
         else
        {
            return(
                <div className="table table-bordered table-dark">

                    <img src={premierleagueimg} width="50px" height="50px"/>
                    {"ENG  " +
                    " Fantasy League "
                    }<p></p>


                    <table className="table table-striped table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User</th>
                            <th scope="col">Fantasy Team Name</th>
                            <th scope="col">PTS</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            this.state.fantasy_users.map((user,index)=>{
                                    let poz=index+1;
                                    return (


                                        <tr key={user.id}>
                                            <td>{poz}</td>
                                            <td>{user.name}</td>
                                            <td>{user.fantasyTeam.name}</td>
                                            <td>{user.fantasyTeam.total_points}</td>

                                        </tr>

                                    )




                            })
                        }

                        </tbody>
                    </table>

                </div>
            )
        }

    }

    render() {

        return(
            this.showContent()
        )
    }


}

export default FantasyTable;