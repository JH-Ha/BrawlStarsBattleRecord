import React, { Component } from 'react';
import { getData } from './ApiHandler';

class RegisterUser extends Component {
    state = {
        tag: "",
        found: "",
    }
    changeInput = (e) => {
        console.log(e.target.value);
        let value = e.target.value;
        let tag = "";
        for (let i = 0; i < value.length; i++) {
            console.log(value[i]);
            if ((value[i] >= 'a' && value[i] <= 'z')
                || (value[i] >= 'A' && value[i] <= 'Z')
                || (value[i] >= '0' && value[i] <= '9')) {
                tag += value[i];
            }

        }
        this.setState({
            tag: tag,
        });
    }
    searchTag = () => {
        console.log(this.state.tag);
        console.log(`/member/api/${this.state.tag}`);
        getData(`/member/api/${this.state.tag}`)
            .then((response) => {
                console.log(response);
                const data = response.data;
                this.setState({
                    found: data.found,
                });
                if (data.found) {

                } else {

                }
            });
    }
    render() {
        return <div>
            <h3>
                Search your tag
            </h3>
            <span>#</span>
            <input placeHolder="enter your tag" value={this.state.tag}
                onChange={this.changeInput}
            ></input>
            <button className="btn" onClick={this.searchTag}>search</button>
            <div>

                <button>register</button>
            </div>
            {this.state.found === false ? <div> not found </div>
                : <div>
                </div>

            }
        </div>
    }
}

export default RegisterUser;