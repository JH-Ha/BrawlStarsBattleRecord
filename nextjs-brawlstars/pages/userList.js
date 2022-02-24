import React, { Component, useState } from "react";
import Pagination from "../components/Pagination";
import styles from "../styles/UserList.module.scss";
import { getData } from "../components/ApiHandler";
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/router";
import Head from "next/head";

const tableStyle = {
  margin: "auto",
};

async function getUserList(page, nickname) {
  const queryPage = page - 1;
  let res = await getData(`/member?name=${nickname}&page=${queryPage}&size=15`);
  const data = res.data;
  return ({
    userList: data.content,
    curPage: data.number + 1,
    numUser: data.totalElements
  });

}

export default function UserList({ userList, curPage, numUser, propNickname }) {
  const router = useRouter();
  const { t } = useTranslation();

  const [nickname, setNickname] = useState(propNickname);


  const changePageHandler = (page) => {
    router.push({
      pathname: "/userList",
      query: {
        page: page,
        nickname: encodeURIComponent(nickname),
      }
    });
  }
  const showPlayList = (tag) => {
    tag = tag.replace("#", "%23");
    router.push(`/battleLog/${tag}`);
  }

  const searchInputChange = (event) => {
    let value = event.target.value;
    setNickname(value);
  }
  const goRegisterPage = () => {
    router.push(`/user`);
  }

  return (
    <div className={styles.userList}>
      <Head>
        <title>{`User List`}</title>
      </Head>
      <h3>{t('userListGuide')}</h3>
      {/* TODO : implement registration */}
      <h3>{t('registerGuide')} <button onClick={goRegisterPage} className="btn btn-primary">{t('registration')}</button></h3>
      <div className={styles.inputContainer}>
        <input type="text"
          placeholder="search user nickname"
          onChange={searchInputChange}
          value={nickname}
        ></input>
        <button onClick={() => changePageHandler(0)} className="btn btn-primary">
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
          {userList.map((user, index) => {
            return (
              <tr
                className={styles.cursor}
                key={user.tag}
                page={curPage}
                onClick={() => showPlayList(user.tag)}
              >
                <td>{(curPage - 1) * 15 + index + 1}</td>
                <td>
                  {user.name}({user.tag})
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        key={`pagination-${curPage}`}
        curPage={curPage}
        numTotal={numUser}
        numShowItems="15"
        pageUrl="/userList"
        onClick={changePageHandler}
      />
    </div>
  );
}


export async function getServerSideProps(context) {
  let { nickname, page } = context.query;
  if (page === undefined) page = 1;
  //page = parseInt(page);
  let propNickname = '';
  if (nickname !== undefined) {
    propNickname = nickname;
  }

  let { userList, curPage, numUser } = await getUserList(page, propNickname);
  return ({
    props: {
      userList, curPage, numUser, propNickname
    }
  })
}