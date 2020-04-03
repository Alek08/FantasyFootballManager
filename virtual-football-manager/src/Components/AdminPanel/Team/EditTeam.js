import React from "react";
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import TeamService from "../../AxiosRepository/axiosTeam";
import { Container, Row, Col } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";


function EditTeam() {
    const history = useHistory();
    const {teamName} = useParams()
    const [team,setTeam] = useState({
        total_points:"",
            wins:"",
            losts:"",
            draws:"",
            id: "",
            teamName: "",
            played_matches:""
    }


    );
    useEffect(() => {
        TeamService.getTeam(teamName).then((response)=>{
            console.log(response.data)
            setTeam(response.data)
        });

    },[])


     const updateTeam=(e)=>{
         e.preventDefault();


         let data={
             "wins":e.target.wins.value,
             "losts":e.target.losts.value,
             "draws":e.target.draws.value,
             "total_points":e.target.total_points.value,
             "played_matches":e.target.played_matches.value
         }


         TeamService.updateTeam(data,teamName).then((response)=>{
             const newteam = response.data;
             setTeam(() => {
                 return {
                     team: newteam
                 }

             });
             history.push("/team")
         })



     }

    const handleOnChange=(e)=>{
        const paramName = e.target.name;
        const paramValue = e.target.value;
        if(paramName==="teamName"){

            setTeam((prevState)=>({...team,teamName:paramValue.value}));
        }
        if(paramName==="played_matches"){

            setTeam((prevState)=>({...team,played_matches:paramValue.value}));
        }
        if(paramName==="wins"){

            setTeam((prevState)=>({...team,wins:paramValue.value}));
        }
        if(paramName==="losts"){

            setTeam((prevState)=>({...team,losts:paramValue.value}));
        }
        if(paramName==="draws"){

            setTeam((prevState)=>({...team,draws:paramValue.value}));
        }
        if(paramName==="total_points"){

            setTeam((prevState)=>({...team,total_points:paramValue.value}));
        }


    }

    return(
        <div>
            <Container>

            <form onSubmit={updateTeam}>

                <div className="form-group">
                    <p>Team Name</p>

                    <input  readOnly type="text" className="form-control" name={"teamName"} value={team.teamName}/>


                </div>

                <div className="form-group">
                    <label>Played Matches</label>
                    <input type="text" onChange={handleOnChange} className="form-control" name={"played_matches"} value={team.played_matches}/>
                </div>

                <div className="form-group">
                    <label>Wins</label>
                    <input type="text" onChange={handleOnChange} className="form-control" name={"wins"} value={team.wins}/>
                </div>

                <div className="form-group">
                    <label >losts</label>
                    <input type="text" onChange={handleOnChange} className="form-control" name={"losts"} value={team.losts }/>

                </div>
                <div className="form-group">
                    <label >draws</label>
                    <input type="text" onChange={handleOnChange} className="form-control" name={"draws"} value={team.draws}/>

                </div>
                <div className="form-group">
                    <label >total_points</label>
                    <input type="text" onChange={handleOnChange} className="form-control" name={"total_points"} value={team.total_points}/>
                </div>



                <button type="submit" className="btn btn-primary">Save</button>
            </form>
            </Container>
            <br />
        </div>
    )
}
export default EditTeam