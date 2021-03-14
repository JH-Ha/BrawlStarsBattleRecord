import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserList from "./UserList";
import styles from "./Pagination.scss";
class Page {
  constructor(link, pageNum, content) {
    this.link = link;
    this.pageNum = pageNum;
    this.content = content;
  }
}
class Pagination extends Component {
  state = {
    curPage: 1,
  };
  componentDidUpdate(prevProps) {
    if (this.props.curPage !== prevProps.curPage) {
      //console.log("update!!!!");
      this.setState({
        curPage: this.props.curPage,
      });
    }
  }
  componentDidMount() {
    this.setState({
      curPage: this.props.curPage,
    });
  }
  render() {
    //   let { curPage } = this.props;
    //   return (
    //     <div>
    //       {this.state.curPage}
    //       {curPage}
    //       <button onClick={() => this.props.onClick(this.state.curPage + 1)}>
    //         next
    //       </button>
    //     </div>
    //   );
    // }
    let { numTotal, numShowItems, pageUrl, onClick } = this.props;
    //console.log(`pagination props ${this.state.curPage}`);
    let curPage = this.state.curPage;
    const numShowPages = 10;
    let maxPage = Math.floor((numTotal - 1) / numShowItems) + 1;
    console.log(`maxPage ${maxPage}`);

    if (curPage === undefined) curPage = 1;
    if (numShowItems === undefined) numShowItems = 15;

    console.log(`curPage ${curPage}`);
    if (curPage < 1) curPage = 1;
    else if (curPage > maxPage) curPage = maxPage;

    let startPage = Math.floor((curPage - 1) / numShowPages) * numShowPages + 1;
    let endPage = startPage + numShowPages - 1;
    if (startPage < 1) startPage = 1;
    if (endPage > maxPage) endPage = maxPage;

    console.log(`curPage ${curPage} startPage ${startPage} endPage ${endPage} `)
    let pageList = [];
    pageList.push(new Page("", parseInt(curPage) - 1, "<"));
    for (let i = startPage; i <= endPage; i++) {
      pageList.push(new Page(`${pageUrl}?curPage=${i}`, i, i));
    }
    pageList.push(new Page("", parseInt(curPage) + 1, ">"));

    //console.log("chagnePageHandler", this.props.onClick);
    return (
      <div className="center">
        <div className="btn-container">
          {pageList.map((page, index) => {
            return (
              <button
                key={page.content}
                className={
                  "btn-page " + (curPage == page.pageNum ? "activate" : "")
                }
                onClick={() => onClick(page.pageNum)}
              >
                {page.content}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Pagination;
