import React, {useEffect, useState} from "react";
import premierleagueimg from "../premierleagueimg.png";
import TeamService from "../AxiosRepository/axiosTeam";

function LeagueTable(props) {

    const [team,setTeam] = useState({
            teams:[]
        }
    );

    useEffect(() => {
        TeamService.getAllTeams().then((response)=>{
            const newdata = response.data;
            setTeam(()=>{
                return {teams:newdata};
            })
        });


    },[])



    function showContent() {

        team.teams.sort((a, b) => b.total_points - a.total_points)

        if(team.teams.length===0){
            return(<h2>No teams</h2>)
        }
        else {


         return (   <div className="table table-bordered table-dark">

             <img src={premierleagueimg} width="50px" height="50px"/>
             {"ENG  " +
             " Premier League "
             }<p></p>


             <table className="table table-striped table-dark">
                 <thead>
                 <tr>
                     <th scope="col">#</th>
                     <th scope="col">Team</th>
                     <th scope="col">PL</th>
                     <th scope="col">W</th>
                     <th scope="col">D</th>
                     <th scope="col">L</th>
                     <th scope="col">PTS</th>
                 </tr>
                 </thead>
                 <tbody>

                 {


                     team.teams.map((team_item,index)=>{
                         let poz=index+1;

                         return (
                             <tr key={team_item.id}>
                                 <td>{poz}</td>
                                 <td>{team_item.teamName}</td>
                                 <td>{team_item.played_matches}</td>
                                 <td>{team_item.wins}</td>
                                 <td>{team_item.draws}</td>
                                 <td>{team_item.losts}</td>
                                 <td>{team_item.total_points}</td>



                             </tr>
                         )
                     })




                 }

                 </tbody>
             </table>




         </div>)

        }

    }

    return(
       showContent()
    )

}

export default LeagueTable;