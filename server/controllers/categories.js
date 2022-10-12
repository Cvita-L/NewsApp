import https from 'https';

import { 
    API_HOST, 
    TOP_HEADLINES_URL, 
    TOP_HEADLINES_BY_CATEGORY_URL, 
    API_KEY_URL, 
} from '../config.js';

export const getHome = (req, res, next) => {
    const options = {
        host: API_HOST,
        path: TOP_HEADLINES_URL + API_KEY_URL,
        headers: {
            'User-Agent': req.get('user-agent')
        }
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
                res.status(201).send(newsData);
            });
        });
    } catch(e) {
        next(e);
    }
}

export const getByCategory = (req, res, next) => {
    const options = {
        host: API_HOST,
        path: TOP_HEADLINES_BY_CATEGORY_URL + req.query.categ + API_KEY_URL,
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
                res.status(201).send(newsData);
            });
        });
    } catch(e) {
        next(e);
    }
}