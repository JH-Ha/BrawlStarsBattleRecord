/** @format */

import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { getData, postData } from "../components/ApiHandler";
import Loading from "../components/Loading";
import styles from "../styles/RegisterUser.module.scss";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Club {
  tag: string;
  name: string;
}
interface Icon {
  id: number;
}
interface PlayerInfo {
  club: Club;
  "3vs3Victories": string;
  isQualifiedFromChampionshipChallenge: string;
  icon: Icon;
  tag: string;
  name: string;
  trophies: number;
  expLevel: number;
  expPoints: number;
  highestTrophies: number;
  soloVictories: number;
  duoVictories: number;
  bestRoboRumbleTime: number;
  bestTimeAsBigBrawler: number;
  nameColor: string;
}
interface SearchResult {
  found: boolean;
  playerInfo: PlayerInfo | null;
}

interface RegisterResult {
  result: boolean;
  msg: string;
}

function RegisterUser() {
  const [tag, setTag] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [registerResult, setRegisterResult] = useState<RegisterResult | null>(
    null
  );

  const changeInput = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    let filteredTag = "";
    for (const v of value) {
      if (
        (v >= "a" && v <= "z") ||
        (v >= "A" && v <= "Z") ||
        (v >= "0" && v <= "9")
      ) {
        filteredTag += v;
      }
    }
    setTag(filteredTag);
  };
  const init = () => {
    setSearchResult(null);
    setRegisterResult(null);
  };

  const searchTag = () => {
    init();
    setLoading(true);
    getData(`/member/api/%23${tag}`).then((response) => {
      let result = response.data;
      setSearchResult(result);
      setLoading(false);
    });
  };
  const register = () => {
    postData(`/member/%23${tag}`).then((response) => {
      setRegisterResult(response.data);
    });
  };

  const playerInfo = searchResult?.playerInfo;
  const { t } = useTranslation("common");
  return (
    <div className={styles.registerUser}>
      {loading && <Loading></Loading>}
      <h3>{t("searchYourTag")}</h3>
      <div className={styles.inputContainer}>
        <span className={styles.sharpSign}>#</span>
        <input
          type="text"
          placeholder={t("enterYourTag")}
          value={tag}
          onChange={changeInput}
        ></input>
        <button className="btn btn-primary" onClick={searchTag}>
          {t("search")}
        </button>
      </div>
      {searchResult?.found === false ? <div> not found </div> : <div></div>}
      {searchResult?.found && playerInfo ? (
        <div className={styles.found}>
          <div className={styles.rowContainer}>
            <div className={styles.row}>
              <div className={styles.name}>{playerInfo.name}</div>
              <button
                className="registerBtn btn btn-primary"
                onClick={register}
              >
                {t("register")}
              </button>
            </div>
            <div className={styles.row}>
              <div className={styles.component}>
                <div className={styles.title}>{t("highestTrophies")}</div>
                <div className={styles.content}>
                  {playerInfo.highestTrophies}
                </div>
              </div>
              <div className={styles.component}>
                <div className={styles.title}>{t("trophies")}</div>
                <div className={styles.content}>{playerInfo.trophies}</div>
              </div>
              <div className={styles.component}>
                <div className={styles.title}>{t("expLevel")}</div>
                <div className={styles.content}>{playerInfo.expLevel}</div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.component}>
                <div className={styles.title}>{t("3vs3Victories")}</div>
                <div className={styles.icon}>
                  <img
                    className={styles.iconImg}
                    src="/images/mode/3vs3.png"
                    alt="3vs3"
                  ></img>
                </div>
                <div className={styles.content}>
                  {playerInfo["3vs3Victories"]}
                </div>
              </div>
              <div className={styles.component}>
                <div className={styles.title}>{t("soloVictories")}</div>
                <div className={styles.icon}>
                  <img
                    className={styles.iconImg}
                    src="/images/mode/soloShowdown.png"
                    alt="soloShowdown"
                  ></img>
                </div>

                <div className={styles.content}>
                  {playerInfo["soloVictories"]}
                </div>
              </div>
              <div className={styles.component}>
                <div className={styles.title}>{t("duoVictories")}</div>
                <div className={styles.icon}>
                  <img
                    className={styles.iconImg}
                    src="/images/mode/duoShowdown.png"
                    alt="duoShowdown"
                  ></img>
                </div>
                <div className={styles.content}>
                  {playerInfo["duoVictories"]}
                </div>
              </div>
            </div>
            {/* <div>registration user tag will be updated</div> */}
            {registerResult?.result === true && (
              <div className={styles.message}>{t("completelyRegistered")}</div>
            )}
            {registerResult?.result === false && (
              <div className={styles.message}>{t("alreadyRegisteredUser")}</div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default RegisterUser;

export async function getServerSideProps(context: any) {
  let locale = context.locale;

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
