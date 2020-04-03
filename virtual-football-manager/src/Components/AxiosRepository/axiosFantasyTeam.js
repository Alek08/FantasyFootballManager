import axios from '../Axios/axios'
import qs from 'qs'

const FantasyTeamService = {


    getAllFantasyTeams: ()=> {
        return axios.get("/api/fantasyteam/get_all_fantasy_teams");
    },
    addFantasyTeam: (data) => {
        return axios.post("/api/fantasyteam/add_fantasy_team", data

        );
    }

}

export default FantasyTeamService;