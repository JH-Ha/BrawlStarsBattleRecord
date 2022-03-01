import React, { Component } from "react";
import styles from "../styles/Pagination.module.scss";

class Page {
  constructor(link, pageNum, content, className) {
    this.link = link;
    this.pageNum = pageNum;
    this.content = content;
    this.className = className;
  }
}
class Pagination extends Component {
  state = {
    curPage: 1,
  };
  componentDidUpdate(prevProps) {
    // if (this.props.curPage !== prevProps.curPage) {
    //   //console.log("update!!!!");
    //   this.setState({
    //     curPage: this.props.curPage,
    //   });
    // }
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
    const numShowPages = 5;
    let maxPage = Math.floor((numTotal - 1) / numShowItems) + 1;
    //console.log(`maxPage ${maxPage}`);

    if (curPage === undefined) curPage = 1;
    if (numShowItems === undefined) numShowItems = 15;

    //console.log(`curPage ${curPage}`);
    if (curPage < 1) curPage = 1;
    else if (curPage > maxPage) curPage = maxPage;

    let startPage = Math.floor((curPage - 1) / numShowPages) * numShowPages + 1;
    let endPage = startPage + numShowPages - 1;
    if (startPage < 1) startPage = 1;
    if (endPage > maxPage) endPage = maxPage;

    let prevPage = startPage - 1;
    if (prevPage < 1) prevPage = 1;
    let nextPage = endPage + 1;
    if (nextPage > maxPage) nextPage = curPage;
    //console.log(`curPage ${curPage} startPage ${startPage} endPage ${endPage} `)
    let pageList = [];
    pageList.push(new Page("", 0, "<<"));
    pageList.push(new Page("", prevPage, "<"));
    for (let i = startPage; i <= endPage; i++) {
      pageList.push(new Page(`${pageUrl}?curPage=${i}`, i, i, "number"));
    }
    pageList.push(new Page("", nextPage, ">"));
    pageList.push(new Page("", maxPage, ">>", ""));

    //console.log("chagnePageHandler", this.props.onClick);
    return (
      <div className={`${styles.pagination} ${styles.center}`}>
        <div className={styles.btnContainer}>
          {pageList.map((page, index) => {
            return (
              <button
                key={page.content}
                className={
                  `${styles.btnPage} ${curPage === page.pageNum && page.className === "number" ? styles.activate : ""}`
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
