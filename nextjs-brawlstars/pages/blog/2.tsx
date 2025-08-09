import React from 'react';
import styles from '../../styles/Blog.module.scss';

const Post2: React.FC = () => {
    return (<div className={`${styles.blog} ${styles['post2']}`}>
        <div className={styles.title}>
            2월초 인기 있는 모드는 무엇일까요?
        </div>
        <div className={styles.content}>
            2022년 2월 1일부터 10일까지 트로피 500점이상에서 플레이된 게임에 대해서, 어떤 게임 얼마나 많이 플레이 되었는지 집계를 진행해보았습니다.
            트로피 500점이상이라는 조건을 둔 것은 점수가 낮을 때, AI와 같이 플레이되기 때문에 집계의 정확도를 떨어뜨릴 수 있다고 판단되어
            제외 시켰습니다. 과연 어떤 모드가 인기가 많을까요?
            <br />
            <br />
            <img src="/blog/2/playRate.PNG" alt="Play Rate Statistics" />
            <br />
            <br />
            바로 쇼다운입니다. 무려 솔로쇼다운과 듀오쇼다운이 각각 41.8%, 17.7%의 비율로 1,2위를 차지하고 있는 것을 확인할 수 있습니다.
            3,4위는 브롤볼과 젬그랩으로 브롤스타즈 출시 때부터 함께 했던 맵인만큼 인기가 많이 있는 것을 볼 수 있습니다.
            <br />
            <br />
            사실 쇼다운은 혼자서도 쉽게 할 수 있고, 게임 시간이 비교적 짧기 때문에 선호도가 높은 모드라고 생각됩니다.
        </div>
    </div>);
}

export default Post2;