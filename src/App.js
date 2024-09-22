import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ContentGrid from './components/ContentGrid';
import './style.css';

const App = () => {
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [searchEnabled, setSearchEnable] = useState(false); 
    const [contentItems, setContentItems] = useState({}); 
    const [page, setPage] = useState(1); 
    const loader = useRef(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://test.create.diagnal.com/data/page${page}.json`);
                setContentItems((prevItems) => ({
                    ...prevItems,
                    ...response.data.page,
                }));
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };
        fetchData();
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1 }
        );

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, []);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleSearchIcon = () => {
        setSearchEnable(true);
    };

    const handleBackButton = () => {
        setSearchTerm(''); 
        setSearchEnable(false); 
    };

    return (
        <div className="app">
            <nav className="navbar">
                <img
                    src="/images/nav_bar.png"
                    alt="Navbar Background"
                    className="navbar-bg"
                />

                <div className="navbar-content">
                <div className="title-container">
                <img src='/images/Back.png' alt='back button' className='back-button' onClick={handleBackButton} />
                <h1 className="title">{contentItems?.title}</h1>
                    </div>
                    {
                        searchEnabled ?
                            <SearchBar onSearch={handleSearch} />
                            :
                            <img
                                src='/images/search.png'
                                alt='Search Icon'
                                className='header-icon search-icon'
                                onClick={handleSearchIcon}
                            />
                    }
                </div>
            </nav>
            <ContentGrid searchTerm={searchTerm} contentItems={contentItems} loader={loader} />
        </div>
    );
};

export default App;
