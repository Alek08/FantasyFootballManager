
import React, {Component, useEffect, useState} from "react";
import {useParams} from "react-router";
import GameWeekService from "../AxiosRepository/axiosGameWeek";
import { Container, Row, Col } from 'reactstrap';
import premierleagueimg from "../premierleagueimg.png";
function GameWeek(props){

    const {gameWeekId} = useParams()

    const [gameweek,setGameWeek] = useState({
        name: "",
        matches: [],
        id: ""


    })


    useEffect(() => {
        GameWeekService.getGameWeek(gameWeekId).then((response)=>{

            setGameWeek(response.data)

        });


    },[])







    function showPlayers(match) {

        let players=[];
        const s={
            marginLeft:"15px"
        }
        for(let i=0;i<match.goalsPlayers.length;i++)
        {
            players.push(<div style={s} key={i}>{match.goalsPlayers[i].name}</div>)
        }


        return (<div>{players}</div>)


    }

    function showContent() {
    //    console.log("local "+gameweek.id)
     //   console.log("props "+props.gameWeekId)

        if(props.gameWeekId!=gameweek.id)
        {

            GameWeekService.getGameWeek(gameWeekId).then((response)=>{

                setGameWeek(response.data)

            });

//console.log("CALL "+props.gameWeekId)
        }




        const left={
            marginLeft: "40px",
            fontSize: "25px",
            fontWeight:"bold"
        }
        if(gameweek.matches.length===0)
        {
            return(<h2>no matches</h2>)
        }else
        {
            return(
                <div>
                    <div className="table table-bordered table-dark">

                        <img src={premierleagueimg} width="50px" height="50px"/>
                        {"ENG  " +
                        " Premier League "

                        }
                        <p style={left}>{ gameweek.name}</p>

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
                                gameweek.matches.map((match)=>{


                                    return (
                                        <tr key={match.id}>
                                            <td>{match.homeTeam.teamName}</td>
                                            <td style={tc}><div>
                                                <div className="dropdown">
                                                    <button style={sty} key={match.id} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        {match.homeTeamScores}  : {match.awayTeamScores}
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">

                                                        {
                                                            showPlayers(match)
                                                        }



                                                    </div>
                                                </div>

                                            </div></td>
                                            <td>{match.awayTeam.teamName}</td>
                                        </tr>
                                    )
                                })

                            }

                            </tbody>
                        </table>
                    </div>


                </div>




            )
        }

    }


    const sty={
        fontSize:"20px",
      //  width:"100%"
        width: "50%",
    margin: "auto"
    }

    const tc={
        textAlign:"center"

    }


        return(<div>

                {
            showContent()
                }


        </div>)



}

export default GameWeek