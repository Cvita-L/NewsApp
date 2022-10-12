import https from 'https';
// import axios from 'axios';

import { 
    API_HOST, 
    SEARCH_URL, 
    API_KEY_URL,
} from '../config.js';

export const searchArticles = async(req, res, next) => {
    const options = {
        host: API_HOST,
        path: SEARCH_URL + req.query.q + API_KEY_URL,
        headers: {'User-Agent': req.get('user-agent')}
    };
    
    try {
        https.get(options, function (response) {
            let data;
            response.on('data', function (chunk) {
                if (!data) {
                    data = chunk;
                }
                else {
                    data += chunk;
                }
            });
            response.on('end', function () {
                const newsData = JSON.parse(data);
                res.send(newsData);
            });
        });
    } catch(e) {
        console.log("error:", e);
        next(e);
    }
}