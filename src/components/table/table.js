import React from 'react';
import {
    useRouteMatch,
    useHistory,
} from "react-router-dom";

import './table.scss'

const Table = ( props )=> {

    const { users } = props;
    let { url } = useRouteMatch();
    const history = useHistory();

    const columnsHeader =  Object.keys(users[0]).map((text)=>{
        text = text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ');
        text = text.replace(text[0], text[0].toLocaleUpperCase());
        const index =  text.indexOf(' ');
        if(index) {
            text = text.replace(text[index+1], text[index+1].toLocaleUpperCase());
        }
        return<th>{text}</th>
    });

    const handleRowClick = ({id, first_name, last_name}) => {
        history.push(`${url}/${id}`, {first_name, last_name});
    };

    return(
            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        {columnsHeader}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index)=>
                            <tr
                                key={index}
                                onClick={()=>handleRowClick(user)}
                            >
                                {Object.values(user).map((value, index)=><td
                                    key={index}
                                >{value}
                                </td>)}
                           </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
};

export default Table;
