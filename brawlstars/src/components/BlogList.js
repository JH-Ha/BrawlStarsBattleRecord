import React from 'react';
import { Link } from 'react-router-dom';
import "./BlogList.scss";

const BlogList = () => {
    return (
        <div className='blogList'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="contentTr">
                        <td>1</td>
                        <td>
                            <Link to="/blog/1">
                                신규 브롤러 팽, 그 실력은?
                            </Link>
                        </td>
                        <td>2022-02-08</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BlogList;