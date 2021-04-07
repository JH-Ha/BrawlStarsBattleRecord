import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons'

const DEFAULT = "DEFAULT";
const ASC = "ASC";
const DESC = "DESC";

class SortIcon extends Component {
    render() {
        const { order } = this.props;
        return <>
            {order === DEFAULT ?
                <FontAwesomeIcon icon={faSort} />
                : order === DESC ?
                    <FontAwesomeIcon icon={faSortDown} />
                    : <FontAwesomeIcon icon={faSortUp} />
            }
        </>
    }

}

export default SortIcon;