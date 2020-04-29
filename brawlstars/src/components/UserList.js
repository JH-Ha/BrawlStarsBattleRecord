import React, { Component } from 'react';
import firestore from './Firestore';

class User {
    constructor(tag, name) {
        this.tag = tag;
        this.name = name;
    }
}

const getUserList = () => {
    return firestore.collection("ID_LIST")
        .get().then((snapshot) => {
            var rows = [];
            snapshot.forEach((doc) => {
                var data = doc.data();
                console.log(data);

            })
        });
}


class UserList extends Component {
    state = {
        userList: []
    }
    componentDidMount() {
        console.log("mount");
        firestore.collection("ID_LIST")
            .get().then((snapshot) => {
                var rows = [];
                snapshot.forEach((doc) => {
                    var data = doc.data();
                    data["tag"] = doc.id;
                    console.log(data);
                    rows.push(data);
                    
                });
                console.log(rows);
                this.setState({userList : this.state.userList.concat(rows)});
                //this.setState({ userList: rows });
            });
    }

    render() {
        return (
            <div>
                <h1>UserList</h1>
                <div>{this.state.userList.map(user => {
                    return(<div key={user.tag}>
                {user.name}({user.tag})</div>)
                })}</div>
            </div>
        )
    }
}

export default UserList;