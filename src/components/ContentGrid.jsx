import React from 'react';
import { Grid2 } from '@mui/material';

const ContentGrid2 = ({ searchTerm, contentItems, loader }) => {

    const filteredItems = contentItems['content-items']?.content?.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    ) || [];
    return (
        <div className='content-Grid'>
            <Grid2 container spacing={4}>
                {
                filteredItems.length === 0  ?
                <img
                src={"/images/placeholder_for_missing_posters.png"}
                alt={"no items"}
                className='image'
            />
                :
                filteredItems.map((item, index) => (
                    <Grid2 item key={index} xs={12} sm={6} md={4}>
                        <img
                            src={`https://test.create.diagnal.com/images/${item['poster-image']}`}
                            alt={item.name}
                            className='image'
                        />
                        <p className='item-title'>{item.name}</p>
                    </Grid2>
                ))}
            </Grid2>
            <div ref={loader} className='loading-indicator'></div>
        </div>
    );
};

export default ContentGrid2;
 