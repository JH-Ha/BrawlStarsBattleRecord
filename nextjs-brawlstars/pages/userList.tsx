import React, { Component, useState } from "react";
import Pagination from "../components/Pagination";
import styles from "../styles/UserList.module.scss";
import { getData } from "../components/ApiHandler";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const tableStyle = {
  margin: "auto",
};

async function getUserList(page: number, nickname: string) {
  const queryPage = page - 1;
  let res = await getData(`/member?name=${nickname}&page=${queryPage}&size=15`);
  const data = res.data;
  return {
    userList: data.content,
    curPage: data.number + 1,
    numUser: data.totalElements,
  };
}

interface User {
  name: string;
  tag: string;
}
interface UserProps {
  userList: User[];
  curPage: number;
  numUser: number;
  propNickname: string;
}

export default function UserList({
  userList,
  curPage,
  numUser,
  propNickname,
}: UserProps) {
  const router = useRouter();
  const { t } = useTranslation("common");

  const [nickname, setNickname] = useState(decodeURIComponent(propNickname));

  const changePageHandler = (page: number) => {
    router.push({
      pathname: "/userList",
      query: {
        page: page,
        nickname: encodeURIComponent(nickname),
      },
    });
  };
  const showPlayList = (tag: string) => {
    tag = tag.replace("#", "%23");
    router.push(`/battleLog/${tag}`);
  };

  const searchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setNickname(value);
  };
  const goRegisterPage = () => {
    router.push(`/user`);
  };
  const handleSearchInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      changePageHandler(0);
    }
  };

  return (
    <div className={styles.userList}>
      <Head>
        <title>{`User List`}</title>
      </Head>
      <div className="page-title">{t("userListGuide")}</div>
      {/* TODO : migrate register user */}
      <div className="page-title">
        {t("registerGuide")}{" "}
        <button onClick={goRegisterPage} className="btn btn-primary">
          {t("registration")}
        </button>
      </div>
      <div className={styles.inputContainer}>
        <input
          className="form-control"
          type="text"
          placeholder="search user nickname"
          onChange={searchInputChange}
          onKeyDown={handleSearchInputKeyDown}
          value={nickname}
        ></input>
        <button
          onClick={() => changePageHandler(0)}
          className="btn btn-primary"
        >
          {t("search")}
        </button>
      </div>
      <table style={tableStyle} className="default-table">
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
        numShowItems={15}
        pageUrl="/userList"
        onClick={changePageHandler}
      />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  let { nickname, page } = context.query;
  if (page === undefined) page = 1;
  //page = parseInt(page);
  let propNickname = "";
  if (nickname !== undefined) {
    propNickname = nickname;
  }
  let locale = context.locale;

  let { userList, curPage, numUser } = await getUserList(page, propNickname);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      userList,
      curPage,
      numUser,
      propNickname,
    },
  };
}
