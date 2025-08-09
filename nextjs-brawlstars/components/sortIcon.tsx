import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/SortIcon.module.scss';

const DEFAULT = "DEFAULT";
const DESC = "DESC";
const ASC = "ASC";

export type SortOrder = typeof DEFAULT | typeof DESC | typeof ASC;

interface SortIconProps {
    order: SortOrder;
}

class SortIcon extends Component<SortIconProps> {
    render(): JSX.Element {
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