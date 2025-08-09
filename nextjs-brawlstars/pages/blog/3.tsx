import React from 'react';
import styles from '../../styles/Blog.module.scss';

const Post3: React.FC = () => {
    return (<div className={`${styles.blog} ${styles['post2']}`}>
        <div className={styles.title}>
            2월 인기 있는 브롤러는 무엇일까요?
        </div>
        <div className={styles.content}>
            2022년 2월 1일부터 15일까지 플레이한 브롤러들을 집계해보았습니다.
            <br />
            <br />
            <img src="/blog/3/brawlerStat.png" alt="Brawler Statistics" />
            <br />
            <br />
            에드거가 1위를 차지하였습니다. 에드거가 처음 출시되었을 때, 엘 프리모의 상위 호환이라고 불릴만큼 좋은 위상을 보여줬는데요.
            무엇보다 오토에임만으로도 충분히 쉽게 즐길 수 있고, 그 파워도 세기에 사랑 받고 있는 브롤러인 것 같습니다.
            <br />
            <br />
            2위는 다이너마이크입니다. 원거리 투척 브롤러로 벽이 많은 지형에서 굉장한 힘을 발휘합니다.
            특히 쇼다운 맵인 해골천 일명 티밍천이라고 불리우는 맵에서 다이너마이크는 필수적으로 사용되는 브롤러입니다.
            <br />
            <br />
            3위는 쉘리입니다. 브롤스타즈의 상징이자 처음 시작할 때 가장 먼저 얻게 되는 브롤러인 만큼 많이 사용되고 있습니다.
        </div>
    </div>);
}

export default Post3;