import React, { Component } from 'react';
import { getData } from './ApiHandler';
import Loading from './Loading';
import { withTranslation } from 'react-i18next';
import style from './RegisterUser.scss';

class RegisterUser extends Component {
    state = {
        tag: "",
        searchResult: null,
        loading: false,
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
            <span>#</span>
            <input placeHolder="enter your tag" value={this.state.tag}
                onChange={this.changeInput}
            ></input>
            <button className="btn" onClick={this.searchTag}>search</button>
            <div>


            </div>
            {this.state.searchResult?.found === false ? <div> not found </div>
                : <div>
                </div>
            }
            {this.state.searchResult?.found ?
                <div className="rowContainer">
                    <div className="row">
                        <div className="component">
                            <div>{t('highestTrophies')}</div>
                            <div className='content'>{playerInfo.highestTrophies}</div>
                        </div>
                        <div className="component">
                            <div>{t('trophies')}</div>
                            <div className='content'>{playerInfo.trophies}</div>
                        </div>
                        <div className="component">
                            <div>{t('expLevel')}</div>
                            <div className='content'>{playerInfo.expLevel}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="component">
                            <div>{t('3vs3Victories')}</div>
                            <div className='icon'>
                                <img className="iconImg" src="/images/mode/3vs3.png"></img>
                            </div>
                            <div className='content'>{playerInfo['3vs3Victories']}</div>

                        </div>
                        <div className="component">
                            <div>{t('soloVictories')}</div>

                            <div className='icon'>
                                <img className="iconImg" src="/images/mode/soloShowdown.png"></img>
                            </div>

                            <div className='content'>{playerInfo['soloVictories']}</div>
                        </div>
                        <div className="component">
                            <div>{t('duoVictories')}</div>
                            <div className='icon'>
                                <img className="iconImg" src="/images/mode/duoShowdown.png"></img>
                            </div>
                            <div className='content'>{playerInfo['duoVictories']}</div>
                        </div>
                    </div>
                    <div>registration user tag will be updated</div>
                    {/* <button>register</button> */}
                </div>

                : <div></div>}
        </div>
    }
}


export default withTranslation()(RegisterUser);