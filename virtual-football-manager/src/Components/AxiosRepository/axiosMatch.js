import axios from '../Axios/axios'
import qs from 'qs'

const MatchService = {
    getMatch: (id)=> {
        return axios.get("/api/match/"+id);
    },
    getAllMatches: ()=> {
        return axios.get("/api/match/get_all_matches");
    },
    addMatch: (data) => {
        return axios.post("/api/match/add_match", data);
    },
    updateMatch : (matchId,data) => {
        return axios.patch("/api/match/"+matchId,data);
    },

    deleteMatch : (id) => {
        return axios.delete("/api/match/"+id ,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'id':'alek'
            }
        });
    }


}

export default MatchService;