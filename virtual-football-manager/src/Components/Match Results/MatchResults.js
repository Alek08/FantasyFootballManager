import React, {useEffect, useState} from "react";
import premierleagueimg from "../premierleagueimg.png"

import MatchService from "../AxiosRepository/axiosMatch";

function MatchResult(props) {

    const [match,setMatch] = useState({
            matches:[]
    }
    );

    useEffect(() => {
        MatchService.getAllMatches().then((response)=>{
            const newdata = response.data;
        setMatch(()=>{
            return {matches:newdata};
        })
        });
     },[])


    function showContent() {

        if(match.matches.length===0)
        {
            return (<h2>No matches</h2>)
        }
        else {

            return (  <div>
                <div className="table table-bordered table-dark">

                    <img src={premierleagueimg} width="50px" height="50px"/>
                    {"ENG  " +
                    " Premier League "
                    }<p></p>

                    <table className="table table-bordered table-dark">
                        <thead>
                        <tr>
                            <th scope="col">Home Team</th>
                            <th scope="col">Result</th>
                            <th scope="col">Away Team</th>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            match.matches.map((matchh,index)=>{
                                let poz=index+1;

                                return (
                                    <tr key={matchh.id}>
                                        <td>{matchh.homeTeam.teamName}</td>
                                        <td>{matchh.homeTeamScores +" : "+matchh.awayTeamScores}</td>
                                        <td>{matchh.awayTeam.teamName}</td>
                                    </tr>
                                )
                            })

                        }

                        </tbody>
                    </table>
                </div>


            </div>)

        }
    }

    return(

      showContent()

    )
}
export default MatchResult;