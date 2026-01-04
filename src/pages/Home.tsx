import React, { useState, useEffect } from 'react'; // UPDATED: Added useEffect
import { useQueries, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { weatherData, fetchWeatherById, fetchWeatherByName } from '../extra/Api';
import CityCard from '../components/CityCard';

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

    // const handleCityClick = (city: weatherData) => {
    //     navigate(`/city?${city.coord.lon}&lat=${city.coord.lat}&id=${city.id}`, { state: { city } });
    // }
    // Inside Home.tsx
    const handleCityClick = (city: weatherData) => {
        // Corrected the lon= part in the URL
        navigate(`/city?lon=${city.coord.lon}&lat=${city.coord.lat}&id=${city.id}`, { state: { city } });
    }

    const handleSearch = () => {
        if (searchTarget.trim()) {
            setCityName(searchTarget); // This triggers the useQuery above
        }
    }

    if (isLoading) return <h2>Loading Weather Data...</h2>;

    return (
        /* 1. Use flex and items-center on the main wrapper to ensure horizontal centering */
        <div className="w-full min-h-screen flex flex-col items-center px-4 pb-20">

            {/* Search Bar: centered with mx-auto */}
            <div className='flex w-full max-w-[400px] mx-auto rounded-full overflow-hidden mt-[100px] mb-10 bg-white/20 backdrop-blur-md border border-white/30'>
                <input
                    type="text"
                    placeholder="Search city..."
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="bg-transparent text-white w-full px-6 py-2 outline-none placeholder:text-white/50"
                />
                <button onClick={handleSearch} className='bg-green-500 px-5 cursor-pointer hover:bg-green-600 transition-colors'>
                    <img src="/images/search.png" alt="search" className="w-5 h-5" />
                </button>
            </div>

            {/* Loading Overlay */}
            {(isLoading || isSearching) &&
                <div className="fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center">
                    <p className="text-2xl font-semibold text-white">Loading...</p>
                </div>
            }

            {/* Error Message Space */}
            <div className="h-10 flex items-center justify-center">
                {(searchError && cityName) && (
                    <p className="text-[#EF5350] font-medium">Something went wrong. Please check the city name!</p>
                )}
            </div>

            {/* 2. THE GRID: Updated for centering and 5 columns */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-[1400px] justify-items-center justify-center'>

                {/* Search Result */}
                {searchData && cityName && (
                    <div className="col-span-full w-full flex flex-col items-center mb-10">
                        {/* Wrap the title in a container to align it with the left side of the card */}
                        <div className="w-full max-w-[280px]">
                            <h3 className="text-white opacity-70 mb-4 text-left">Search Result:</h3>
                        </div>

                        <CityCard
                            city={searchData}
                            onClick={() => handleCityClick(searchData)}
                            bgClass="bg-card-bg-1"
                        />

                        {/* This divider should also match the max-width for symmetry */}
                        <div className="w-full max-w-[280px] h-[1px] bg-white/20 mt-10"></div>
                    </div>
                )}

                {/* Default List Display */}
                {weatherResults.map((result, index) => {
                    if (result.status === 'success') {
                        const city = result.data;
                        return (
                            <CityCard
                                key={city.id}
                                city={city}
                                onClick={() => handleCityClick(city)}
                                // Apply the gradient to the first one, glass to others
                                bgClass={index === 0 ? "bg-card-bg-1" : ""}
                            />
                        );
                    }
                    return <div key={index} className="text-red-400">Error</div>;
                })}
            </div>
        </div>
    );
}

export default Home;