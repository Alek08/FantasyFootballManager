import React, {Component, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import $ from "jquery";
import GameWeeksService from "../AxiosRepository/axiosGameWeek";
 function Header(props) {

     const [gameWeeks,setGameWeeks] = useState({
          gameWeeks:[]
         }
     );


     useEffect(() => {
         GameWeeksService.getAllGameWeeks().then((response)=>{
             console.log(response.data)
             setGameWeeks(()=>{
                 return {gameWeeks:response.data};
             })

         });

     },[])



     function GameWeekClick(e) {
        // props.onGameWeekClick();

         console.log(e.target.id);

         let gameWeekId=e.target.id;

         props.onGameWeekClick(gameWeekId);


     }

function User() {
    const margin={
        marginRight:"20px",
        fontSize:"20px",
        fontStyle:"bold",
        color: "#8e9296"
    }

        let name=props.person.name;

    if(name.length===0)
    {
        return('')
    }
    else {

        return (<div style={margin}>Hello {name}</div>)
    }

}

     const RegisterUser=(e)=>{
         e.preventDefault();

        let name1= e.target.regName.value;
        let email1= e.target.regEmail.value;
        let pass1= e.target.regPass.value;


         if(name1.length===0 || email1.length===0 || pass1.length===0)
         {
             alert("All fields required")

         }
         else
         {
             $(function () {
                 $('#modalRegisterForm').modal("hide")
             });

             props.onSubmitR(
                 {
                     "name": e.target.regName.value,
                     "email": e.target.regEmail.value,
                     "password": e.target.regPass.value
                 }
             )
         }
     }


      const checkUser=(e)=>{
          e.preventDefault();


          $(function () {
              $('#modalLoginForm').modal("hide")
          });

          props.onSubmit(
             {
                 "pass": e.target.pass.value,
                 "email": e.target.email.value
             }
         )

     }

     const logout=()=>{

         window.location.reload();
     }

      const register=()=>{

         return(

             <form id="RegForm" onSubmit={RegisterUser}>

             <div className="modal fade" id="modalRegisterForm" tabIndex="-1" role="dialog"
                  aria-labelledby="myModalLabel"
                  aria-hidden="true" >
                 <div className="modal-dialog" role="document">
                     <div className="modal-content">
                         <div className="modal-header text-center">
                             <h4 className="modal-title w-100 font-weight-bold">Sign up</h4>
                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                             </button>
                         </div>
                         <div className="modal-body mx-3">
                             <div className="md-form mb-5">
                                 <i className="fa fa-user prefix grey-text"></i>
                                 <label data-error="wrong" data-success="right" >Your name</label>
                                 <input type="text" name="regName" placeholder="name" className="form-control validate"/>

                             </div>
                             <div className="md-form mb-5">
                                 <i className="fa fa-envelope prefix grey-text"></i>
                                 <label data-error="wrong" data-success="right" >Your email</label>
                                 <input type="email" name="regEmail" placeholder="name@example.com" className="form-control validate"/>

                             </div>

                             <div className="md-form mb-4">
                                 <i className="fa fa-lock prefix grey-text"></i>
                                 <label data-error="wrong" data-success="right" >Your password</label>
                                 <input type="password"  name="regPass" placeholder="password" className="form-control validate"/>

                             </div>

                         </div>
                         <div className="modal-footer d-flex justify-content-center">
                             <button className="btn btn-danger">Sign up</button>
                         </div>
                     </div>
                 </div>
             </div>
             </form>

         )
     }

      const login=()=> {

         return(
             <form onSubmit={checkUser}>
             <div className="modal fade" id="modalLoginForm" tabIndex="-1" role="menu" aria-labelledby="myModalLabel"
                  aria-hidden="true" data-backdrop="false">
                 <div className="modal-dialog" role="document">
                     <div className="modal-content">

                         <div className="modal-header text-center">
                             <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                             </button>
                         </div>

                         <div className="modal-body mx-3">
                             <div className="md-form mb-5">
                                 <i className="fa fa-envelope prefix grey-text"></i>
                                 <label >Email address</label>

                                     <input type="email"  name="email" className="form-control" placeholder="name@example.com"/>

                             </div>

                             <div className="md-form mb-4">
                                 <i className="fa fa-lock prefix grey-text"></i>
                                 <label data-error="wrong" data-success="right" >Your password</label>
                                 <input type="password" name="pass"  placeholder="password" className="form-control validate"/>

                             </div>

                         </div>


                         <div className="modal-footer d-flex justify-content-center">

                             <button type="submit"  className="form-group" className="btn btn-success">Login</button>

                         </div>

                     </div>
                 </div>
             </div>
             </form>
         )
    }
    let nav;
     const margin_left={
         marginLeft:"10px"
     }
    if(props.user==="user")
    {
        nav=(
            <div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Football Fantasy Manager</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">

                        <Link className="nav-link"  to={"/"}>Home<span className="sr-only">(current)</span></Link>

                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"  to={"/createteam"}>Create Team</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"  to={"/matchresults"}>Match Results</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link"  to={"/leaguetable"}>League Table</Link>

                    </li>

                    <li className="nav-item">
                        <Link className="nav-link"  to={"/fantasytable"}>Fantasy Table</Link>

                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Game Week
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {
                                gameWeeks.gameWeeks.map((gameWeek)=>{
                                    return (<div style={margin_left} key={gameWeek.id}  >
                                        <Link onClick={GameWeekClick} id={gameWeek.id} key={gameWeek.id}  to={"/gameweekuser/"+gameWeek.id}>
                                           {gameWeek.name}

                                            </Link>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link"  to={"/statistics"}>Statistics</Link>

                    </li>

                </ul>
            </div>

               {User()}

            <button onClick={logout} type="button"  className="btn btn-outline-danger mr-2">Logout</button>


        </nav>

            </div>

        )

    }
    else if(props.user==="admin"){
        nav=(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Football Fantasy Manager</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">

                            <Link className="nav-link"  to={"/create"}>Create<span className="sr-only"></span></Link>

                        </li>
                        <li className="nav-item active">

                            <Link className="nav-link"  to={"/team"}>Team<span className="sr-only"></span></Link>

                        </li>
                        <li className="nav-item active">

                            <Link className="nav-link"  to={"/player"}>Player<span className="sr-only"></span></Link>

                        </li>
                        <li className="nav-item active">

                            <Link className="nav-link"  to={"/match"}>Match<span className="sr-only"></span></Link>

                        </li>
                        <li className="nav-item active">

                            <Link className="nav-link"  to={"/gameweek"}>GameWeek<span className="sr-only"></span></Link>

                        </li>

                    </ul>
                </div>

                <button onClick={logout} type="button"  className="btn btn-outline-danger mr-2">Logout</button>



            </nav>

        )
    }
    else {
        nav=(
            <div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Football Fantasy Manager</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">

                        <Link className="nav-link"  to={"/"}>Home<span className="sr-only">(current)</span></Link>

                    </li>

                </ul>
            </div>

            <button type="button" data-toggle="modal" data-target="#modalLoginForm"  className="btn btn-outline-success  mr-2">Login</button>

            <button type="button" className="btn btn-outline-danger" data-toggle="modal"
                    data-target="#modalRegisterForm">Register</button>




        </nav>
                {login()}
                {register()}
            </div>

        )
    }



        return(<div>

            {nav}


           </div>)






}




export default Header;