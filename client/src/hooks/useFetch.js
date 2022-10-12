import { useState, useEffect } from "react";
import axios from 'axios';

const headers = {      
    "authorization": localStorage.getItem("token") || "",
}; 

const useFetch = (url, setData, setError) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await axios.get(url, { headers: headers })
                    .then(res => setData(res.data.articles));
            } catch(e) {
                setError(e.response.statusText);
            }
            setLoading(false);
        };

        fetchData();
    }, [url, setData, setError]);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data.articles);
        } catch(err) {
            setError(err);
        }
        setLoading(false);
    };

    return { loading, reFetch };
};

export default useFetch;