import React, { useState, useEffect } from 'react';

function App() {
    const [trainDetails, setTrainDetails] = useState([]);
    const [authToken, setAuthToken] = useState('');
    const [selectedTrain, setSelectedTrain] = useState(null);

    useEffect(() => {
        // Authentication request to obtain the token
        const authUrl = 'http://20.244.56.144/train/auth';
        const authData = {
            companyName: 'Train Central',
            clientID: '2cbb96a2-94b6-4ef5-a5f3-616d951f0b12',
            ownerName: 'Prakaash',
            ownerEmail: 'prakaash3775@abc.edu',
            rollNo: '46',
            clientSecret: 'JBkOsZEUJppfccjK'
        };

        fetch(authUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        })
        .then(response => response.json())
        .then(data => {
            setAuthToken(data.access_token); // Store the obtained access token
        })
        .catch(error => {
            console.error('Authentication error:', error);
        });
    }, []); // Run once on component mount

    useEffect(() => {
        if (authToken) {
            // API request to fetch train details
            const url = 'http://20.244.56.144/train/trains';
            const options = {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };

            fetch(url, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Request failed with status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setTrainDetails(data);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        }
    }, [authToken]);

    return (
      <div className="App">
          <h1>Train Details</h1>
          <ul>
              {trainDetails.map((train, index) => (
                  <li key={index}>
                      {train.trainName}
                      <button onClick={() => setSelectedTrain(train)}>View Details</button>
                  </li>
              ))}
          </ul>
          <div>
              <h2>Selected Train Details</h2>
              <input
                  type="text"
                  placeholder="Enter train name"
                  onChange={event => {
                      const trainName = event.target.value;
                      const selected = trainDetails.find(train => train.trainName === trainName);
                      setSelectedTrain(selected);
                  }}
              />
              {selectedTrain && (
                  <pre>
                      {JSON.stringify(selectedTrain, null, 2)}
                  </pre>
              )}
          </div>
      </div>
  );
}

export default App;
