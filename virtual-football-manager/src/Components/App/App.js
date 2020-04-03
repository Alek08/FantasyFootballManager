import React,{Component} from 'react';
import backA from '../../back_arrow.jpg';
import '../../App.css';
import Header from "../Header/Header";
import CreateTeam from "../Create Team/CreateTeam";
import AdminPanel from "../AdminPanel/AdminPanel";
import Carousel from "../Carousel/Carousel";
import LeagueTable from "../League Table/LeagueTable";
import MatchResults from "../Match Results/MatchResults";
import FantasyTable from "../FantasyTable/FantasyTable";
import Statistics from "../Statistics/Statistics";
import GameWeekUser from "../GameWeek/GameWeek";


import Team from "../AdminPanel/Team/Team";
import EditTeam from "../AdminPanel/Team/EditTeam";
import Player from "../AdminPanel/Player/Player";
import EditPlayer from "../AdminPanel/Player/EditPlayer";
import Match from "../AdminPanel/Match/Match";
import EditMatch from "../AdminPanel/Match/EditMatch";
import GameWeek from "../AdminPanel/GameWeek/GameWeek";
import EditGameWeek from "../AdminPanel/GameWeek/EditGameWeek";

import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import PlayerService from "../AxiosRepository/axiosPlayer";
import UserService from "../AxiosRepository/axiosUser";
import $ from "jquery";
import TeamService from "../AxiosRepository/axiosTeam";



class App extends Component {

  constructor() {
    super();//ako nema super nema setState i state ??
    this.state={
        user:"nouser",
        person_data:"",
        mostGoalsSum:[],
        mostGoalsTeam:[],
        chartData2:[],
        topPlayers:[],
        chartData1:[],
        gameWeekIdforHeader:""
    }
  }

    componentDidMount() {

        TeamService.MostGoalsSUM().then((response)=>{
            if(response.status===200)
            {
                this.setState(() => {
                    return {
                        mostGoalsSum: response.data
                    }
                })


                TeamService.MostGoalsTeams().then((response)=>{
                    if(response.status===200)
                    {
                        this.setState(() => {
                            return {
                                mostGoalsTeam: response.data
                            }
                        })



                        let suma=this.state.mostGoalsSum;
                        let teams=this.state.mostGoalsTeam;
                        let most_goals=[];
                        for(let i=0;i<teams.length;i++)
                        {
                            most_goals.push( { key: teams[i], values: [ {  y: parseInt(suma[i])  } ] })


                        }


                        this.setState(()=>{
                            return{
                                chartData2: most_goals
                            }
                        })


                    }

                })

            }
        })

        PlayerService.getTopPlayers().then((response)=>{
            if(response.status===200) {
                this.setState(() => {
                    return {
                        topPlayers: response.data
                    }
                })

                let chartTopPlayers=[];

                let top_players=this.state.topPlayers;

                for(let i=0;i<top_players.length;i++)
                {
                    chartTopPlayers.push( { key: top_players[i].name, values: [ {  y: parseInt(top_players[i].total_points)  } ] })
                }

                console.log(chartTopPlayers)

                this.setState(()=>{
                    return{
                        chartData1: chartTopPlayers
                    }
                })


            }
        })



    }

    checkUser=(data)=>{

      let data1={
          "email":data.email,
          "password":data.pass
      }

      console.log(data1)


      UserService.getUser(data1).then(response=>{

          console.log(response)

          if(response.status===200 && response.data.name==='alek' && response.data.email==='alek.krstevski@mail.com')
          {
              $('#element').toast('show')

              var self=this;
              setTimeout(function(){
                  self.setState(()=>{
                      return {user:"admin",person_data:response.data}
                  })

              }, 2000);
          }else if(response.status===200 )
          {
              $('#element').toast('show')

              var self=this;
              setTimeout(function(){
                  self.setState(()=>{
                      return {user:"user",person_data:response.data}
                  })

              }, 2000);
          }

      }).catch(e => {
          $('#element_failed').toast('show')
      });





  }


    RegisterU=(data)=>{


        let data1={
            "name":data.name,
            "email":data.email,
            "password":data.password
        }

        console.log(data1)

        UserService.addUser(data1).then(response=>{

            console.log(response)

            if(response.status===200)
            {
                $('#Relement').toast('show')


            }

        }).catch(e => {
            $('#Relement_failed').toast('show')
        });




    }

    onGameWeekClicked=(gameWeekId)=>{
       // window.location.reload(); ke go odlogira userot

        this.setState(()=>{
            return{
                gameWeekIdforHeader:gameWeekId
            }
        })





    }


