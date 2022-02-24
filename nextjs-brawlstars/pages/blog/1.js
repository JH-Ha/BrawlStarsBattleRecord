import styles from '../../styles/Blog.module.scss';

export default function Post1() {
    return (<div className={styles.blog}>
        <div className={styles.title}>
            신규 브롤러 팽, 그 성능은?
        </div>
        <div className={styles.content}>
            시즌 10 &apos;호랑이의 해&apos;의 신규 브롤러 팽이 등장했습니다.
            팽 또한 크로마틱 브롤러로 브롤패스를 구매하여 얻을 수 있고, 상자에서도 전설 브롤러 획득 확률로 뽑을 수 있습니다.
            이렇게 출시되는 크로마틱 브롤러는 항상 좋은 성능을 가지고 있었는데요.
            과연 팽도 이전의 브롤러들과 비슷하게 좋은 성능을 가지고 있을까요 ?
            팽의 특성을 살펴보고, 현재 등장하고 있는 맵들에서 어느 정도 활약하고 있는지 살펴보려고 합니다.
            < br />
            <br />
            먼저, 팽의 공격부터 살펴보겠습니다.일반 공격은 스피드 킥으로 근거리의 단일 타겟을 공격합니다.
            근거리 단일 타겟을 가진 브롤러의 경우 타격을 하기 위해 접근하기가 어렵지만, 대신 높은 공격력을 자랑해 접근하면 공격 3방에 상대 브롤러를 제압할 수 있습니다.
            11렙 기준 공격력은 2100이고 체력은 6750으로 높은 편입니다.
            < br />
            <br />
            특수공격은 플라잉 킥으로 발차기를 하면서 이동하는 공격입니다.적에게 적중하면 연속으로 3번 더 발차기를 날리게 됩니다.
            근접 브롤러의 단점인 접근성을 극복시켜주는 특수공격입니다.
            그래서 원거리 브롤러들이 거리를 내어주지 않아 곤란한 상황에서도 특수공격을 통해서 기회를 만들 수 있습니다.
            < br />
            <br />

            <div className={styles.two}>
                <div className={styles.imgContainer}>
                    <img src='/images/maps/gemGrab/Cotton Candy Dreams.png' alt='Cotton Candy Dreams' />
                    <div className={styles.discription}>솜사탕의 꿈</div>
                </div>
                <div>
                    팽의 승률은 어떨까요? 잼그랩을 살펴봅시다. 모든 승률 통계자료는 2월 8일 기준입니다.
                    솜사탕의 꿈에서는 승률이 58.9%로 전체 브롤러중 2위를 차지하고 있습니다.
                    <br />
                    <br />
                    양쪽에 부쉬가 많은 맵이라서 근접 브럴러들이 잠복해 있기 좋은 형태를 띄고 있습니다.
                    근접 브롤러 중에는 대릴과 비비, 로사가 같이 강세를 띄고 있습니다.
                    <br />
                    <br />
                    이어서 보석 요새, 독버섯 함정에서도 각각 3위, 4위의 승률을 보이고 있어서 굉장히 좋은 성과를 내고 있습니다.
                </div>
            </div>
            <br />
            <div className={styles.two}>
                <div className={styles.imgContainer}>
                    <img src='/images/maps/showdown/Feast or Famine.png' alt='Feast or Famine' />
                    <div className={styles.discription}>모 아니면 도</div>
                </div>
                <div>
                    쇼다운에는 어떨까요? 며칠 전에 등장했던 &apos;모 아니면 도&apos;에서는 13위로
                    잼그랩에 비하면 낮은 순위를 기록하고 있습니다.
                    오늘 등장한 맵인 호수 천국에서도 16위로 다소 부진한 성적을 내고 있는데요.
                    <br />
                    <br />
                    아무래도 잼그랩과는 달리 쇼다운은 큐브를 빠르게 먹는 것이 중요한데,
                    팽의 경우는 단일 타겟의 공격과 더불어 느린 공격속도로 인해서 이런 결과가 나오지 않았을까 예상해봅니다.
                </div>
            </div>
            <br />
            <br />
            <div>
                오늘은 신규 브롤러 팽에 대해서 짧게 알아봤습니다.
                많이 플레이하면서 즐겨보시길 바랍니다~
            </div>
        </div>
    </div>);
}