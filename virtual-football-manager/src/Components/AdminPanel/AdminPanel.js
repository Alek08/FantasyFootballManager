import React, {Component} from "react";
import { Container, Row, Col } from 'reactstrap';
import {Link} from "react-router-dom";
import TeamService from "../AxiosRepository/axiosTeam";
import PlayerService from "../AxiosRepository/axiosPlayer";
import MatchService from "../AxiosRepository/axiosMatch";
import GameWeekService from "../AxiosRepository/axiosGameWeek";
import $ from "jquery";
import Team from "./Team/Team";

class AdminPanel extends Component{

    constructor() {
        super();
        this.state={
            matches:[],teams:[],players:[],goalsPlayers:[],assistsPlayers:[]
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


            MatchService.getAllMatches().then((response)=>{
                const newdata = response.data;
                this.setState((prevState) => {
                    return {
                        matches: newdata
                    }
                });
            });


    }


    getAllMatches=()=>{
        MatchService.getAllMatches().then((response)=>{
            const newdata = response.data;
            this.setState((prevState) => {
                return {
                    matches: newdata
                }
            });
        });
    }

    getAllTeams=()=>{
        TeamService.getAllTeams().then((response)=>{
            const newdata = response.data;
            this.setState((prevState) => {
                return {
                    teams: newdata
                }
            });
        });
    }


    selectAwayTeam=(e)=>{

        let index = e.target.selectedIndex;
        let el = e.target.childNodes[index]
        let id =  el.getAttribute('id');
console.log(id)
        if(id==="none")
            return

        PlayerService.getAllPlayersInTeam(id).then((response)=>{
            console.log("away players");
            console.log(response.data);
            const newdata = response.data;
            this.setState((prevState) => {

                let edna_lista=[];

//zosto unique za dva tima da imaat po eden igrac (i koga ke se odbere od home pa potoa od away se brisat tie od home se stavaat od away) no pravi problem so starite mnogu se puni
              //koga ke se klikne save se brisat site od taa lista players vo state
                //novite
                for (let i = 0; i < newdata.length; i++) {
                edna_lista.push(newdata[i]);
                }

                //starite
                for (let i = 0; i < prevState.players.length; i++) {
                    edna_lista.push(prevState.players[i]);
                }


                let Unique = edna_lista.filter((thing, index, self) =>
                    index === self.findIndex((t) => (
                        t.name === thing.name
                    )));



                return {
                    players:edna_lista
                }
            });
        });


    }

    selectHomeTeam=(e)=>{
        //za multiple select choice  let id=e.target.id;

        let index = e.target.selectedIndex;
        let el = e.target.childNodes[index]
        let id =  el.getAttribute('id');
        console.log(id)
        if(id==="none")
            return

        PlayerService.getAllPlayersInTeam(id).then((response)=>{
            const newdata = response.data;
            console.log("home players");
            console.log(response.data);
            this.setState((prevState) => {

                let edna_lista=[];


                for (let i = 0; i < newdata.length; i++) {
                    edna_lista.push(newdata[i]);
                }

               for (let i = 0; i < prevState.players.length; i++) {
                    edna_lista.push(prevState.players[i]);
                }


                let Unique = edna_lista.filter((thing, index, self) =>
                    index === self.findIndex((t) => (
                        t.name === thing.name
                    )));



                return {
                    players:Unique
                }
            });
        });

    }



    createTeam=(e)=> {
        e.preventDefault()


        let data={
            "name":e.target.teamName.value
        }
        e.target.teamName.value=""

        TeamService.addTeam(data).then(response=>{

            console.log(response)

            if(response.status===200)
            {

                $('#element').toast('show')
                TeamService.getAllTeams().then((response)=>{
                    const newdata = response.data;
                    this.setState((prevState) => {
                        return {
                            teams: newdata
                        }
                    });
                })
            }else if(response.data.status===208)
            {
                alert("team laready exists")
            }else {
                alert("team not created")
            }

        }).catch(e => {
            $('#element_failed').toast('show')
        });

    }

    createPlayer=(e)=> {
        e.preventDefault()

        let data={
            "name":e.target.playerName.value,
            "team":e.target.teamNameforPlayer.value,
            "pos":e.target.PlayerPos.value,
        }

        e.target.playerName.value=""
            e.target.teamNameforPlayer.value=""
            e.target.PlayerPos.value=""

        PlayerService.addPlayer(data).then(response=>{

            console.log(response)

            if(response.status===200)
            {
                $('#element').toast('show')
            }else if(response.data.status===208)
            {
                alert("player aready exists")
            }else {
                alert("player not created")
            }

        }).catch(e => {
            $('#element_failed').toast('show')
        });


    }


    AddToGoalList=(e)=>{
        let name=this.goalPlayer.value;
        let player = this.state.players.filter((p) => {
            return p.name === name;
        });
        let goalPlayer=player[0];
        console.log(goalPlayer);

        if(goalPlayer!=undefined)
        {
            this.setState((prevState)=>{
                return{
                    goalsPlayers:[...prevState.goalsPlayers,goalPlayer]
                }
            })
            this.goalPlayer.value="";
        }else
        {
            alert("igracot ne psotoi")
        }
    }

    AddToAssistList=(e)=>{
        let name=this.assistPlayer.value;
        let player = this.state.players.filter((p) => {
            return p.name === name;
        });
        let assistPlayer=player[0];
        console.log(assistPlayer);

        if(assistPlayer!=undefined)
        {
            this.setState((prevState)=>{
                return{
                    assistsPlayers:[...prevState.assistsPlayers,assistPlayer]
                }
            })
            this.assistPlayer.value="";
        }else
        {
            alert("igracot ne psotoi")
        }
    }




    cerateMatch=(e)=>{
        e.preventDefault();
//ako odbirame od select option multiple
        /*
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
         */

        let homeTeam1=e.target.chooseHomeTeam.value


        let teamhome = this.state.teams.filter((t) => {
            return t.teamName === homeTeam1;
        });

        let awayTeam1=e.target.chooseAwayTeam.value

        const teamaway = this.state.teams.filter((t) => {
            return t.teamName === awayTeam1;
        });

/*
        let players_with_goals=[];

        for(let i=0;i<goals.length;i++)
        {
            let player_goals=goals[i];

            players_with_goals.push(this.state.players.filter((p) => {
                return p.name === player_goals;
            }));
        }

        let players_with_assists=[];

        for(let i=0;i<assists.length;i++)
        {
            let player_assists=assists[i];

            players_with_assists.push(this.state.players.filter((p) => {
                return p.name === player_assists;
            }));
        }


 */
        let score=e.target.chooseScore.value;
        let homescore=score[0];
        let awayscore=score[2];

        console.log(teamhome[0])

        let homeTeam=teamhome[0];
        let awayTeam=teamaway[0];


        let goalsPlayers=[];
        let assistsPlayers=[];
/*
        console.log("players_with_goals")
        console.log(players_with_goals) //lista1 so eden obj1 lista2 so eden obj2

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

 */

goalsPlayers=this.state.goalsPlayers;
        assistsPlayers=this.state.assistsPlayers;



        let data={
            homeTeam:homeTeam,
            awayTeam:awayTeam,
            homeTeamScores:homescore,
            awayTeamScores:awayscore,
            goalsPlayers: goalsPlayers,
            assistsPlayers: assistsPlayers
        }

        console.log(data);

        MatchService.addMatch(data).then(response=>{

            console.log(response)

            if(response.status===200)
            {
                $('#element').toast('show')
                this.getAllMatches();
                this.getAllTeams();



                this.setState(()=>{
                    return {
                        players: [],teams:[],goalsPlayers:[],assistsPlayers:[]
                    }
                })
//ako e dodaden natprevarot se brojat natprevarite P.S ke se brojat vo MatchServiceImpl
         //      this.AddTotalMatchesPLayed(homeTeam,awayTeam)

            }else {
                alert("match not created")
            }

        }).catch(e => {
            $('#element_failed').toast('show')
        });




    }

    AddTotalMatchesPLayed=(homeTeam,awayTeam)=>{

        console.log("AddTotalMatchesPLayed")

        TeamService.TotalPlayedMatches(homeTeam.teamName).then(response=>{
            if(response.status===200)
            {
                let izigrani_natprevari=response.data;
                homeTeam.played_matches=izigrani_natprevari;
                TeamService.updateTeam(homeTeam,homeTeam.teamName).then(response=>{

                });
            }

        })
        TeamService.TotalPlayedMatches(awayTeam.teamName).then(response=>{
            if(response.status===200)
            {
                let izigrani_natprevari=response.data;
                awayTeam.played_matches=izigrani_natprevari;
                TeamService.updateTeam(awayTeam,awayTeam.teamName).then(response=>{

                });
            }

        })
    }

    createGameWeek=(e)=>{

        e.preventDefault();

        let name=e.target.GameWeekName.value;

        e.target.GameWeekName.value="";

        let data={
            "gameWeekName":name
        }

        GameWeekService.addGameWeek(data).then(response=>{

            console.log(response)

            if(response.status===200)
            {
                $('#element').toast('show')

            }else if(response.data.status===208)
            {
                alert("gameweek name aready exists")
            }else {
                alert("gameweek not created")
            }

        }).catch(e => {
            $('#element_failed').toast('show')
        });



    }

    addMatchToGameWeek=(e)=>{
        e.preventDefault()

      let gameweekName=  e.target.GameWeekNameForMatch.value;
        let select=  e.target.matchIdForGameWeek;
        let MatchId=select.childNodes[select.selectedIndex].getAttribute('id');



        GameWeekService.getGameWeekByName(gameweekName).then(response=>{

            console.log(response.data)

            if(response.status==404)
            {
                alert("GameWeek not Found")
            }
           else if(response.status==200)
            {
                let gameweek=response.data

                let data={
                    "gameWeekId":gameweek.id,
                    "matchId":MatchId}

                GameWeekService.addMatchToGameWeek(data).then(response=>{


                    if(response.status==200)
                    {
                        $('#element').toast('show')
                    }

                }).catch(e => {
                    $('#element_failed').toast('show')
                });

            }
           else {
               alert("some error occured")
            }



        }).catch(e => {
            $('#element_failed').toast('show')
        });

    }

    render() {
        const pos={
            position:"fixed",
            zIndex:"1",
            fontSize:"20px" ,
            backgroundColor: "#00CC00"

        }

        const posrel={
            position:"absolute",
            top: "30%",
        left: "50%"

        }


        const pos_failed={
            position:"fixed",
            zIndex:"1",
            fontSize:"20px" ,
            backgroundColor: "#cc080f"

        }

        const posrel_failed={
            position:"absolute",
            top: "30%",
            left: "50%"

        }

        const dis={
            display:"none"
        }

        return( <div>



            <div  aria-live="polite" style={posrel} aria-atomic="true" className="d-flex justify-content-center align-items-center">

                <div id={"element"}  style={pos} className="toast"  role="alert" data-delay={"5000"} aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">

                        <i className="fa fa-check" aria-hidden="true"></i>
                        <strong className="mr-auto"></strong>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        Successfully Saved
                    </div>
                </div>
            </div>

            <div  aria-live="polite" style={posrel_failed} aria-atomic="true" className="d-flex justify-content-center align-items-center">

                <div id={"element_failed"}  style={pos_failed} className="toast"  role="alert" data-delay={"5000"} aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">

                        <i className="fa fa-check" aria-hidden="true"></i>
                        <strong className="mr-auto"></strong>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        Failed !
                    </div>
                </div>
            </div>



            <Container fluid={false}>

                <Row>

                    <Col  xs={12}  md={6}  sm={12}  lg={6} xl={6}>
                        <h3>Create Team</h3>

                        <form onSubmit={this.createTeam}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Team Name</label>
                                <input type="text" className="form-control" id="exampleInputEmail1"
                                       name="teamName" aria-describedby="emailHelp" placeholder="Team Name"/>
                            </div>

                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>

                    </Col>


                    <Col xs={12}  md={6} sm={12}  lg={6} xl={6}>

                        <h3>Create Player</h3>

                        <form onSubmit={this.createPlayer}>
                            <div className="form-group">
                                <label>Player Name</label>
                                <input type="text"  name={"playerName"} className="form-control" placeholder="Player Name"/>
                            </div>

                            <select name="PlayerPos" className="form-control" >
                                <option id="none" style={dis}>Select player position</option>
                                <option>GK</option>
                                <option>DEF</option>
                                <option>MID</option>
                                <option>FWD</option>

                            </select>

                            <div className="form-group">
                                <label>Team Name</label>
                                <input type="text" name="teamNameforPlayer" className="form-control" placeholder="Team Name"/>
                            </div>

                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>


                    </Col>

                </Row>



                <Row>
                    <Col xs={12}  md={12} sm={12}  lg={12} xl={12}>
                        <h3>Create Match</h3>

                        <form onSubmit={this.cerateMatch}>
                            <div className="form-group">
                                <label>Choose Home Team</label>
                                <select name={"chooseHomeTeam"} onClick={this.selectHomeTeam}  className="form-control" >
                                    <option id="none" style={dis}>Select your option</option>
                                    {
                                        this.state.teams.map((team)=>{

                                            return (
                                                <option id={team.id} key={team.id}>{team.teamName}</option>

                                            )
                                        })
                                    }

                                </select>
                            </div>

                            <div className="form-group">
                                <label>Choose Away Team</label>
                                <select name={"chooseAwayTeam"} onClick={this.selectAwayTeam}  className="form-control">
                                    <option id="none" style={dis}>Select your option</option>
                                    {
                                        this.state.teams.map((team)=>{

                                            return (
                                                <option id={team.id} key={team.id}>{team.teamName}</option>

                                            )
                                        })
                                    }

                                </select>
                            </div>


                            <div className="form-group">
                                <label>Choose Goal Players</label>
                                <input type="text" ref={input => {
                                    this.goalPlayer = input;
                                }}  name={"goalPlayer"} className="form-control" placeholder="Player Name"/>
                            </div>

                            <button type="button" className="btn btn-success" onClick={this.AddToGoalList}>Add</button>

                            <br />
                            <br />

                            <div className="form-group">
                                <label>Assists Goal Players</label>
                                <input type="text" ref={input => {
                                    this.assistPlayer = input;
                                }}  name={"assistPlayer"} className="form-control" placeholder="Player Name"/>
                            </div>

                            <button type="button" className="btn btn-success" onClick={this.AddToAssistList}>Add</button>
                            <br />
                            <br />

                            <div className="form-group">
                                <label>Goal Players</label>
                                <select  name={"chooseGoalPlayers"}  readOnly multiple className="form-control">
                                    {
                                        this.state.goalsPlayers.map((player)=>{

                                            return (
                                                <option key={player.id}>{player.name}</option>

                                            )
                                        })
                                    }

                                </select>
                            </div>

                            <div className="form-group">
                                <label>Choose Assits Players</label>
                                <select name={"chooseAssistsPlayer"} readOnly multiple className="form-control">
                                    {
                                        this.state.assistsPlayers.map((player)=>{

                                            return (
                                                <option key={player.id}>{player.name}</option>

                                            )
                                        })
                                    }

                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Score</label>
                                <input  name={"chooseScore"} type="text" className="form-control" placeholder="Score"/>
                            </div>

                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>

                    </Col>
                </Row>
                <br />
                <br />

                <Row>
                    <Col xs={12}  md={12} sm={12}  lg={12} xl={12}>
                        <h3>Create GameWeek</h3>

                        <form onSubmit={this.createGameWeek} >
                            <div className="form-group">
                                <label>Name</label>
                                <input  name="GameWeekName" type="text" className="form-control" placeholder="Name"/>
                            </div>

                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>

                    </Col>
                </Row>

                <br />
                <br />

                <Row>
                    <Col xs={12}  md={12} sm={12}  lg={12} xl={12}>

                        <h3>Add Match to GameWeek</h3>

                        <form onSubmit={this.addMatchToGameWeek}>
                            <div className="form-group">
                                <label>GameWeek Name</label>
                                <input name="GameWeekNameForMatch" type="text" className="form-control" placeholder="Name"/>
                            </div>

                            <div className="form-group">
                                <label>Choose Match</label>
                                <select name="matchIdForGameWeek"  className="form-control" >
                                    {
                                        this.state.matches.map((match)=>{

                                            return (
                                                <option id={match.id} key={match.id}>{match.homeTeam.teamName+" : "+match.awayTeam.teamName}</option>

                                            )
                                        })
                                    }

                                </select>
                            </div>


                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>

                    </Col>
                </Row>
                <br />  <br />
            </Container>


        </div>)

    }








}

export default AdminPanel