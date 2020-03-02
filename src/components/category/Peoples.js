import React, { useState, useEffect } from 'react';
import Pagination from '../pagination/Paginations';
import Search from '../search/Search';
import Posts from '../posts/Posts';

export default function Peoples() {
    const [data, setData] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function getPages() {
            setLoading(false);
            fetch(`/repos/people`)
                .then(response => response.json())
                .then(people => {
                    setData(people);
                    setPosts(people);
                    setLoading(true);
                })
        }

        console.time("Time my API call");
        getPages();
        console.timeEnd("Time my API call");
    }, [])

    const setSearchName = (result) => {
        setData(result);
    }

    const onSearchChange = (value) => {
        setSearch(value.target.value);
        setPosts(data.filter(x => x.name.toLowerCase().includes(value.target.value.toLowerCase())));
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <Search value={search} onChange={(e) => onSearchChange(e)} />
            <div >
                <Posts
                    list={currentPosts}
                    pattern={search}
                    loading={loading}
                />
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                />
            </div>
        </>
    );
}