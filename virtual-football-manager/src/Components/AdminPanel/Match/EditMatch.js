import React from "react";
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import MatchService from "../../AxiosRepository/axiosMatch";
import { Container, Row, Col } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import PlayerService from "../../AxiosRepository/axiosPlayer";


function EditMatch() {
    const history = useHistory();
    const {matchId} = useParams()


    const [match,setMatch] = useState({
//mora da ima zaradi uncontrolled changing an uncontrolled input
            homeTeamScores: "",
            awayTeamScores: "",
            goalsPlayers: [
                {
                    name: "",
                    team: {
                        total_points: "",
                        wins: "",
                        losts: "",
                        draws: "",
                        id: "",
                        teamName: ""
                    },
                    id: ""
                }
            ],
            assistsPlayers: [
                {
                    name: "",
                    team: {
                        total_points: "",
                        wins: "",
                        losts: "",
                        draws: "",
                        id: "",
                        teamName: ""
                    },
                    id: ""
                }
            ],
            homeTeam: {
                total_points: "",
                wins: "",
                losts: "",
                draws: "",
                id: "",
                teamName: ""
            },
            awayTeam: {
                total_points: "",
                wins: "",
                losts: "",
                draws: "",
                id: "",
                teamName: ""
            },
            gameWeeks: [],
            id: ""

        }
    );

    const [players,setPlayers]=useState(
        {
            players:[]
        }
    );




    useEffect(() => {



        MatchService.getMatch(matchId).then((response)=>{
            console.log(response.data)

            setMatch(response.data)//za state

            let match=response.data;//za localna upotreba


            console.log(match)
            let hometeamId=match.homeTeam.id;
            let awayteamId=match.awayTeam.id;




            PlayerService.getAllPlayersInTeam(hometeamId).then((response)=>{
                const newdata = response.data;
                setPlayers((prevState) => {

                    let edna_lista=[];


                    for (let i = 0; i < newdata.length; i++) {
                        edna_lista.push(newdata[i]);
                    }

                    for (let i = 0; i < prevState.players.length; i++) {
                        edna_lista.push(prevState.players[i]);
                    }

                    return {
                        players:edna_lista
                    }
                });
            });

            PlayerService.getAllPlayersInTeam(awayteamId).then((response)=>{
                const newdata = response.data;
                setPlayers((prevState) => {

                    let edna_lista=[];


                    for (let i = 0; i < newdata.length; i++) {
                        edna_lista.push(newdata[i]);
                    }

                    for (let i = 0; i < prevState.players.length; i++) {
                        edna_lista.push(prevState.players[i]);
                    }

                    return {
                        players:edna_lista
                    }
                });
            });


        });






    },[])


    const updateMatch=(e)=>{
        e.preventDefault();


        var assists = [];
        for (var i = 0, l = e.target.chooseAssistsPlayer.length; i < l; i++) {
            if (e.target.chooseAssistsPlayer[i].selected) {
                assists.push(e.target.chooseAssistsPlayer[i].value);
            }
        }

        var goals = [];
        for (var i = 0, l = e.target.chooseGoalPlayers.length; i < l; i++) {
            if (e.target.chooseGoalPlayers[i].selected) {
                goals.push(e.target.chooseGoalPlayers[i].value);
            }
        }

        let players_with_goals=[];

        for(let i=0;i<goals.length;i++)
        {
            let player_goals=goals[i];

            players_with_goals.push(players.players.filter((p) => {
                return p.name === player_goals;
            }));
        }

        let players_with_assists=[];

        for(let i=0;i<assists.length;i++)
        {
            let player_assists=assists[i];

            players_with_assists.push(players.players.filter((p) => {
                return p.name === player_assists;
            }));
        }

        let score=e.target.chooseScore.value;
        let homescore=score[0];
        let awayscore=score[2];

        let homeTeam=match.homeTeam
        let awayTeam=match.awayTeam


        let goalsPlayers=[];
        let assistsPlayers=[];

        for (let j=0;j<players_with_goals.length;j++)
        {
            let obj={}
            obj=players_with_goals[j][0];

            goalsPlayers.push(obj);

        }


        for (let j=0;j<players_with_assists.length;j++)
        {
            let obj={}
            obj=players_with_assists[j][0];

            assistsPlayers.push(obj);

        }


        let data={
            homeTeam:homeTeam,
            awayTeam:awayTeam,
            homeTeamScores:homescore,
            awayTeamScores:awayscore,
            goalsPlayers: goalsPlayers,
            assistsPlayers: assistsPlayers
        }

        console.log("BBBBBBBBB");
        console.log(data);



        MatchService.updateMatch(matchId,data).then((response)=>{
            const newmatch = response.data;
            setMatch(newmatch);
            history.push("/match")
        })

    }


    return(
        <div>
            <Container>

                <form onSubmit={updateMatch}>
                    <div className="form-group">
                        <label>Home Team</label>
                        <input  readOnly type="text" className="form-control" name={"homeTeamName"} value={match.homeTeam.teamName}/>
                    </div>


                    <div className="form-group">
                        <label>Away Team</label>
                        <input  readOnly type="text" className="form-control" name={"awayTeamName"} value={match.awayTeam.teamName}/>
                    </div>



                    <div className="form-group">
                        <label>Choose Goal Players</label>
                        <select name={"chooseGoalPlayers"} multiple className="form-control" >
                            {
                                players.players.map((player)=>{

                                    return (
                                        <option key={player.id}>{player.name}</option>

                                    )
                                })
                            }

                        </select>
                    </div>

                    <div className="form-group">
                        <label>Choose Assits Players</label>
                        <select  name={"chooseAssistsPlayer"} multiple className="form-control">
                            {
                                players.players.map((player)=>{

                                    return (
                                        <option key={player.id}>{player.name}</option>

                                    )
                                })
                            }

                        </select>
                    </div>


                    <div className="form-group">
                        <label>Score</label>
                        <input name={"chooseScore"} type="text" className="form-control" placeholder="Score"/>
                    </div>


                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </Container>
            <br/>
            <br/>

        </div>
    )
}
export default EditMatch