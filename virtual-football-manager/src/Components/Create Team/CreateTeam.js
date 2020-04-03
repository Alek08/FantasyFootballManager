import React, {Component} from 'react';
import filed from "../../Soccer_field22eeee.svg"
import {Container, Row, Col} from 'reactstrap';

import TeamService from "../AxiosRepository/axiosTeam";
import PlayerService from "../AxiosRepository/axiosPlayer";
import FantasyTeamService from "../AxiosRepository/axiosFantasyTeam";
import $ from "jquery";


class CreateTeam extends Component {

    constructor(props) {
        super();
        this.state = {
            player_pos: "P",
            players: [],
            SelectedPlayers: [],
            teams: [],
            selectedClub: "",
            FteamName: ""
        }

    }

    deletePlayer=(e)=>{

        let playerid=parseInt(e.target.id)



        let new_players =  this.state.SelectedPlayers.filter((p) => {
            return p.id !== playerid;
        });

        console.log(new_players)


        this.setState((prevState)=>{
            return {
                SelectedPlayers:new_players
            }
        })


    }

    componentDidMount() {
        TeamService.getAllTeams().then((response) => {
            const newdata = response.data;
            this.setState((prevState) => {
                return {
                    teams: newdata
                }
            });
        });
    }


    FilterPos = (e) => {
        console.log(e.target.value);
        let pos = e.target.value;
        if (pos === "All") {
            PlayerService.getAllPlayersInTeam(this.state.selectedClub).then((response) => {
                const newdata = response.data;
                this.setState((prevState) => {
                    return {
                        players: newdata
                    }
                });
            });
        } else {
            PlayerService.getAllPlayersPosInTeam(pos, this.state.selectedClub).then((response) => {
                const newdata = response.data;
                this.setState((prevState) => {
                    return {
                        players: newdata
                    }
                });
            });

        }

    }


     handleOnChange=(e)=>{

        const paramName = e.target.name;
        const paramValue = e.target.value;
        if(paramName==="FteamName"){

            this.setState((prevState)=>
                {
                    return{
                        FteamName:paramValue
              }})
        }
    }

    saveTeam = () => {

        if(this.props.person.email!=undefined && this.props.person.email!=null && this.props.person.email!='')
        {


            let data={
                name:this.state.FteamName,
                user_email:this.props.person.email,
                total_points:0,
                players: this.state.SelectedPlayers
            }

            FantasyTeamService.addFantasyTeam(data).then((response)=>{

                if(response.status===200)
                {
                    $('#element').toast('show')
                    this.setState(()=>{
                        return{
                            SelectedPlayers: [],
                            selectedClub: "",
                            FteamName: ""

                        }                    })

                }

            }).catch(e => {
                $('#element_failed').toast('show')
            });

        }


    }


    selectClub = (e) => {
        console.log(e.target.value)

        let index = e.target.selectedIndex;
        let el = e.target.childNodes[index]
        let id = el.getAttribute('id');
        console.log(id)

        this.setState((prevState) => {
            return {
                selectedClub: id
            }
        });

        if (id != "none") {
            PlayerService.getAllPlayersInTeam(id).then((response) => {
                const newdata = response.data;
                this.setState((prevState) => {
                    return {
                        players: newdata
                    }
                });
            });
        }


    }


