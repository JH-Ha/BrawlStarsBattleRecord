import React, {Component} from 'react';

const trioStyle = {
    display : "flex",
}

class TrioMode extends Component{
    render(){
        const {
            battleTime,
            bralwer_name,
            duration,
            isStarPalyer,
            map,
            power,
            trophies,
            trophyChange
        } = this.props;
        return (<div style={trioStyle
        }>
            <div>{battleTime}</div>
            <div>{bralwer_name}</div>
            <div>{duration}</div>
            <div>{isStarPalyer}</div>
            <div>{map}</div>
            <div>{power}</div>
            <div>{trophies}</div>
            <div>{trophyChange}</div>
        </div>)
    }
}

export default TrioMode;