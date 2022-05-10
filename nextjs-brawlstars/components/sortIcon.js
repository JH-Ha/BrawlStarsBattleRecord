import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/SortIcon.module.scss';

const DEFAULT = "DEFAULT";
const DESC = "DESC";

class SortIcon extends Component {
    render() {
        const { order } = this.props;
        return <div className={styles.sortIcon}>

            {order === DEFAULT ?
                <FontAwesomeIcon icon={faSort} />
                : order === DESC ?
                    <FontAwesomeIcon icon={faSortDown} />
                    : <FontAwesomeIcon icon={faSortUp} />
            }

        </div>
    }

}

export default SortIcon;