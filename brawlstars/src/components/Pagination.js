import React, { Component } from "react";
import {BrowserRouter as Router,  Route, Link } from 'react-router-dom';
import UserList from './UserList';
import styles from './Pagination.scss';
class Page{
    constructor(link, pageNum , content){
        this.link = link;
        this.pageNum = pageNum;
        this.content = content;
    }
}
class Pagination extends Component{
    
    render(){
        let {curPage, numTotal, numShowItems, pageUrl, onClick} = this.props;
        console.log(`pagination props ${curPage}`);
        const numShowPages = 10;
        let maxPage = Math.floor((numTotal -1 )/ numShowItems) + 1
        console.log(`maxPage ${maxPage}`);
        
        if(curPage === undefined) curPage = 1;
        if(numShowItems === undefined) numShowItems = 15;
        
        if(curPage < 1) curPage = 1;
        else if(curPage > maxPage) curPage = maxPage;
        
        let startPage = Math.floor((curPage - 1) / numShowPages) 
                        * numShowPages + 1;
        let endPage = startPage + numShowPages - 1;
        if(endPage > maxPage) endPage = maxPage;
        
        let pageList = [];
        pageList.push(new Page("", curPage -1, "<"));
        for(let i = startPage ; i <= endPage ; i++){
            pageList.push(new Page(`${pageUrl}?curPage=${i}`, i, i));
        }
        pageList.push(new Page("", curPage + 1, ">"));

        console.log("chagnePageHandler", this.props.onClick);
        return (
            <div className="center">
                <div className="btn-container">
                    {pageList.map((page, index) =>{
                        return (
                                <button key={page.content} 
                                className={"btn-page " 
                                + (curPage == page.pageNum ? 'activate': '')
                                }
                                onClick = {() =>onClick(page.pageNum)}>{page.content}</button>
                        )
                    })}
                </div>
            </div>
            
        )
    }
}

export default Pagination;