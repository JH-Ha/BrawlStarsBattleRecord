import React, { Component } from 'react';
import firestore from './Firestore';
import Pagination from './Pagination';
import qs from 'qs';
import styles from './UserList.scss';
import baseStyles from './Base.scss';
import { Router } from 'react-router-dom';

class User {
    constructor(tag, name) {
        this.tag = tag;
        this.name = name;
    }
}

// const getUserList = () => {
//     return firestore.collection("ID_LIST")
//         .get().then((snapshot) => {
//             var rows = [];
//             snapshot.forEach((doc) => {
//                 var data = doc.data();
//                 console.log(data);

//             })
//         });
// }

const tableStyle = {
    margin: "auto"
}
class UserList extends Component {
    constructor(props){
        super(props);
        this.searchNickname = this.searchNickname.bind(this);
        this.searchInputChange = this.searchInputChange.bind(this);
    }
    state = {
        userList: [],
        curPage : 0,
        numUser : 0,
        pageUrl : "userList",
        nickname : ""
    }
    getQuery(){
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix : true
        });
        return query;
    }
    setUserList(snapshot, page){
        var rows = [];
        snapshot.forEach((doc) => {
            var data = doc.data();
            data["tag"] = doc.id;
            console.log(data);
            rows.push(data);

        });
        console.log(rows);
        this.setState({ userList: rows,
                    curPage : page });
    }
    getUserList(page){
        console.log("getUserList");
        let startAt = (page - 1) * 15;
        firestore.collection("ID_LIST").orderBy("order")
        .startAt(startAt).limit(15).get().then((snapshot)=>{
            this.setUserList(snapshot, page);
        });
    }
    componentDidMount() {
        console.log("mount");
        let query = this.getQuery();
        let curPage = query.curPage;
        if(curPage===undefined) curPage = 1;
        curPage = parseInt(curPage);
        console.log(`curPage ${curPage}`);
        if(curPage === undefined) curPage = 1;
        this.getUserList(curPage);
        
        firestore.collection("PageInfo").doc("ID_LIST").get().then((doc)=>{
            const {numUser} = doc.data();
           
            this.setState({numUser : numUser});
        });
    }
    changePageHandler(page){
        console.log("changePageHandler");
            // this.setState({curPage : page});
            this.getUserList(page);
        
    }
    showPlayList(tag){
        let {history} = this.props;
        tag = tag.replace("#", "%23");
        history.push(`/playList?tag=${tag}`);
        console.log(tag);
    }
    searchNickname(){
        console.log(this.state.nickname);
        firestore.collection("ID_LIST").where("name","==",this.state.nickname)
        .get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                console.log("doc", doc.data());
            });
            this.setUserList(snapshot, 1);
        });
    }
    searchInputChange(event){
        let value = event.target.value;
        this.setState({
            nickname : value
        });
    }

    render() {
        return (
            
            <div>
                <h1>UserList</h1>
                <div>
                    {/* <select className="select">
                        <option label = "nickname" value="nickname"></option>
                        <option label = "tag" value = "tag"></option>
                    </select> */}
                    <input placeholder = "search user nickname" onChange={this.searchInputChange} value={this.state.nickname}></input>
                    <button onClick={this.searchNickname} className="btn btn-primary">search</button>
                </div>
                <table style={tableStyle} className="table">
                    <thead>

                        <tr><th>Index</th>
                            <th>Nickname(tag)</th></tr>
                    </thead>
                    <tbody>
                        {this.state.userList.map((user, index) => {
                            return (
                                <tr className="cursor" key={user.tag} page={this.state.curPage}
                                onClick={()=>this.showPlayList(user.tag)}>
                                    <td>{(this.state.curPage - 1) * 15 + index + 1}</td>
                                    <td>
                                        {user.name}({user.tag})</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Pagination curPage={this.state.curPage} numTotal = {this.state.numUser}
                numShowItems = "15" pageUrl="/userList"
                onClick={this.changePageHandler.bind(this)}/>
            </div>
        )
    }
}

export default UserList;