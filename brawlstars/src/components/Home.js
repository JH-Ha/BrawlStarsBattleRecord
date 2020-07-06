import React, { Component } from "react";

const languageList = ["korean", "english", "japanese"];
const displayNone = {
  display: "none",
};
class Home extends Component {
  state = {
    language: "korean",
  };

  render() {
    return (
      <div
        style={{
          "margin-top": "30px",
        }}
      >
        {/* <div>
          {languageList.map((lang, index) => (
            <div key={index}>{lang}</div>
          ))}
        </div> */}
        <div>
          브롤스타즈 전적 기록 사이트입니다.
          <br />
          User List 에 있는 user들의 기록들이
          <br />
          1시간 마다 동기화됩니다.
          <br />
          <br />
          User List를 클릭하여 <br />
          자신의 닉네임을 검색하고
          <br />
          전적을 확인해보세요
        </div>
      </div>
    );
  }
}

export default Home;
