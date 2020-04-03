import axios from '../Axios/axios'
import qs from 'qs'

const PlayerService = {
    getPlayer: (playerName)=> {
        return axios.get("/api/player/"+playerName);
    },
    getAllPlayers: ()=> {
        return axios.get("/api/player/get_all_players");
    },
    getTopPlayers: ()=> {
        return axios.get("/api/player/get_top_players");
    },
    getAllPlayersPosInTeam: (pos,teamId)=> {
        return axios.get("/api/player/?pos="+pos+"&teamId="+teamId);
    },
    getAllPlayersInTeam: (teamId)=> {
        return axios.get("/api/player/get_all_players_in_team/"+teamId);
    },
    addPlayer: (data) => {
        const formParams = qs.stringify(data);
        return axios.post("/api/player/add_player",formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'id':'alek'
            }
        });
    },
    updatePlayer : (data,playerName) => {
        const formParams = qs.stringify(data);
        return axios.patch("/api/player/"+playerName,formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'id':'alek'
            }
        });
    },

    deletePlayer : (playerName) => {
        return axios.delete("/api/player/"+playerName ,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'id':'alek'
            }
        });
    }


}

export default PlayerService;