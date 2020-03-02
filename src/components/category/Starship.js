import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router';

export default function Starship({ match }) {

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
        fetch(`https://swapi.co/api/starships/${id}/`)
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
            <h1>Starship</h1>
            <div>
                {post.name}
            </div>

            <button onClick={goBackHandle}>Go Back</button>
        </>
    )
}