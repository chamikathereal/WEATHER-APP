import React, { useState } from 'react';
import { useQueries, } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

type City = {

    name: string,
    id: number,
    main: {
        feels_like: number,
        humidity: number;
        temp: number;
    };
    sys: {
        country: string;
    };
    weather: [{
        main: string;
        icon: string;
    }]

}

const apiKey = process.env.REACT_APP_WEATHER_API_KEY || '';
const cityIds = (process.env.REACT_APP_CITY_LIST || '').split(',').map(id => parseInt(id));

const Home: React.FC = () => {

    const [cityName, setCityName] = useState('');

    const weatherResults = useQueries({
        queries: cityIds.map((id) => ({
            queryKey: ['weather', id],
            queryFn: async (): Promise<City> => {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}&units=metric`
                );
                if (!response.ok) throw new Error(`City ${id} failed`);
                return response.json();
            },
        })),
    });

    const isLoading = weatherResults.some((result) => result.isLoading);
    const hasError = weatherResults.every((result) => result.isError);

    const navigate = useNavigate();
    const handleCityClick = (city: City) => {
        navigate(`/city/${city.id}`, { state: { city } });
    }

    const handleSearch = () =>{
        console.log("Searching for city: ", cityName);
    }

    if (isLoading) return <h2>Loading Weather Data...</h2>;
    if (hasError) return <h2>Failed to load weather. Check API key or connection.</h2>;

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <input type="text" name="city" placeholder="Enter a city name" value={cityName} onChange={(e) => setCityName(e.target.value)} />
                    <button onClick={handleSearch}>Search</button>
                </div>
                {weatherResults.map((result, index) => {
                    if (result.status === 'success') {
                        const city = result.data;
                        return (
                            <ul key={index} onClick={() => handleCityClick(city)}>
                                <li>Name - {city.name}</li>
                                <li>Feels Like - {city.main.feels_like}</li>
                                <li>Humidity - {city.main.humidity}</li>
                                <li>Country - {city.sys.country}</li>
                                <li>Icon - {city.weather[0].icon}</li>
                                <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="weather icon" />
                            </ul>
                        );
                    }
                    return <div key={index}>Error loading city {cityIds[index]}</div>;
                })}

            </header>

        </div>

    );
}

export default Home;