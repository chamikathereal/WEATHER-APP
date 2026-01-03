import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { weatherData } from '../extra/Api';

const City: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Retrieve the 'city' object from the navigation state
    const city = location.state?.city as weatherData;

    if (!city) {
        return (
            <div>
                <h2>No data found. Please search from the Home page.</h2>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    return (
        <div className="city-details">
            <button onClick={() => navigate('/')}>← Back</button>
            <h1>{city.name}, {city.sys.country}</h1>
            <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`} alt="weather icon" />
            <ul>
                <li><strong>Temperature:</strong> {city.main.temp}°C</li>
                <li><strong>Feels Like:</strong> {city.main.feels_like}°C</li>
                <li><strong>Wind Speed:</strong> {city.wind.speed} m/s</li>
                <li><strong>Description:</strong> {city.weather[0].description}</li>
            </ul>
        </div>
    );
}

export default City;