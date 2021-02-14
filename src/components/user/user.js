import React, {useEffect, useState} from 'react';
import renderLineChart from '../chart/chart';
import './user.css'
import LocalService from '../../services/local-service';
import axios from "axios/index";
import {
    Link,
    useParams,
    useLocation,
} from "react-router-dom";

const User = ()=> {
    let params = useParams();
    let location = useLocation();
    const service = new LocalService();
    const fullName = `${location.state.first_name} ${location.state.last_name}`;
    const [statistic, setStatistic] = useState(null);

    useEffect(()=>{
            const fetchData = async () => {
                const data = await service.getStatistic(params.id);
                setStatistic(data);
            };
            fetchData();
        },
        []);

    const updateMale = async ()=>{
        const result = await axios.patch(`http://localhost:8000/api/users/${params.id}`,
            { email: '^^^^^sdgfdfg$$$$$dfgdfg.com'})

    };

    return(
        <div className="user-charts">
            <nav>
                <Link to="/">Main page</Link>
                <div></div>
                <Link to="/stats">User Statistics</Link>
                <div></div>
                {fullName}
                <button
                    onClick={updateMale}
                >Update Name</button>
            </nav>
           <h1>User Charts</h1>
            {statistic?renderLineChart(statistic): null}
        </div>
    )
};

export default User;