    selectPlayer = (e) => {
        //za obicen select
        // let gameweekName=  e.target.GameWeekNameForMatch.value;
        //         let select=  e.target.matchIdForGameWeek;
        //         let MatchId=select.childNodes[select.selectedIndex].getAttribute('id');

        //za multiple select choice  let id=e.target.id;
        //  let playerName = e.target.value;


        let id = parseInt(e.target.id);
        console.log(id)

        let ChosenPlayer = this.state.players.filter((p) => {
            return p.id === id;
        });


        console.log(ChosenPlayer)

        let name;
        if (ChosenPlayer.length === 0) {
            name = ''
            alert("nema igrac")
            return;
        } else
            name = ChosenPlayer[0].name;


        console.log(name)
        console.log(ChosenPlayer[0].position[0].toUpperCase())
        console.log(this.state.player_pos.toUpperCase())

        if(this.state.player_pos[0].toUpperCase()==="P") {
            alert("Odberi pozocija")
            return;
        }


        if (ChosenPlayer[0].position[0].toUpperCase() != this.state.player_pos[0].toUpperCase()) {
            alert("Ne soodvetna pozicija" + name + " e " + ChosenPlayer[0].position);
        }
else {
name = name.replace(/ +/g, "");
        switch (this.state.player_pos) {
            case "fwd1":
                this.fwd1.removeAttribute("class");
                let fwd1 = "width:40px; height:50px; background-image: url(PlayersImages/" + name + ".png); background-position: center center; background-size: cover; background-repeat: no-repeat;";

                this.fwd1.setAttribute("style", fwd1)
                this.fwd1.setAttribute("class", "btn  players")

                this.setState((prevState) => {
                    return {SelectedPlayers: [...prevState.SelectedPlayers, ChosenPlayer[0]]}
                })
                break;
            case "fwd2":
                this.fwd2.removeAttribute("class");
                let fwd2 = "width:40px; height:50px; background-image: url(PlayersImages/" + name + ".png); background-position: center center; background-size: cover; background-repeat: no-repeat;";
                // let fwd2 = " width:40px; height:50px; background-image: url(/static/media/hazard.00a65de9.png); background-position: center center; background-size: cover; background-repeat: no-repeat;";
                //vo src
                this.fwd2.setAttribute("style", fwd2)
                this.fwd2.setAttribute("class", "btn  players")
                this.setState((prevState) => {
                    return {SelectedPlayers: [...prevState.SelectedPlayers, ChosenPlayer[0]]}
                })
                break;

            case "mid1":
                this.mid1.removeAttribute("class");
                let mid1 = "width:40px; height:50px; background-image: url(PlayersImages/" + name + ".png); background-position: center center; background-size: cover; background-repeat: no-repeat;";

                this.mid1.setAttribute("style", mid1)
                this.mid1.setAttribute("class", "btn  players")
                this.setState((prevState) => {
                    return {SelectedPlayers: [...prevState.SelectedPlayers, ChosenPlayer[0]]}
                })
                break;
            case "mid2":
                this.mid2.removeAttribute("class");
                let mid2 = "width:40px; height:50px; background-image: url(PlayersImages/" + name + ".png); background-position: center center; background-size: cover; background-repeat: no-repeat;";

                this.mid2.setAttribute("style", mid2)
                this.mid2.setAttribute("class", "btn  players")
                this.setState((prevState) => {
                    return {SelectedPlayers: [...prevState.SelectedPlayers, ChosenPlayer[0]]}
                })
                break;
            case "mid3":
                this.mid3.removeAttribute("class");
                let mid3 = "width:40px; height:50px; background-image: url(PlayersImages/" + name + ".png); background-position: center center; background-size: cover; background-repeat: no-repeat;";

                this.mid3.setAttribute("style", mid3)
                this.mid3.setAttribute("class", "btn  players")
                this.setState((prevState) => {
                    return {SelectedPlayers: [...prevState.SelectedPlayers, ChosenPlayer[0]]}
                })
                break;
            case "mid4":
                this.mid4.removeAttribute("class");
                let mid4 = "width:40px; height:50px; background-image: url(PlayersImages/" + name + ".png); background-position: center center; background-size: cover; background-repeat: no-repeat;";

                this.mid4.setAttribute("style", mid4)
                this.mid4.setAttribute("class", "btn  players")
                this.setState((prevState) => {
                    return {SelectedPlayers: [...prevState.SelectedPlayers, ChosenPlayer[0]]}
                })
                break;

            case "def1":
                this.def1.removeAttribute("class");
                let def1 = "width:40px; height:50px; background-image: url(PlayersImages/" + name + ".png); background-position: center center; background-size: cover; background-repeat: no-repeat;";

                this.def1.setAttribute("style", def1)
                this.def1.setAttribute("class", "btn  players")
                this.setState((prevState) => {
                    return {SelectedPlayers: [...prevState.SelectedPlayers, ChosenPlayer[0]]}
                })
                break;
            case "def2":
                this.def2.removeAttribute("class");
                let def2 = "width:40px; height:50px; background-image: url(PlayersImages/" + name + ".png); background-position: center center; background-size: cover; background-repeat: no-repeat;";

                this.def2.setAttribute("style", def2)
                this.def2.setAttribute("class", "btn  players")
                this.setState((prevState) => {
                    return {SelectedPlayers: [...prevState.SelectedPlayers, ChosenPlayer[0]]}
                })
                break;
            case "def3":
                this.def3.removeAttribute("class");
                let def3 = "width:40px; height:50px; background-image: url(PlayersImages/" + name + ".png); background-position: center center; background-size: cover; background-repeat: no-repeat;";

                this.def3.setAttribute("style", def3)
                this.def3.setAttribute("class", "btn  players")
                this.setState((prevState) => {
                    return {SelectedPlayers: [...prevState.SelectedPlayers, ChosenPlayer[0]]}
                })
                break;
            case "def4":
                this.def4.removeAttribute("class");
                let def4 = "width:40px; height:50px; background-image: url(PlayersImages/" + name + ".png); background-position: center center; background-size: cover; background-repeat: no-repeat;";

                this.def4.setAttribute("style", def4)
                this.def4.setAttribute("class", "btn  players")
                this.setState((prevState) => {
                    return {SelectedPlayers: [...prevState.SelectedPlayers, ChosenPlayer[0]]}
                })
                break;
            case "gk":
                this.gk.removeAttribute("class");
                let gk = "width:40px; height:50px; background-image: url(PlayersImages/" + name + ".png); background-position: center center; background-size: cover; background-repeat: no-repeat;";

                this.gk.setAttribute("style", gk)
                this.gk.setAttribute("class", "btn  players")
                this.setState((prevState) => {
                    return {SelectedPlayers: [...prevState.SelectedPlayers, ChosenPlayer[0]]}
                })
                break;
            default:
                alert("Odberi pozocija")


        }
        this.setState(() => {
            return {player_pos: "P"}

        })


    }
    }//



//ref za this.def pogore da se namesti
    CirclerClicked = (e) => {
        console.log(e.target.name);
        let str = e.target.name
        this.setState(() => {
            return {player_pos: str}

        })


    }


