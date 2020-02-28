import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router';

export default function Post({ match }) {

    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [error, setError] = useState([]);
    useEffect(() => {
        fetch(`https://swapi.co/api/people/${id}/?format=json`)
            .then(res => res.json())
            .then((result) => {
                setPost(result)
            },
                (error) => {
                    setError(error)
                }
            );
    }, []);
    return (
        <>
            <div>
                {post.name}
            </div>
        </>
    )
}