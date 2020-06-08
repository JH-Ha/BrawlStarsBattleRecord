import React, {Component} from 'react';


class TrioMode extends Component{
    render(){
        const {
            battleTime,
            brawler_name,
            duration,
            isStarPalyer,
            map,
            power,
            trophies,
            trophyChange
        } = this.props;
        return (<tr >
            <td>{battleTime}</td>
            <td>{brawler_name}</td>
            <td>{duration}</td>
            <td>{map}</td>
            <td>{power}</td>
            <td>{trophies}</td>
            <td>{trophyChange}</td>
        </tr>)
    }
}

export default TrioMode;