    ChooseForm = () => {
        const dis = {
            display: "none"
        }
        const red={
            color:"red"
        }

        const size={
            fontSize:"21px"
        }

        return (
            <div>
                <form>

                    <div className="form-group">
                        <label>Fantasy Team Name</label>
                        <input type="text" onChange={this.handleOnChange} className="form-control" name="FteamName" value={this.state.FteamName}/>
                    </div>


                    <div className="form-control">

                        <label className="radio-inline padding1"><input onClick={this.FilterPos} type="radio" name="pos"
                                                                        value="All"/>All</label>
                        <label className="radio-inline padding1"><input onClick={this.FilterPos} type="radio" name="pos"
                                                                        value="GK"/>GK</label>
                        <label className="radio-inline padding1"><input onClick={this.FilterPos} type="radio" name="pos"
                                                                        value="DEF"/>DEF</label>
                        <label className="radio-inline padding1"><input onClick={this.FilterPos} type="radio" name="pos"
                                                                        value="MID"/>MID</label>
                        <label className="radio-inline padding1"><input onClick={this.FilterPos} type="radio" name="pos"
                                                                        value="FWD"/>FWD</label>
                    </div>


                    <div className="form-group">
                        <label>Choose Club</label>
                        <select onClick={this.selectClub} className="form-control">
                            <option id="none" style={dis}>Select your option</option>
                            {
                                this.state.teams.map((team) => {

                                    return (
                                        <option id={team.id} key={team.id}>{team.teamName}</option>

                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Choose Players</label>
                        <select onClick={this.selectPlayer} multiple className="form-control">
                            {
                                this.state.players.map((player) => {

                                    return (
                                        <option id={player.id}  key={player.id}>{player.name}</option>

                                    )
                                })
                            }
                        </select>
                    </div>

                </form>

                <div className="form-group">
                    <label>Your Players</label>
                        {
                            this.state.SelectedPlayers.map((player) => {

                                return (
                                    <div style={size} key={player.id}>{player.name} <i style={red} id={player.id} key={player.id} onClick={this.deletePlayer} className="fa fa-trash" aria-hidden="true"></i> </div>

                                )
                            })
                        }

                </div>
            </div>
        )
    }

    ImageForm = () => {
        const size = {
            fontSize: "30px",

        }


        return (
            <div className="posrel">


                <object data={filed} width="100%" height="100%"/>
                <button type="button" onClick={this.saveTeam}
                        className="btn btn-success float-md-right float-lg-right float-sm-right">Save
                </button>

                <div className="pos">

                    <div>
                        <Row className="playersrow centerp mb">

                            <button ref={input => {
                                this.fwd1 = input;
                            }} onClick={this.CirclerClicked.bind(this)} style={size} name={"fwd1"}
                                    className='btn players fa fa-plus-circle'></button>
                            <button ref={input => {
                                this.fwd2 = input;
                            }} onClick={this.CirclerClicked.bind(this)} style={size} className="btn fa fa-plus-circle"
                                    name={"fwd2"}></button>


                        </Row>
                        <Row className="playersrow mb">

                            <button ref={input => {
                                this.mid1 = input;
                            }} onClick={this.CirclerClicked} style={size} className="btn players fa fa-plus-circle"
                                    name={"mid1"}></button>
                            <button ref={input => {
                                this.mid2 = input;
                            }} onClick={this.CirclerClicked} style={size} className="btn players fa fa-plus-circle"
                                    name={"mid2"}></button>
                            <button ref={input => {
                                this.mid3 = input;
                            }} onClick={this.CirclerClicked} style={size} className="btn players fa fa-plus-circle"
                                    name={"mid3"}></button>
                            <button ref={input => {
                                this.mid4 = input;
                            }} onClick={this.CirclerClicked} style={size} className="btn players fa fa-plus-circle"
                                    name={"mid4"}></button>

                        </Row>

                        <Row className="playersrow">

                            <button ref={input => {
                                this.def1 = input;
                            }} onClick={this.CirclerClicked} style={size} className="btn players fa fa-plus-circle"
                                    name={"def1"}></button>
                            <button ref={input => {
                                this.def2 = input;
                            }} onClick={this.CirclerClicked} style={size} className="btn players fa fa-plus-circle"
                                    name={"def2"}></button>
                            <button ref={input => {
                                this.def3 = input;
                            }} onClick={this.CirclerClicked} style={size} className="btn players fa fa-plus-circle"
                                    name={"def3"}></button>
                            <button ref={input => {
                                this.def4 = input;
                            }} onClick={this.CirclerClicked} style={size} className="btn players fa fa-plus-circle"
                                    name={"def4"}></button>

                        </Row>

                        <Row className="playersrow gk">

                            <button ref={input => {
                                this.gk = input;
                            }} onClick={this.CirclerClicked} style={size} className="btn players fa fa-plus-circle"
                                    name={"gk"}></button>

                        </Row>


                    </div>


                </div>

            </div>
        )
    }


    render() {


        const formStyle = {
            margin: "35px"
        }

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

        return (

            <Container fluid={false}>

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
                            Failed try another name !
                        </div>
                    </div>
                </div>

                <Row>


                    <Col style={formStyle} xs={12} md={12} sm={12} lg={4} xl={4}>
                        {this.ChooseForm()}
                    </Col>


                    <Col xs={12} md={12} sm={12} lg={7} xl={7}>
                        {this.ImageForm()}


                    </Col>


                </Row>
            </Container>


        );
    }
}

export default CreateTeam;