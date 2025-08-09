import React, { Component } from 'react'
import styles from '../styles/Loading.module.scss';

interface LoadingState {
    opacityList: number[];
    startIdx: number;
    intervalId: NodeJS.Timer | null;
}

class Loading extends Component<{}, LoadingState> {
    state: LoadingState = {
        opacityList: [],
        startIdx: 0,
        intervalId: null,
    }

    componentDidMount(): void {
        let opacityList: number[] = [];
        for (let i = 0; i < 12; i++) {
            opacityList.push((i + 1) / 12);
        }
        this.setState({
            opacityList: opacityList,
        });
        const intervalId = setInterval(() => {
            let nextIdx = this.state.startIdx - 1;
            if (nextIdx < 0) nextIdx += 12;
            this.setState({
                startIdx: nextIdx,
            });
        }, 200);
        this.setState({
            intervalId: intervalId
        });
    }

    render(): JSX.Element {
        let bars: number[] = [];
        let angle = 360 / 12;

        for (let i = 0; i < 12; i++) {
            bars.push(angle * i);
        }

        return <div className={styles.Loading}>
            <div className={styles.barsContainer}>
                <div className={styles.bars}>
                    {bars.map((bar, index) => {
                        return <div key={`Loading-${index}`} className={styles.bar} style={{
                            transform: `rotate(${bar}deg)`,
                            left: `${30 * Math.sin(bar / 360 * 2 * Math.PI)}px`,
                            top: `${30 - 30 * Math.cos(bar / 360 * 2 * Math.PI)}px`,
                            opacity: `${this.state.opacityList[(this.state.startIdx + index) % 12]}`,
                        }}>
                        </div>
                    })
                    }
                </div>
            </div>
            <div>
                Loading Data
            </div>
        </div>
    }
}

export default Loading;