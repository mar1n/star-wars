import React from 'react';
import './Search.css';
export default function Search({ value, onChange }) {
    return (
        <>
            <div className='search'>
                <label>
                    Search
            </label>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </>
    );
}
