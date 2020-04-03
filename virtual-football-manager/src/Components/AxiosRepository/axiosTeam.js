import axios from '../Axios/axios'
import qs from 'qs'

const TeamService = {
    getTeam: (teamName)=> {
        return axios.get("/api/team/"+teamName);
    },
     getAllTeams: ()=> {
        return axios.get("/api/team/get_all_teams");
    },
    MostGoalsSUM: ()=> {
        return axios.get("/api/team/most_goals_sum");
    },
    MostGoalsTeams: ()=> {
        return axios.get("/api/team/most_goals_teams");
    },
    addTeam: (teamName) => {
        const formParams = qs.stringify(teamName);
        return axios.post("/api/team/add_team",formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'id':'alek'
            }
        });
    },
    TotalPlayedMatches: (teamName)=> {
        return axios.get("/api/team/playedmatches?teamName="+teamName);
    },
    updateTeam : (data,teamName) => {
        const formParams = qs.stringify(data);
        return axios.patch("/api/team/"+teamName,formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'id':'alek'
            }
        });
    },

    deleteTeam : (teamName) => {
        return axios.delete("/api/team/"+teamName ,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'id':'alek'
            }
        });
    }


}

export default TeamService;