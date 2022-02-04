import React, { Component } from 'react';
import { getData, postData } from './ApiHandler';
import Loading from './Loading';
import { withTranslation } from 'react-i18next';
import './RegisterUser.scss';

class RegisterUser extends Component {
    state = {
        tag: "",
        searchResult: null,
        loading: false,
        registerResult: null,
    }
    changeInput = (e) => {
        console.log(e.target.value);
        let value = e.target.value;
        let tag = "";
        for (const v of value) {
            if ((v >= 'a' && v <= 'z')
                || (v >= 'A' && v <= 'Z')
                || (v >= '0' && v <= '9')) {
                tag += v;
            }

        }
        this.setState({
            tag: tag,
        });
    }
    searchTag = () => {
        console.log(this.state.tag);
        console.log(`/member/api/%23${this.state.tag}`);
        this.setState({ loading: true });
        getData(`/member/api/%23${this.state.tag}`)
            .then((response) => {
                console.log(response);
                const searchResult = response.data;
                this.setState({
                    searchResult: searchResult,

                });
                if (searchResult.found) {

                }
                this.setState({ loading: false });
            });
    }
    register = () => {
        postData(`/member/%23${this.state.tag}`).then((response) => {
            console.log(response);
            this.setState({
                registerResult: response.data.result,
            });
        })
    }
    render() {
        const { t } = this.props;
        const playerInfo = this.state.searchResult?.playerInfo;
        return <div className="registerUser">
            {this.state.loading ?
                <Loading></Loading>
                : ""}
            <h3>
                Search your tag
            </h3>
            <div className='inputContainer'>
                <span className='sharpSign'>#</span>
                <input type="text" placeHolder="enter your tag" value={this.state.tag}
                    onChange={this.changeInput}
                ></input>
                <button className="btn btn-primary" onClick={this.searchTag}>search</button>
            </div>
            {this.state.searchResult?.found === false ? <div> not found </div>
                : <div>
                </div>
            }
            {this.state.searchResult?.found ?
                <div className='found'>

                    <div className="rowContainer">
                        <div className='row'>
                            <div className='name'>{playerInfo.name}</div>
                            <button className="registerBtn btn btn-primary" onClick={this.register}>register</button>
                        </div>
                        <div className="row">
                            <div className="component">
                                <div className='title'>{t('highestTrophies')}</div>
                                <div className='content'>{playerInfo.highestTrophies}</div>
                            </div>
                            <div className="component">
                                <div className='title'>{t('trophies')}</div>
                                <div className='content'>{playerInfo.trophies}</div>
                            </div>
                            <div className="component">
                                <div className='title'>{t('expLevel')}</div>
                                <div className='content'>{playerInfo.expLevel}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="component">
                                <div className='title'>{t('3vs3Victories')}</div>
                                <div className='icon'>
                                    <img className="iconImg" src="/images/mode/3vs3.png" alt="3vs3"></img>
                                </div>
                                <div className='content'>{playerInfo['3vs3Victories']}</div>

                            </div>
                            <div className="component">
                                <div className='title'>{t('soloVictories')}</div>
                                <div className='icon'>
                                    <img className="iconImg" src="/images/mode/soloShowdown.png" alt="soloShowdown"></img>
                                </div>

                                <div className='content'>{playerInfo['soloVictories']}</div>
                            </div>
                            <div className="component">
                                <div className='title'>{t('duoVictories')}</div>
                                <div className='icon'>
                                    <img className="iconImg" src="/images/mode/duoShowdown.png" alt="duoShowdown"></img>
                                </div>
                                <div className='content'>{playerInfo['duoVictories']}</div>
                            </div>
                        </div>
                        {/* <div>registration user tag will be updated</div> */}
                        {this.state.registerResult && <div className='message'> completely registered </div>}
                        {this.state.registerResult === false && <div className='message'> already registered user </div>}
                    </div>

                </div>
                : <div></div>}

        </div>
    }
}


export default withTranslation()(RegisterUser);