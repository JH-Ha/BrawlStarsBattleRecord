import React from 'react';
import "./Blog.scss";
import { ReactTitle } from 'react-meta-tags';
import resources from './BlogResouce';

const Blog = (props) => {
    const id = props.match.params.id;
    const article = resources.find(a => a.id === id);
    return (
        <div className='blog'>
            <ReactTitle title={article?.title} />
            <div className='title'>{article?.title}</div>
            <div className='content' dangerouslySetInnerHTML={{ __html: article?.content }} />
        </div>
    )
}

export default Blog;