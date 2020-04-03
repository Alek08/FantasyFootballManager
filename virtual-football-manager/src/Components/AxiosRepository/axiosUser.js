import axios from '../Axios/axios'
import qs from 'qs'

const UserService = {
    getUser: (data)=> {
        return axios.get("/api/user?email="+data.email+"&"+"password="+data.password);
    },
    getAllUsers: ()=> {
        return axios.get("/api/user/get_all_users");
    },
    getAllUsersWithFantasyTeams: ()=> {
        return axios.get("/api/user/get_all_users_with_fantasy_teams");
    },

    addUser: (user) => {
        const formParams = qs.stringify(user);
        return axios.post("/api/user",formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'id':'alek'
            }
        });
    }
}

export default UserService;