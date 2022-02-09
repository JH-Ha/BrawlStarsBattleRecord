import React from 'react';
import { Link } from 'react-router-dom';
import "./BlogList.scss";
import { ReactTitle } from 'react-meta-tags';
import resources from './BlogResouce';
const BlogList = () => {
    resources.sort((a, b) => {
        if (a.date > b.date) return -1;
        else return 1;
    });
    return (
        <div className='blogList'>
            <ReactTitle title={`Brawl Meta Blog`} />
            <table className='table'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {resources.map((resource, index) => {
                        return (<tr key={`blogkey-${resource.id}`} className="contentTr">
                            <td>{index + 1}</td>
                            <td>
                                <Link to={`/blog/${resource.id}`}>
                                    {resource.title}
                                </Link>
                            </td>
                            <td>{resource.date}</td>
                        </tr>)
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default BlogList;