<!-- @format -->

### Project Introduction

I created a site that provides brawler win rate statistics for each Brawl Stars map.

In order to win the game, you have to select a strong brawler, but there is no official win rate statistics.
I used to find a strong brawler while playing games myself.
However, it is not easy to keep up with updates because the game maps change every day and new maps are added every season.

On this Brawl Meta site, you can find which brawler is the best for each map and the win rate.
win rates based on play data from around 10,000 random players.

ゲームから勝つためには強いキャラクターを選択してゲームをしなきゃいけません。しかし、どんなキャラクターが強いのか、公式の勝率データは提供されていません。
直接プレイしながら体感的にどんなキャラクターが強いのか分かりますが、
毎日マップが変わり、シーズンが変わるたびにマップが追加されるので持続的に勝率情報を分かるのは難しいです。

ブロメーター（Brawl Meta）ウェブサイトではマップごとどんなキャラクターが良いのか、勝率を提供します。
約10,000人のプレイヤーのバトル履歴を集計して勝率を提供しています。

브롤 스타즈 맵 별 브롤러 승률 통계를 제공하는 사이트를 제작하였습니다.

게임에서 승리를 하기 위해서 강한 브롤러를 선택하여 게임을 해야하는데, 어떤 브롤러가 강한지, 공식 승률 데이터가 제공되고 있지 않습니다.
직접 플레이하면서 강한 브롤러를 찾고, 체감적으로 어떤 브롤러가 강한지 알고는 있습니다.
그런데 매일 맵이 바뀌고, 시즌별로 맵이 계속 추가 되기 때문에 지속적으로 업데이트 사항을 따라가는 것은 쉽지 않습니다.

이 브롤 메타(Brawl Meta) 사이트에서 맵 마다 어떤 브롤러가 좋은지, 승률로 알려드립니다.
약 10,000명의 무작위 플레이어의 플레이 데이터를 기반으로 승률을 집계합니다.

#### Detailed Information

ブロスタAPIを使用して、ユーザープレイデータを取得して統計を作っています。APIでは最近の25ゲームのみが閲覧可能なため、毎時間戦闘履歴を保存して、できるだけ多くのゲームを保存しています。

フロントエンドはReactで実装され、バックエンドはSpringフレームワークを使用して実装されました。

プレイヤーのメニューでユーザー名をクリックすると、そのユーザーの戦闘履歴を見ることができます。

マップでは、各モードのマップを確認することができ、マップイメージをクリックするとキャラクターの勝率を確認できます。

브롤스타즈 API를 이용하여서 사용자 플레이데이터를 가져와서 통계를 냈습니다. API를 통해서는 최근 25게임만 조회가 가능하기에, 매시간 전적을 저장해서 최대한 많은 게임을 저장하고 있습니다.

Front-End는 React로 제작되었고, Back-End는 Spring framework를 이용하여 제작되었습니다.

Players 메뉴에서 유저이름을 클릭하면, 해당 유저의 전적정보를 볼 수 있습니다.

Maps에서는 각 모드별 맵들을 확인할 수 있으며, 맵 이미지를 클릭하면 브롤러 승률을 알 수 있습니다.

## version 2.0

React + Spring Boot + JPA 를 이용해서 구현하고 있습니다.

firestore에 paging 기능 부재, NoSQL이다 보니 join 이 불가능하여 통계적으로 유의미한 자료를 뽑아내는게 어려웠습니다. 그래서 Database를 RDBMS로 바꾸고 Spring Boot로 API서버를 구축하여 React에서 데이터를 가져오는 방식으로 구현하고 있습니다.

nodejs 서버가 아닌 Spring Boot의 Scheduler 를 이용해서 주기적으로 유저 데이터를 업데이트 합니다.

### 구현된 기능

- UserList에서 유저를 클릭하면 전투 기록을 볼 수 있습니다. V1.0과는 다르게 전체 모드에 상관없이 기록을 보여줄 수 있도록 구현을 바꾸었습니다.
- 유저 이름으로 검색하여 전투 기록을 찾아 볼 수 있습니다. (V1.0과 동일)
- 3대 3매칭에서 맵에서 어떤 브롤러가 승률이 높은지 확인할 수 있습니다.

