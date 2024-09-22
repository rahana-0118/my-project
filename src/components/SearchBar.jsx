import React, { useState } from 'react';

const SearchBar =({onSearch})=>{
const [inputValue, setInputValue]= useState('')

const handleChange =(e)=>{
const value = e.target.value;
setInputValue(value);
onSearch(value)
}
return(
    <div className='search-bar'>
        <input 
        type ="text"
        value={inputValue}
        onChange={handleChange}
       />
    </div>
)
}
export default SearchBar;