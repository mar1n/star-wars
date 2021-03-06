import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router';

export default function Post({ match }) {

    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [error, setError] = useState([]);
    const location = useLocation();
    const history = useHistory();
    console.log(location);

    function goBackHandle() {
        history.goBack();
    }

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
            <div>Location = {location.pathname}</div>
            
            <button onClick={goBackHandle}>Go Back</button>
        </>
    )
}