import React from 'react';
const isSearched = searchTerm => item =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase());

export default function Posts({ list, pattern, loading }) {
    if(loading) {
        return <h2>Loading...</h2>
    }
    return (
        <>
            <ul className="list-group mb-4">
                {
                    list.filter(isSearched(pattern)).map(post => (
                        <li key={post.id} className="list-group-item">
                            {post.name}
                        </li>
                    ))
                }
            </ul>
        </>
    );
}