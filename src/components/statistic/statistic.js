import React, {useEffect, useState} from 'react';
import {Link, Route, Switch, useLocation , withRouter} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import Table from "../table/table";
import Pagination from '../pagination/pagination'
import User from "../user/user";
import Spinner from '../spinner/spinner';
import { fetchData, setCurrentPage } from "../../actions";
import './statistic.css';

const Statistic = ()=>{

    const state = useSelector(state=>state);
    const {users, paginationOptions} = state;

    const dispatch = useDispatch();
    const location = useLocation();
    const [path, setPath] = useState('');

    const [dataLength, setDataLength] = useState(0);

    const usersOnPage = 50;
    console.log(state)

    useEffect(() => {
        dispatch(fetchData(usersOnPage, paginationOptions.currentPage));
        setDataLength(1000);
        setPath(location.pathname)
    }, [dispatch, paginationOptions.currentPage, path]);


    // useEffect(()=>{
    //         const fetchUsers = async () => {
    //             const result = await axios.get('http://localhost:8000/api/users',
    //                 { params: {users_on_page: usersOnPage, current_page: currentPage} });
    //             console.log("Fetch")
    //             setUsers(result.data.users);
    //             setDataLength(result.data.length);
    //             setPath(location.pathname)
    //         };
    //         fetchUsers();
    //     },
    // []);

    useEffect(()=>{
        setPath(location.pathname)
    });

    const table = users? <Table
        users={users}
    />: null;


    return (
        <div className="statistic">

            <header>
                <span>AppCo</span>
            </header>
            <main>
                    {state.loading?<Spinner/>:

                        <Switch>
                            <Route exact path="/stats/" render={()=>{
                                return <div className="content">
                                    <nav>
                                        <Link to="/">Main page</Link> <div></div> <span>User Statistics</span>
                                    </nav>
                                    <h2>Users statistics</h2>
                                    {table}
                                    <Pagination dataLength={dataLength}
                                                usersOnPage={usersOnPage}
                                                setCurrentPage={setCurrentPage}

                                    />
                                </div>

                            }}

                            />
                            <Route exact path="/stats/:id" component={User}/>
                        </Switch>
                    }
            </main>
            <footer>
            </footer>
        </div>

    );

};

export default withRouter(Statistic);
