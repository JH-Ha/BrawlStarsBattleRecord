import React, { Component } from "react";
import firestore from "./Firestore";
import Pagination from "./Pagination";
import qs from "qs";
import styles from "./UserList.scss";
import baseStyles from "./Base.scss";
import { getData } from './ApiHandler';
import { withTranslation } from 'react-i18next';
import AdSense from 'react-adsense';
import Loading from "./Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

class User {
  constructor(tag, name) {
    this.tag = tag;
    this.name = name;
  }
}


const tableStyle = {
  margin: "auto",
};
class UserList extends Component {
  constructor(props) {
    super(props);
    this.searchNickname = this.searchNickname.bind(this);
  }
  state = {
    userList: [],
    curPage: 0,
    numUser: 0,
    pageUrl: "userList",
    nickname: "",
    loading: false,
  };
  getQuery(props) {
    const query = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    });
    return query;
  }
  setUserList(snapshot, page) {
    var rows = [];
    snapshot.forEach((doc) => {
      var data = doc.data();
      data["tag"] = doc.id;
      console.log(data);
      rows.push(data);
    });

    this.setState({ userList: rows, curPage: page });
  }
  getUserList(page) {
    console.log("getUserList");
    const queryPage = page - 1;
    this.setState({
      loading: true,
    })
    getData(`/member?name=${this.state.nickname}&page=${queryPage}&size=15`)
      .then((response) => {
        this.setState({
          loading: false,
        });
        console.log(response);
        const data = response.data;
        this.setState({
          userList: data.content,
          curPage: data.number + 1,
          numUser: data.totalElements
        })
      }).catch(
        (error) => {
          console.log(error);
        });
  }

  componentDidMount() {

    let query = this.getQuery(this.props);
    let curPage = query.curPage;
    if (curPage === undefined) curPage = 1;
    curPage = parseInt(curPage);

    if (curPage === undefined) curPage = 1;
    this.getUserList(curPage);
  }
  componentDidUpdate(prevProps) {
    let prevQuery = this.getQuery(prevProps);
    let query = this.getQuery(this.props);
    if (prevQuery.curPage !== query.curPage) {
      this.getUserList(query.curPage);
    }
  }
  changePageHandler = (page) => {
    let { history } = this.props;

    this.setState({ curPage: page });
    history.push(`/userList?curPage=${page}`);

  }
  showPlayList(tag) {
    let { history } = this.props;
    tag = tag.replace("#", "%23");
    history.push(`/battleLog/${tag}`);

  }
  searchNickname() {
    //console.log(this.state.nickname);
    getData(`/member?name=${this.state.nickname}&page=0&size=15`)
      .then((response) => {

        const data = response.data;
        this.setState({
          userList: data.content,
          curPage: data.number + 1,
          numUser: data.totalElements
        })
      }
      );
  }
  searchInputChange = (event) => {
    let value = event.target.value;
    this.setState({
      nickname: value,
    });
  }
  goRegisterPage = () => {
    let { history } = this.props;
    history.push(`/user`);
  }

  render() {
    const { t, i18n } = this.props;
    //const changelanguageToKo = () => i18n.changeLanguage('ko')
    //const changelanguageToEn = () => i18n.changeLanguage('en')

    return (
      <div className="userList">
        {this.state.loading ?
          <Loading></Loading>
          : ""}
        <h3>{t('userListGuide')}</h3>
        <h3>{t('registerGuide')} <button onClick={this.goRegisterPage} className="btn btn-register">{t('registration')}</button></h3>
        <div className="inputContainer">
          <input
            placeholder="search user nickname"
            onChange={this.searchInputChange}
            value={this.state.nickname}
          ></input>
          <button onClick={this.searchNickname} className="btn btn-primary">
            search
          </button>
        </div>
        <table style={tableStyle} className="table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Nickname(tag)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userList.map((user, index) => {
              return (
                <tr
                  className="cursor"
                  key={user.tag}
                  page={this.state.curPage}
                  onClick={() => this.showPlayList(user.tag)}
                >
                  <td>{(this.state.curPage - 1) * 15 + index + 1}</td>
                  <td>
                    {user.name}({user.tag})
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          key={`pagination-${this.state.curPage}`}
          curPage={this.state.curPage}
          numTotal={this.state.numUser}
          numShowItems="15"
          pageUrl="/userList"
          onClick={this.changePageHandler}
        />
        <AdSense.Google
          style={{ display: 'block' }}
          client='ca-pub-4114406385852589'
          slot='4607116156'
          format='auto'
          responsive='true'
        />
      </div>
    );
  }
}

export default withTranslation()(UserList);
