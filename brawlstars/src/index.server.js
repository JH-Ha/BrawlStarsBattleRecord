import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import path from "path";
import fs from "fs";

// asset-manifest.json에서 파일 경로들을 조회
const manifest = JSON.parse(
    fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf8")
);

const chunks = Object.keys(manifest.files)
    .filter((key) => /chunk\.js$/.exec(key)) // chunk.js로 끝나는 키를 찾고
    .map((key) => `<script src="${manifest.files[key]}"></script>`) // 스크립트 태그로 변환하고
    .join(""); // 합침

function createPage(root) {
    return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content="You can check win rate and pick rate of brawlers at each map. Also, you can check your battle log
             브롤스타즈 전적 기록 및 승률 확인 사이트입니다. 맵 마다 브롤러 별 승률과 선택률을 확인할 수 있습니다. 또한 당신의 전투 기록도 확인 가능합니다." />
      <title>Brawl Meta</title>
      <link href="${manifest.files["main.css"]}" rel="stylesheet" />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4114406385852589"
            crossorigin="anonymous"></script>

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-34JGP66PP0"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-34JGP66PP0');
        </script>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
        ${root}
      </div>
      <script src="${manifest.files["runtime-main.js"]}"></script>
      ${chunks}
      <script src="${manifest.files["main.js"]}"></script>
    </body>
  </html>
  `;
}

const app = express();

// 서버 사이드 렌더링을 처리할 핸들러 함수이다.
const serverRender = (req, res, next) => {
    // 이 함수는  404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해준다.
    const context = {};
    const jsx = (
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );
    const root = ReactDOMServer.renderToString(jsx); // 렌더링을 하고
    res.send(createPage(root)); // 클라이언트에게 결과물을 응답
};

const serve = express.static(path.resolve("./build"), {
    index: false, // "/" 경로에서 index.html을 보여 주지 않도록 설정
});

app.use(serve);
app.use(serverRender);

// 8081 포트로 서버를 가동
app.listen(8081, () => {
    console.log("Running on http://localhost:8081");
});