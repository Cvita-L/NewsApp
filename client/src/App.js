import { useState } from 'react';

import './App.scss';

import ErrorModal from './components/ErrorModal/ErrorModal';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import NavigationBar from './components/NavigationBar/NavigationBar';
import NewsList from './components/NewsList/NewsList';
import SearchBar from './components/SearchBar/SearchBar';

import useFetch from './hooks/useFetch';

import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const [url, setUrl] = useState("/categories/home");

  const { loading } = useFetch(url, setData, setError);

  const register = async(username, password) => {
    await axios.post(`/auth/register?user=${username}&pass=${password}`)
      .then(res => {
        localStorage.setItem("token", res.data);
        setLoggedIn(true);
      })
      .catch(err => setError(err.response.data));
  }

  const userLogin = async(username, password) => {
    await axios.post(`/auth/login?user=${username}&pass=${password}`)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        setLoggedIn(true);
      })
      .catch(err => setError(err.response.data));
  }

  const getBusiness = async() => {
    const headers = {      
      "authorization": localStorage.getItem("token") || "",
    }; 

    await axios.get(`/auth/getBusiness?token=${localStorage.getItem("token")}`, { headers: headers })
      .then(res =>  setData(res.data.articles))
      .catch(err => setError(err.response.data));
  }

  const onArticleClick = url => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  const onCategoryClick = category => { 
    if(category === 'Business') {
      getBusiness();
    } else if(category === 'Home') {
      setUrl(`/categories/home`); 
    } else 
      setUrl(`/categories?categ=${category}`); 
  }

  const onSearch = searchTerm => {
    setUrl(`/search?q=${searchTerm}`);
  }

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && <ErrorModal title="Error" message={error} onConfirm={errorHandler} />}
      {
        !loggedIn ? 
          <Login login={userLogin} register={register} /> : 
        <>
          <Header />
          <SearchBar onSearch={onSearch} />
          <NavigationBar onClick={onCategoryClick} />
          {loading ? "Loading..." : <NewsList articles={data} onClick={onArticleClick} />}
        </>
      }
    </>
  );
}

export default App;
