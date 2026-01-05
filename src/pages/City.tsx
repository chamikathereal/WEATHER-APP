import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { fetchWeatherById, fetchForecastByCoords, WeatherData } from '../extra/Api';
import { Thermometer, Wind, Droplets, Waves, Eye, Navigation } from 'lucide-react';

// Components
import CityHeader from '../components/CityHeader';
import MainWeatherCard from '../components/MainWeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import StatsDisplay from '../components/StatsDisplay';
import ExtendedForecast from '../components/ExtendedForecast';
import Footer from '../components/Footer';
import CitySkeleton from '../components/CitySkeleton';

// Utils
import { getWeatherGradient } from '../extra/weatherUtils';

const City: React.FC = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    
    // State
    const [selectedForecast, setSelectedForecast] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    // Data Fetching
    const stateCity = location.state?.city as WeatherData;
    const cityId = searchParams.get('id');

    // Fetch City Data (Optimized)
    const { data: fetchedCity, isLoading: isCityLoading } = useQuery({
        queryKey: ['weather', cityId],
        queryFn: () => fetchWeatherById(Number(cityId)),
        enabled: !stateCity && !!cityId,
        staleTime: 1000 * 60 * 5,
    });

    const city = stateCity || fetchedCity;

    // Fetch Forecast Data (With 5 Second Delay)
    const { data: forecast, isLoading: isForecastLoading } = useQuery({
        queryKey: ['forecast', city?.coord.lat, city?.coord.lon],
        // UPDATED: This function waits for BOTH the API and the 5-second timer
        queryFn: async () => {
            const [data] = await Promise.all([
                fetchForecastByCoords(city!.coord.lat, city!.coord.lon),
                new Promise(resolve => setTimeout(resolve, 2000)) // Wait 5000ms (5 seconds)
            ]);
            return data;
        },
        enabled: !!city,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (forecast && !selectedDate) {
            const today = forecast.list[0].dt_txt.split(' ')[0];
            setSelectedDate(today);
        }
    }, [forecast, selectedDate]);

    // --- MEMOIZED LOGIC ---

    const gradientClass = useMemo(() => {
        if (!city) return '';
        return `bg-gradient-to-br ${getWeatherGradient(city.weather[0].main)}`;
    }, [city]);

    const dailyForecast = useMemo(() => {
        return forecast?.list.reduce((acc: any[], item) => {
            const date = item.dt_txt.split(' ')[0];
            if (!acc.find(i => i.dt_txt.split(' ')[0] === date)) {
                acc.push(item);
            }
            return acc;
        }, []) || [];
    }, [forecast]);

    const activeDate = useMemo(() => 
        selectedDate || dailyForecast[0]?.dt_txt.split(' ')[0], 
    [selectedDate, dailyForecast]);

    const isToday = useMemo(() => 
        dailyForecast.length > 0 && activeDate === dailyForecast[0].dt_txt.split(' ')[0], 
    [dailyForecast, activeDate]);

    const hourlyForecast = useMemo(() => {
        if (!forecast) return [];
        return isToday
            ? forecast.list.slice(0, 8) 
            : forecast.list.filter(item => item.dt_txt.startsWith(activeDate));
    }, [forecast, isToday, activeDate]);

    const displayData = useMemo(() => {
        if (selectedForecast) {
            return {
                temp: selectedForecast.main.temp,
                description: selectedForecast.weather[0].description,
                icon: selectedForecast.weather[0].icon,
                feels_like: selectedForecast.main.feels_like,
                humidity: selectedForecast.main.humidity,
                wind_speed: selectedForecast.wind.speed,
                pressure: selectedForecast.main.pressure,
                visibility: selectedForecast.visibility,
                sea_level: selectedForecast.main.sea_level || selectedForecast.main.pressure
            };
        }
        if (city) {
            return {
                temp: city.main.temp,
                description: city.weather[0].description,
                icon: city.weather[0].icon,
                feels_like: city.main.feels_like,
                humidity: city.main.humidity,
                wind_speed: city.wind.speed,
                pressure: city.main.pressure,
                visibility: city.visibility,
                sea_level: city.main.sea_level || city.main.pressure
            };
        }
        return null;
    }, [selectedForecast, city]);

    const stats = useMemo(() => {
        if (!displayData) return [];
        return [
            { icon: <Thermometer size={16}/>, label: "Feels Like", value: `${Math.round(displayData.feels_like)}°C`, color: "text-orange-400" },
            { icon: <Droplets size={16}/>, label: "Humidity", value: `${displayData.humidity}%`, color: "text-blue-400" },
            { icon: <Wind size={16}/>, label: "Wind Speed", value: `${displayData.wind_speed} m/s`, color: "text-slate-300" },
            { icon: <Waves size={16}/>, label: "Pressure", value: `${displayData.pressure} hPa`, color: "text-cyan-400" },
            { icon: <Eye size={16}/>, label: "Visibility", value: `${(displayData.visibility / 1000).toFixed(1)} km`, color: "text-purple-400" },
            { icon: <Navigation size={16}/>, label: "Sea Level", value: `${displayData.sea_level} hPa`, color: "text-emerald-400" }
        ];
    }, [displayData]);

    const handleReset = useCallback(() => setSelectedForecast(null), []);
    const handleHourSelect = useCallback((hour: any) => setSelectedForecast(hour), []);
    const handleDaySelect = useCallback((day: any, index: number) => {
        setSelectedDate(day.dt_txt.split(' ')[0]);
        if (index === 0) {
            setSelectedForecast(null);
        } else {
            setSelectedForecast(day);
        }
    }, []);

    // --- Loading State Check ---
    // This will now stay TRUE for at least 5 seconds because of the delay in queryFn
    if (isCityLoading || isForecastLoading || !city || !displayData) {
        return <CitySkeleton />;
    }

    return (
        <div className="flex flex-col items-center w-full min-h-screen p-4 pt-10 pb-6 text-white sm:px-10 font-poppins bg-black/20">
            
            <Helmet>
                <title>Weather in {city.name}, {city.sys.country}</title>
                <meta name="description" content={`Current weather in ${city.name}: ${Math.round(city.main.temp)}°C, ${city.weather[0].description}.`} />
            </Helmet>

            <div className="w-full max-w-[1000px] flex flex-col gap-6 flex-1 mb-10">
                
                <CityHeader 
                    cityName={city.name} 
                    country={city.sys.country} 
                    selectedForecast={selectedForecast}
                    activeDate={activeDate}
                    isToday={isToday}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 animate-fade-in-up">
                    <MainWeatherCard 
                        displayData={displayData} 
                        isToday={isToday} 
                        onReset={handleReset}
                        gradientClass={gradientClass}
                    />
                    
                    <HourlyForecast 
                        data={hourlyForecast}
                        selectedForecast={selectedForecast}
                        onHourSelect={handleHourSelect}
                        activeDate={activeDate}
                        isToday={isToday}
                    />
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <StatsDisplay stats={stats} />
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <ExtendedForecast 
                        dailyForecast={dailyForecast} 
                        activeDate={activeDate} 
                        onDaySelect={handleDaySelect} 
                    />
                </div>
            </div>

            <div className="w-full max-w-[1000px] mb-5">
                <Footer />
            </div>
        </div>
    );
}

export default City;