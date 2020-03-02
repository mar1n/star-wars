import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useLocation } from 'react-router';

const isSearched = searchTerm => item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase());

export default function Posts({ list, pattern, loading, match }) {
    const location = useLocation();
    if (!loading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <ul className="list-group mb-4">
                {
                    list.filter(isSearched(pattern)).map((post, index) => (
                        <><li key={post.id} className="list-group-item">
                            {post.name}
                        </li>
                            <li>{index}</li>
                            <li>
                                <Link to={`${location.pathname}/${index}`} >{post.name}</Link>
                            </li>
                        </>
                    ))
                }
            </ul>
        </>
    );
}