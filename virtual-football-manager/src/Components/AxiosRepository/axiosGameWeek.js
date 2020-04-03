import axios from '../Axios/axios'
import qs from 'qs'

const GameWeekService = {
    getGameWeek: (id)=> {
        return axios.get("/api/gameweek/"+id);
    },
    getGameWeekByName: (name)=> {

        return axios.get("/api/gameweek?gameweekname="+name);
    },
    getAllGameWeeks: ()=> {
        return axios.get("/api/gameweek/get_all_gameweeks");
    },
    addGameWeek: (data) => {
        const formParams = qs.stringify(data);
        return axios.post("/api/gameweek/add_gameweek",formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'id':'alek'
            }
        });
    },
    addMatchToGameWeek: (data) => {
        const formParams = qs.stringify(data);
        return axios.post("/api/gameweek/add_match_to_gameweek",formParams);

    },
    updateGameWeek : (id,data) => {
        const formParams = qs.stringify(data);
        return axios.patch("/api/gameweek/"+id,formParams);
    },

    deleteGameWeek : (id) => {
        return axios.delete("/api/gameweek/"+id ,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'id':'alek'
            }
        });
    }


}

export default GameWeekService;