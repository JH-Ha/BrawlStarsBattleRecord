import React, { Component } from 'react';
import firestore from './Firestore';
import Pagination from './Pagination';
import qs from 'qs';

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
    state = {
        userList: [],
        curPage : 0,
        maxPage : 92,
        pageUrl : "userList"
    }
    getQuery(){
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix : true
        });
        return query;
    }
    setUserList(snapshot){
        var rows = [];
        snapshot.forEach((doc) => {
            var data = doc.data();
            data["tag"] = doc.id;
            console.log(data);
            rows.push(data);

        });
        console.log(rows);
        this.setState({ userList: rows });
    }
    getUserList(page){
        console.log("getUserList");
        this.setState({curPage : page});
        
        var limitNum = (page - 1) * 15;
        if(limitNum <= 0 ) limitNum = 15;
        var first = firestore.collection("ID_LIST").orderBy("tag")
        .limit(limitNum);
        let paginate = first.get()
        .then((snapshot) =>{
            if(page == 1) this.setUserList(snapshot);
            else{
                console.log("else");
                let last = snapshot.docs[snapshot.docs.length - 1];
                let next = firestore.collection("ID_LIST").orderBy("tag")
                .startAfter(last.data().tag)
                .limit(15);
                next.get().then((snapshot)=>{
                    this.setUserList(snapshot);
                });
            }
        });
    }
    componentDidMount() {
        console.log("mount");
        let query = this.getQuery();
        let curPage = parseInt(query.curPage);
        console.log(`curPage ${curPage}`);
        if(curPage === undefined) curPage = 1;
        this.getUserList(curPage);
        
           
        // firestore.collection("ID_LIST").orderBy("tag").limit(15)
        //     .get().then((snapshot) => {
        //         var rows = [];
        //         snapshot.forEach((doc) => {
        //             var data = doc.data();
        //             data["tag"] = doc.id;
        //             console.log(data);
        //             rows.push(data);

        //         });
        //         console.log(rows);
        //         this.setState({ userList: this.state.userList.concat(rows) });
        //         //this.setState({ userList: rows });
        //     });
    }
    changePageHandler(page){
        console.log("changePageHandler");
            this.setState({curPage : page});
            this.getUserList(page);
        
    }

    render() {
        return (
            
            <div>
                <h1>UserList</h1>
                <table style={tableStyle}>
                    <thead>

                        <tr><th>Index</th>
                            <th>Nickname(tag)</th></tr>
                    </thead>
                    <tbody>
                        {this.state.userList.map((user, index) => {
                            return (
                                <tr key={user.tag} page={this.state.curPage}>
                                    <td>{(this.state.curPage - 1) * 15 + index + 1}</td>
                                    <td>
                                        {user.name}({user.tag})</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Pagination curPage={this.state.curPage} numTotal = "92" 
                numShowItems = "15" pageUrl="/userList"
                onClick={this.changePageHandler.bind(this)}/>
            </div>
        )
    }
}

export default UserList;