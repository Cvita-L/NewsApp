import './SearchBar.scss';

import searchSvg from '../../assets/Search.svg';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [state, setState] = useState('');
    
    const onSearchClick = () => {
        onSearch(state);
    }

    return <div>
        <h1 className='h1-myNews'>MyNews</h1>
        <input
            className="searchBar-input"
            type="text" 
            placeholder="Search news" 
            value={state}
            onChange={event => setState(event.target.value)}
        />
        <img className="searchBar-svg" role='img' alt='' src={searchSvg} />
        <button 
            className="search-button"
            onClick={onSearchClick}
        >
            Search
        </button>
    </div>
}

export default SearchBar;