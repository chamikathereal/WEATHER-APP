import React, { useState, useEffect } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { weatherData, fetchWeatherById, fetchWeatherByName } from '../extra/Api';
import CityCard from '../components/CityCard';
import SkeletonCard from '../components/SkeletonCard';
// UPDATED: Import the new Footer component
import Footer from '../components/Footer';
import { Search } from 'lucide-react';

const cityIds = (process.env.REACT_APP_CITY_LIST || '1248991,1850147,5128581,2643743,2968815,2172797,1816670').split(',').map(id => parseInt(id));

const Home: React.FC = () => {
    const [searchTarget, setSearchTarget] = useState('');
    const [cityName, setCityName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (searchTarget.trim() === '') {
            setCityName('');
        }
    }, [searchTarget]);

    const weatherResults = useQueries({
        queries: cityIds.map((id) => ({
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

    const handleCityClick = (city: weatherData) => {
        navigate(`/city?lon=${city.coord.lon}&lat=${city.coord.lat}&id=${city.id}`, { state: { city } });
    }

    const handleSearch = () => {
        if (searchTarget.trim()) {
            setCityName(searchTarget);
        }
    }

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

    return (
        <div className="w-full min-h-screen flex flex-col items-center px-6 pb-6 pt-10 font-poppins text-white">
            
            {/* --- 1. Header Section --- */}
            <div className="text-center mb-10 space-y-2 animate-fade-in-down">
                <span className="text-sm font-medium opacity-60 tracking-widest uppercase">{today}</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Weather Forecast</h1>
            </div>

            {/* --- 2. Search Bar --- */}
            <div className="relative w-full max-w-md group z-10 mb-14 animate-fade-in">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                
                <div className='relative flex w-full bg-black/30 backdrop-blur-xl border border-white/10 rounded-full overflow-hidden shadow-2xl transition-all group-hover:border-white/20'>
                    <input
                        type="text"
                        placeholder="Search for a city..."
                        value={searchTarget}
                        onChange={(e) => setSearchTarget(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="bg-transparent text-white w-full pl-6 pr-4 py-4 outline-none placeholder:text-white/40 text-sm font-medium"
                    />
                    <button 
                        onClick={handleSearch} 
                        className='bg-white/10 hover:bg-white/20 text-white px-6 transition-colors flex items-center justify-center border-l border-white/10'
                    >
                        <Search size={20} />
                    </button>
                </div>
                
                {(searchError && cityName) && (
                    <div className="absolute top-full left-0 w-full text-center mt-3 animate-fade-in">
                        <span className="text-red-400 text-sm bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
                            City not found. Please try again.
                        </span>
                    </div>
                )}
            </div>

            {/* --- 3. Main Content (Grid) --- */}
            <div className='w-full max-w-[1260px] flex-1 mb-20'>
                
                {/* A. Search Result */}
                {isSearching ? (
                    <div className="flex flex-col items-center mb-16 animate-pulse">
                        <p className="mb-4 text-sm opacity-50">Searching...</p>
                        <SkeletonCard />
                    </div>
                ) : (
                    searchData && cityName && !searchError && (
                        <div className="flex flex-col items-center mb-16 animate-fade-in-up">
                            <div className="flex items-center gap-4 w-full max-w-[280px] mb-4">
                                <span className="h-px bg-white/20 flex-1"></span>
                                <span className="text-xs font-bold uppercase tracking-widest opacity-50">Search Result</span>
                                <span className="h-px bg-white/20 flex-1"></span>
                            </div>
                            <div className="w-full max-w-[280px]">
                                <CityCard
                                    city={searchData}
                                    onClick={() => handleCityClick(searchData)}
                                    bgClass="bg-gradient-to-br from-indigo-500/80 to-purple-600/80 border-indigo-200/50 shadow-indigo-500/20 shadow-2xl"
                                />
                            </div>
                        </div>
                    )
                )}

                {/* B. Popular Cities Header */}
                {!searchData && (
                    <div className="flex items-center gap-4 mb-8 opacity-40 animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <span className="text-xs font-bold uppercase tracking-widest">Popular Cities</span>
                        <div className="h-px bg-white flex-1"></div>
                    </div>
                )}

                {/* C. Cities List */}
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

            {/* --- 4. Render Footer Component --- */}
            <Footer />

        </div>
    );
}

export default Home;