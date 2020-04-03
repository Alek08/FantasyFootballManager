import React from "react";
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import GameWeekService from "../../AxiosRepository/axiosGameWeek";


function EditGameWeek() {
    const history = useHistory();
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


    const handleOnChange=(e)=>{
        const paramName = e.target.name;
        const paramValue = e.target.value;
        if(paramName==="gameWeekName"){

            setGameWeek((prevState)=>({...gameweek,name:paramValue.value}));
        }


    }

    const updateGameWeek=(e)=>{
        e.preventDefault()

        let newname=e.target.gameWeekName.value;

        let data={
            "newname":newname
        }


        GameWeekService.updateGameWeek(gameWeekId,data).then((response)=>{


            if(response.status===200)
            {
                setGameWeek(response.data)
                history.push("/gameweek")
            }

        });


    }


    return(
        <div>

            <Container>

                <form onSubmit={updateGameWeek}>

                    <div className="form-group">
                        <p>GameWeek Name</p>
                        <input type="text" onChange={handleOnChange} className="form-control" name={"gameWeekName"} value={gameweek.name}/>
                    </div>


                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </Container>


        </div>
    )
}
export default EditGameWeek