상단의 Map List를 클릭하면 모드별로 어떤 맵들이 있는지 확인이 가능합니다.
그리고 맵을 클릭하면 각 브롤러별 승률을 알 수 있습니다.

<div style="display:flex">
<img src="./readmeImage/mapListCapture.PNG" width ="500px">
<img src="./readmeImage/mapCapture.PNG" width ="500px">
</div>

### Update Log
- v2.4.5 (2024.04.16)
  - Add a new trophy escape mode 

- v2.4.1 (2023.03.21)
  - Update spring boot to 3.0.4
- v2.4.0 (2023.01.05)
  - Add description to map page
  - Change getStatstistics API to get all data
  - Add new brawler mandy

- v2.3.9 (2022.11.08)
  - Add new brawler buster
  - Add map images and translation

- v2.3.8 (2022.06.30)
  - Add hunters mode and new brawler otis
  - Add translations of new maps
  - Bug fix : nickname search value was displayed as encoded character at user list

- v2.3.7 (2022.05.10)

  - Reduce loading time of pages by changing logging interceptor
  - Use fetch join to reduce latency of viewing battle log
  - Add mode name to statistics page

- v2.3.6 (2022.05.08)

  - Bug fix : Bot Drop is shown at main page

- v2.3.5 (2022.05.07)

  - Record saving logic optimization to reduce data transfer

- v2.3.4 (2022.05.03)

  - Cache of map statistics enabled
  - Add bot drop map images

- v2.3.3 (2022.05.02)

  - New brawlers images (Janet and Bonnie) are added
  - Period selection function is added to map page
  - Optimazatioin of getting event logic

- v2.3.2 (2022.04.29)

  - Gather statistic data of Bot Drop mode
  - Optimazation of saving battle record logic

- v2.3.1 (2022.04.14)

  - Cache-control enabled for images to reduce transferring data

- v2.3.0 (2022.03.06)
  - Duels 모드가 집계되도록 업데이트 되었습니다.
  - 맵이 마지막으로 등장한 시점을 Maps에서 확인할 수 있습니다.
  - Nextjs 로 변경하여, 서버사이드 랜더링이 적용되었습니다.
  - 구글 애드센스가 적용되었습니다.
- v2.2.0 (2022.02.12)
  - 구글 봇이 언어별로 검색기록을 따로 수집할 수 있도록 Url 에 언어정보가 추가 되었습니다.
  - navigation bar 디자인이 변경되었습니다.
  - blog 메뉴가 추가되었습니다.
- v2.1.0 (2022.02.05)
  - Change domain name from brawlstat.xyz to brawlmeta.com
  - Apply https
  - Add Google Analytics
  - Add new features
  - 신규 유저 태그 조회 및 등록 기능이 추가되었습니다.
- v2.0.2 (2021.10.04)

  현재 로테이션인 이벤트 목록을 볼 수 있는 페이지 추가

- v2.0.1 (2021.04.28)

  API 호출 내역을 모니터링 하기 위해 Interceptor 추가

### 개발 예정

- 모드, 브롤러 사용 통계 페이지 추가

## Demo Page

hosting page

- version 2 : https://www.brawlmeta.com
- version 1 : http://brawlstars-260814.web.app

## version 1.0

React + firebase + nodejsを利用して実装したバージョンです。

ノードjsでサーバーを実行させ、定期的にfirestoreに戦闘記録をinsertします。

React + firebase + nodejs를 이용해서 구현한 버전입니다.

nodejs 로 서버를 실행시켜 주기적으로 firestore에 전투 기록을 insert합니다.

### 구현된 기능

- User List에서 user 이름을 클릭하면 모드 별로 전투 기록을 볼 수 있습니다.
- 유저 이름으로 검색하여 전투 기록을 찾아볼 수 있습니다.