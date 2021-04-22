import React, { Component } from 'react';
import { getData } from './ApiHandler';

class RegisterUser extends Component {
    state = {
        tag: ""
    }
    changeInput = (e) => {
        console.log(e.target.value);
        this.setState({
            tag: e.target.value,
        });
    }
    searchTag = () => {
        getData(`/v1/user/${this.state.tag}`)
            .then((response) => {
                console.log(response);
            });
    }
    render() {
        return <div>
            <h3>
                Search your tag
            </h3>
            <input placeHolder="enter your tag" value={this.state.tag}
                onChange={this.changeInput}
            ></input>
            <button className="btn" onClick={this.searchTag}>search</button>
            <div>

                <button>register</button>
            </div>
        </div>
    }
}

export default RegisterUser;