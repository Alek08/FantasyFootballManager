import React from "react";
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import PlayerService from "../../AxiosRepository/axiosPlayer";
import { Container, Row, Col } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";


function EditPlayer() {
    const history = useHistory();
    const {playerName} = useParams()
    const [player,setPlayer] = useState({
             name:"",
            total_points: "",
            position: "",
        team:{
            teamName: "",
            total_points:"",
            played_matches: "",
            wins:"",
            losts:"",
            draws:"",
            id: "",
        },
        id:"",
        }
        );



    useEffect(() => {
        PlayerService.getPlayer(playerName).then((response)=>{
            console.log(response.data)
            setPlayer(response.data)
            console.log(player)
        });

    },[])


    const updatePlayer=(e)=>{
        e.preventDefault();


        let data={
            "name":playerName,
            "newname":e.target.playerName.value,
            "total_points":e.target.totalPoints.value

        }


        PlayerService.updatePlayer(data,playerName).then((response)=>{
            const newplayer = response.data;
            setPlayer(() => {
                return {
                    player: newplayer
                }

            });
            history.push("/player")
        })



    }

    const handleOnChange=(e)=>{
        const paramName = e.target.name;
        const paramValue = e.target.value;
        if(paramName==="playerName"){

            setPlayer((prevState)=>({...player,name:paramValue.value}));
        }
        if(paramName==="totalPoints"){

            setPlayer((prevState)=>({...player,total_points:paramValue.value}));
        }

    }



    return(
        <div>
            <Container>

                <form onSubmit={updatePlayer}>

                    <div className="form-group">
                        <p>Player Name</p>
                        <input type="text" onChange={handleOnChange} className="form-control" name={"playerName"} value={player.name}/>
                    </div>

                    <div className="form-group">
                        <p>Total Points</p>
                        <input type="text" onChange={handleOnChange} className="form-control" name={"totalPoints"} value={player.total_points}/>
                    </div>


                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </Container>
        </div>
    )
}
export default EditPlayer