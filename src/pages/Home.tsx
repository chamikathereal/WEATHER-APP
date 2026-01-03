import React, { useState, useEffect } from 'react'; // UPDATED: Added useEffect
import { useQueries, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { weatherData, fetchWeatherById, fetchWeatherByName } from '../extra/Api';

const cityIds = (process.env.REACT_APP_CITY_LIST || '1248991,1850147,5128581').split(',').map(id => parseInt(id));

const Home: React.FC = () => {
    const [searchTarget, setSearchTarget] = useState(''); // What the user types
    const [cityName, setCityName] = useState('');         // What we actually search for
    const navigate = useNavigate();

    // UPDATED: Added useEffect to clear search result when input is deleted
    useEffect(() => {
        if (searchTarget.trim() === '') {
            setCityName('');
        }
    }, [searchTarget]);

    // 1. Fetch Default Cities (Static List)
    const weatherResults = useQueries({
        queries: cityIds.map((id) => ({
            queryKey: ['weather', id],
            queryFn: () => fetchWeatherById(id),
        })),
    });

    // 2. Fetch Search City (Dynamic from API)
    const { data: searchData, isFetching: isSearching, error: searchError } = useQuery({
        queryKey: ['searchCity', cityName],
        queryFn: () => fetchWeatherByName(cityName),
        enabled: !!cityName, // Only runs when cityName is set
        retry: false,
    });

    const isLoading = weatherResults.some((result) => result.isLoading);

    const handleCityClick = (city: weatherData) => {
        navigate(`/city/${city.id}`, { state: { city } });
    }

    const handleSearch = () => {
        if (searchTarget.trim()) {
            setCityName(searchTarget); // This triggers the useQuery above
        }
    }

    if (isLoading) return <h2>Loading Weather Data...</h2>;

    return (
        <div className="App">
            <header className="App-header">
                {/* Search Bar */}
                <div>
                    <input 
                        type="text" 
                        placeholder="Search any city in the world..." 
                        value={searchTarget} 
                        onChange={(e) => setSearchTarget(e.target.value)} 
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                {/* Search Results Display (Direct from API) */}
                {isSearching && <p>Searching API...</p>}
                
                {/* UPDATED: Added cityName check to ensure error/data clears when input is empty */}
                {searchError && cityName && (
                    <p style={{ color: 'red' }}>City "{cityName}" not found in OpenWeather database.</p>
                )}
                
                {/* UPDATED: Added cityName check to hide search result when input is empty */}
                {searchData && cityName && (
                    <div className="search-section">
                        <h3>API Search Result:</h3>
                        <ul onClick={() => handleCityClick(searchData)}>
                            <li>Name - {searchData.name}</li>
                            <li>Feels Like - {searchData.main.feels_like}</li>
                            <li>Humidity - {searchData.main.humidity}</li>
                            <li>Country - {searchData.sys.country}</li>
                            <li>Icon - {searchData.weather[0].icon}</li>
                            <img src={`https://openweathermap.org/img/wn/${searchData.weather[0].icon}@2x.png`} alt="weather icon" />
                        </ul>
                        <hr/>
                    </div>
                )}

                {/* Default List Display */}
                <h3>Featured Cities:</h3>
                <div className="weather-grid">
                    {weatherResults.map((result, index) => {
                        if (result.status === 'success') {
                            const city = result.data;
                            return (
                                <ul key={city.id} onClick={() => handleCityClick(city)}>
                                    <li>Name - {city.name}</li>
                                    <li>Feels Like - {city.main.feels_like}</li>
                                    <li>Humidity - {city.main.humidity}</li>
                                    <li>Country - {city.sys.country}</li>
                                    <li>Icon - {city.weather[0].icon}</li>
                                    <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="weather icon" />
                                </ul>
                            );
                        }
                        return <div key={index}>Error loading default city</div>;
                    })}
                </div>
            </header>
        </div>
    );
}

export default Home;