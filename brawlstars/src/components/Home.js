import React, { Component } from "react";
import styles from "./Home.scss";

const languageList = ["korean", "english", "japanese"];
const displayNone = {
  display: "none",
};
class Home extends Component {
  state = {
    language: "korean",
  };
  changeLanguage = (language) => {
    this.setState({
      language: language,
    });
  };

  render() {
    return (
      <div
        style={{
          "margin-top": "30px",
        }}
      >
        <div className="languageContainer">
          {languageList.map((lang, index) => (
            <div
              onClick={() => {
                this.changeLanguage(lang);
              }}
              className={`language ${
                lang === this.state.language ? "selected" : ""
              }`}
              key={index}
            >
              {lang}
            </div>
          ))}
        </div>

        {this.state.language === "korean" ? (
          <div>
            브롤스타즈 전적 기록 사이트입니다.
            <br />
            1시간 마다 전적이 동기화됩니다.
            <br />
            User List를 클릭하여 <br />
            자신의 닉네임을 검색하고
            <br />
            전적을 확인해보세요
            <br />
            <br />
            email : cubeprince@gmail.com
          </div>
        ) : (
          ""
        )}
        {this.state.language === "english" ? (
          <div>
            This is the Brawl Stars game record site.
            <br />
            Game records are synchronized every hour.
            <br />
            Click on the User List on the top menu
            <br />
            to search your nickname and check the history
            <br />
            <br />
            email : cubeprince@gmail.com
          </div>
        ) : (
          ""
        )}
        {this.state.language === "japanese" ? (
          <div>
            ブロールスターズの戦闘記録サイトです。
            <br />
            戦闘記録は1時間ごとに同期されます。
            <br />
            UserListをクリックして、自分のニックネームを検索して、
            <br />
            戦闘記録を確認してください。
            <br />
            <br />
            email : cubeprince@gmail.com
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Home;
