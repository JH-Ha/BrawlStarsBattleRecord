import Head from 'next/head';
import React from 'react';
import styles from "../styles/BlogList.module.scss";
import resources, { BlogResource } from '../components/BlogResouce';
import Link from 'next/link';

const BlogList: React.FC = () => {
    const sortedResources = [...resources].sort((a, b) => {
        if (a.date > b.date) return -1;
        else return 1;
    });

    return (
        <div className={styles.blogList}>
            <Head>
                <title>{`Brawl Meta Blog`}</title>
            </Head>
            <table className='table'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedResources.map((resource, index) => {
                        return (<tr key={`blogkey-${resource.id}`} className="contentTr">
                            <td>{index + 1}</td>
                            <td>
                                <Link href={`/blog/${resource.id}`}>{resource.title}</Link>
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