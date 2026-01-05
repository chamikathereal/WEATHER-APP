import React, { useState, useEffect } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { weatherData, fetchWeatherById, fetchWeatherByName } from '../extra/Api';
import CityCard from '../components/CityCard';
import SkeletonCard from '../components/SkeletonCard';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

// Default cities to fall back on if LocalStorage is empty
const DEFAULT_CITY_IDS = (process.env.REACT_APP_CITY_LIST || '1248991,1850147,5128581,2643743,2968815,2172797,1816670').split(',').map(id => parseInt(id));

const Home: React.FC = () => {
    const [searchTarget, setSearchTarget] = useState('');
    const [cityName, setCityName] = useState('');
    
    // --- 1. NEW: State for Saved Cities ---
    const [savedIds, setSavedIds] = useState<number[]>(() => {
        const saved = localStorage.getItem('weather_app_cities');
        return saved ? JSON.parse(saved) : DEFAULT_CITY_IDS;
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (searchTarget.trim() === '') {
            setCityName('');
        }
    }, [searchTarget]);

    // --- 2. UPDATED: Fetch based on dynamic state 'savedIds' ---
    const weatherResults = useQueries({
        queries: savedIds.map((id) => ({
            queryKey: ['weather', id],
            queryFn: () => fetchWeatherById(id),
        })),
    });

    const { data: searchData, isFetching: isSearching, error: searchError } = useQuery({
        queryKey: ['searchCity', cityName],
        queryFn: () => fetchWeatherByName(cityName),
        enabled: !!cityName,
        retry: false,
    });

    const isLoadingDefaults = weatherResults.some((result) => result.isLoading);

    // --- 3. UPDATED: Save to LocalStorage on Click ---
    const handleCityClick = (city: weatherData) => {
        // Check if city is already in our list
        if (!savedIds.includes(city.id)) {
            const newIds = [city.id, ...savedIds]; // Add new city to the FRONT
            setSavedIds(newIds);
            localStorage.setItem('weather_app_cities', JSON.stringify(newIds));
        }
        
        // Navigate as usual
        navigate(`/city?lon=${city.coord.lon}&lat=${city.coord.lat}&id=${city.id}`, { state: { city } });
    }

    const handleSearch = () => {
        if (searchTarget.trim()) {
            setCityName(searchTarget);
        }
    }

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

    return (
        <div className="flex flex-col items-center w-full min-h-screen px-6 pt-10 pb-6 text-white font-poppins">
            
            {/* Header */}
            <div className="mb-10 space-y-2 text-center animate-fade-in-down">
                <span className="text-sm font-medium tracking-widest uppercase opacity-60">{today}</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Weather Forecast</h1>
            </div>

            {/* Search Bar */}
            <SearchBar 
                value={searchTarget}
                onChange={setSearchTarget}
                onSearch={handleSearch}
                isError={!!(searchError && cityName)}
            />

            {/* Main Content */}
            <div className='w-full max-w-[1260px] flex-1 mb-20'>
                
                {/* Search Result Display */}
                {isSearching ? (
                    <div className="flex flex-col items-center mb-16 animate-pulse">
                        <p className="mb-4 text-sm opacity-50">Searching...</p>
                        <SkeletonCard />
                    </div>
                ) : (
                    searchData && cityName && !searchError && (
                        <div className="flex flex-col items-center mb-16 animate-fade-in-up">
                            <div className="flex items-center gap-4 w-full max-w-[280px] mb-4">
                                <span className="flex-1 h-px bg-white/20"></span>
                                <span className="text-xs font-bold tracking-widest uppercase opacity-50">Search Result</span>
                                <span className="flex-1 h-px bg-white/20"></span>
                            </div>
                            <div className="w-full max-w-[280px]">
                                <CityCard
                                    city={searchData}
                                    onClick={() => handleCityClick(searchData)}
                                    // Make search result stand out
                                    bgClass="bg-gradient-to-br from-indigo-500/80 to-purple-600/80 border-indigo-200/50 shadow-indigo-500/20 shadow-2xl"
                                />
                            </div>
                        </div>
                    )
                )}

                {/* Popular / Saved Cities Header */}
                <div className="flex items-center gap-4 mb-8 opacity-40 animate-fade-in" style={{ animationDelay: '200ms' }}>
                    <span className="text-xs font-bold tracking-widest uppercase">
                        {/* Change title depending on if user has searched or not */}
                        {searchData ? "Saved Cities" : "Popular Cities"}
                    </span>
                    <div className="flex-1 h-px bg-white"></div>
                </div>

                {/* Cities List Grid */}
                <div className='flex flex-wrap justify-center gap-8'>
                    {isLoadingDefaults 
                        ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
                        : weatherResults.map((result, index) => {
                            if (result.status === 'success') {
                                return (
                                    <div key={result.data.id} className="w-full max-w-[280px]">
                                        <CityCard
                                            city={result.data}
                                            index={index}
                                            onClick={() => handleCityClick(result.data)}
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })
                    }
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Home;