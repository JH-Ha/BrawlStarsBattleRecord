import React, { Component } from 'react';
import "./MapList.scss";
import ModeList from './ModeList';
import qs from 'qs';
import { getData } from './ApiHandler';
import { withTranslation } from 'react-i18next';
import AdSense from 'react-adsense';
import Loading from './Loading';
import { ReactTitle } from 'react-meta-tags';

class MapList extends Component {
    state = {
        mode: 'gemGrab',
        maps: [],
        filteredMaps: [],
        loading: false,
    }
    clickMap = (mapName, mapMode) => {
        console.log(this);
        let paramMapName = mapName.replace("&", "%26");
        let { history } = this.props;
        history.push(`/map/${paramMapName}/mode/${mapMode}`);
    }
    setFilteredMap = (mode) => {
        let filteredMaps = this.state.maps;
        if (mode !== 'ALL' && mode !== undefined) {
            filteredMaps = this.state.maps.filter(x => {
                return x.mode === mode;
            });
        }
        this.setState({
            filteredMaps: filteredMaps,
        });
    }
    changeMode = (mode) => {
        console.log(`changeMode ${mode}`);
        console.log(this);

        this.setFilteredMap(mode);

        let { history } = this.props;
        history.push(`/mapList?mode=${mode}`);
    }
    componentDidMount() {
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true,
        });
        console.log(`query mode ${query.mode}`);

        //this.setFilteredMap(query.mode);
        this.setState({
            loading: true,
        })
        getData(`/gameMap`).then(response => {
            console.log(response);
            const data = response.data;
            let mode = 'gemGrab';
            if (query.mode !== undefined) {
                mode = query.mode;
            }
            this.setState({
                maps: data,
                mode: mode,
                loading: false,
            })
            this.setFilteredMap(mode);
            //this.changeMode(query.mode);
        }).catch(error => {
            console.log(error);
        });
    }
    render() {
        const { t } = this.props;
        return <><div className="mapList">
            <ReactTitle title={`Brawl Meta Maps`} />
            {this.state.loading ?
                <Loading></Loading>
                : ""}
            <h3>
                {t('mapsGuide')}
            </h3>
            <div>
                <ModeList key={this.state.mode} changeMode={this.changeMode} mode={this.state.mode}></ModeList>
            </div>
            <div className="gemGrabContainer">{
                this.state.filteredMaps.map((map, index) => {
                    return <div key={index} className="gemGrabItem" >{t(map.name)}
                        <img onClick={() => { this.clickMap(map.name, map.mode) }} src={`./images/maps/${map.mode.indexOf("Showdown") !== -1 ? "showdown" : map.mode}/${map.name}.png`} alt={map.name}></img>
                    </div>
                })}
            </div>
        </div>
            <AdSense.Google
                style={{ display: 'block' }}
                client='ca-pub-4114406385852589'
                slot='4607116156'
                format='auto'
                responsive='true'
            />
        </>
    }
}

export default withTranslation()(MapList);