import React, {Component} from 'react';

class ModeList extends Component{

    render(){
        return (
            <select>
                <option value="gemGrab" label="gemGrab"/>
                <option value="heist" label="heist"/>
                <option value="brawlBall" label="brawlBall"/>
            </select>
        )
    }
}

export default ModeList;