    render() {

        const klop={
            backgroundImage: `url(${backA})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        };


        const pos_failed={
            position:"fixed",
            zIndex:"1",
            fontSize:"20px" ,
            backgroundColor: "rgba(204,5,0,0.76)"

        }

        const posrel_failed={
            position:"absolute",
            top: "30%",
            left: "50%"

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

        let nouser=(


            <div>
                <div  aria-live="polite" style={posrel} aria-atomic="true" className="d-flex justify-content-center align-items-center">

                    <div id={"Relement"}  style={pos} className="toast"  role="alert" data-delay={"5000"} aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">

                            <i className="fa fa-check" aria-hidden="true"></i>
                            <strong className="mr-auto"></strong>
                            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="toast-body">
                            Successfully Registered
                        </div>
                    </div>
                </div>


                <div  aria-live="polite" style={posrel_failed} aria-atomic="true" className="d-flex justify-content-center align-items-center">
                    <div id={"Relement_failed"}  style={pos_failed} className="toast"  role="alert" data-delay={"5000"} aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">

                            <i className="fa fa-check" aria-hidden="true"></i>
                            <strong className="mr-auto"></strong>
                            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="toast-body">
                            Registration Failed !
                        </div>
                    </div>
                </div>


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
                            Successfully Login
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
                            Login Failed !
                        </div>
                    </div>
                </div>

                <Router>
                    <Header user={this.state.user} onSubmitR={this.RegisterU} onSubmit={this.checkUser}/>
                    <Route path={"/"} exact render={()=>
                        <div style={klop}>
                            <Carousel/>
                        </div>}>
                    </Route>

                    <Route path={"/createteam"} exact render={()=>
                        <h1>Login or Register to play</h1>}>
                    </Route>

                    <Route path={"/matchresults"} exact render={()=>
                        <div>
                            <h1>Login or Register to play</h1>
                        </div>}>
                    </Route>

                    <Route path={"/leaguetable"} exact render={()=>
                        <div>
                            <h1>Login or Register to play</h1>
                        </div>}>
                    </Route>

                    <Route path={"/statistics"} exact render={()=>
                        <div>
                            <h1>Login or Register to play</h1>
                        </div>}>
                    </Route>
                </Router>
            </div>
        )


        let admin=(
            <Router>

                <Header user={this.state.user}/>

                    <h1 className={"center"}>Admin</h1>

                <Route path={"/create"} exact render={()=>
                    <div>
                        <AdminPanel/>

                    </div>}>
                </Route>

                <Route path={"/team/:teamName"} exact render={()=>
                    <EditTeam />}>

                </Route>

                <Route path={"/team"} exact render={()=>
                    <div>
                        <Team/>

                    </div>}>
                </Route>

                <Route path={"/player/:playerName"} exact render={()=>
                    <div>
                        <EditPlayer/>

                    </div>}>
                </Route>


                <Route path={"/player"} exact render={()=>
                    <div>
                        <Player/>

                    </div>}>
                </Route>

                <Route path={"/match/:matchId"} exact render={()=>
                    <div>
                        <EditMatch/>

                    </div>}>
                </Route>

                <Route path={"/match"} exact render={()=>
                    <div>
                        <Match/>

                    </div>}>
                </Route>


                <Route path={"/gameweek/:gameWeekId"} exact render={()=>
                    <div>
                        <EditGameWeek/>

                    </div>}>
                </Route>

                <Route path={"/gameweek"} exact render={()=>
                    <div>
                        <GameWeek/>

                    </div>}>
                </Route>


            </Router>
        )

            let user=(
            <Router>
                <Header user={this.state.user}  person={this.state.person_data} onGameWeekClick={this.onGameWeekClicked} />

                <Route path={"/"} exact render={()=>
                    <div style={klop}>
                        <Carousel/>

                    </div>}>
                </Route>

                <Route path={"/createteam"} exact render={()=>
                    <CreateTeam person={this.state.person_data}  />}>

                </Route>

                <Route path={"/matchresults"} exact render={()=>
                    <div>
                        <MatchResults />

                    </div>}>

                </Route>
                <Route path={"/leaguetable"} exact render={()=>
                    <div>
                        <LeagueTable/>

                    </div>}>

                </Route>

                <Route path={"/fantasytable"} exact render={()=>
                    <div>
                        <FantasyTable/>

                    </div>}>

                </Route>

                <Route path={"/gameweekuser/:gameWeekId"} exact render={()=>
                    <div>
                        <GameWeekUser gameWeekId={this.state.gameWeekIdforHeader} />

                    </div>}>

                </Route>



                <Route path={"/statistics"} exact render={()=>
                    <div>
                        <Statistics chartData1={this.state.chartData1} chartData2={this.state.chartData2} />

                    </div>}>

                </Route>

            </Router>
            )

        let final;
        if(this.state.user==="admin")
        {
             final=admin

        }
        if(this.state.user==="user"){
            final=user;

        }
        if(this.state.user==="nouser"){
            final=nouser;
        }



        return(<div>

            {
                final
            }

        </div>)
}

}


export default App;
