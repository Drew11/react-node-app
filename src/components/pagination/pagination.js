import React, {useState, useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { setCurrentPage, setButtonsPerPage, setIndexFirstPage } from "../../actions";
import './pagination.css'

const Pagination = ( props )=> {

    const dispatch = useDispatch();
    const {
        usersPerPage,
        currentPage,
        buttonsPerPage,
        indexFirstPage
    } = useSelector(state=>state.paginationOptions);

    const {dataLength,
    } = props;

    const setPage = (i)=>{
        dispatch(setCurrentPage(i))
    };




    const pages = Math.ceil(dataLength / usersPerPage);
    const arr = [];

    for (let i = 1; i <= pages; i++) {
        arr.push(i)
    }

    const liPerPage = arr.slice(indexFirstPage, buttonsPerPage);

    const listenPage = (range, firstButtonListener)=>{
        dispatch(setIndexFirstPage( range ));
        dispatch(setButtonsPerPage( range ));
        dispatch(setCurrentPage(buttonsPerPage + firstButtonListener))
    } ;

    return(
        <div className="pagination">
            <ul>
                {
                    indexFirstPage <= 0?
                        null:
                        <div className="arrow left"
                             onClick={()=>listenPage(-5, -5)}
                        >
                        </div>
                }

                {liPerPage.map(item=><li
                    className={item===currentPage?'active': ''}
                    onClick={()=>{
                        console.log(this)
                        setPage(item)}}
                >{item}
                </li>)}

                {
                    buttonsPerPage >= arr.length?
                        null:
                        <div className="arrow right"
                             onClick={()=>listenPage(5, 1)}
                        >
                        </div>
                }
            </ul>
        </div>
    )
};

export default Pagination;


