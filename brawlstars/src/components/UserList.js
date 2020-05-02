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

const tableStyle = {
    margin : "auto"
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
                <table style={tableStyle}>
                    <thead>

                        <th><td>순번</td></th>
                        <th><td>닉네임(태그)</td></th>
                    </thead>
                    <tbody>
                {this.state.userList.map((user, index) => {
                    return(
                        <tr>
                            <td>{index + 1}</td>
                    <td key={user.tag}>
                {user.name}({user.tag})</td>
                </tr>
                )})}
                </tbody>
                </table>
            </div>
        )
    }
}

export default UserList;