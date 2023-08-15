const http = require('http');

const url = 'http://20.244.56.144/train/trains';
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIwODA5MDQsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiMmNiYjk2YTItOTRiNi00ZWY1LWE1ZjMtNjE2ZDk1MWYwYjEyIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjQ2In0.CAT3KykTIx3PcodDcuPSybeJK41RaNuGtxkFi6fehNQ';
const options = { headers: { 'Authorization': `Bearer ${authToken}` } };
const req = http.get(url, options, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const processResponse = () => {
            if (res.statusCode === 200) {
                const trainDetails = JSON.parse(data);
                console.log('Train Details:', trainDetails);
            } else {
                console.log('Request Failed with status code:', res.statusCode);
                console.log('Response Data:', data);
            }
        };
        res.on('error', error => {
            console.error('Error:', error.message);
        });
        processResponse();
    });
});

req.on('error', error => {
    console.error('Request Error:', error.message);
});