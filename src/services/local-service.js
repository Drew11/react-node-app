import axios from 'axios';

class LocalService {

    static base_url = 'http://localhost:8000/api/';

    static async getSource (urlRoute, params ){
        const reqUrl = `${this.base_url}${urlRoute}`;
        const promise = await axios.get(reqUrl, {params: params});

        if(promise.statusText!=='OK'){
             throw new Error(`Could not fetch ${urlRoute}, received ${promise.status}`)
        }

        return promise
    }

    async getUsers( params ){
       const promise = await LocalService.getSource('users', params);
       return promise.data.users;
    }

    async getStatistic( id ){
        const promise = await LocalService.getSource(`statistic/${id}`);
        return promise.data.user_statistic;
    }
}

export default LocalService;