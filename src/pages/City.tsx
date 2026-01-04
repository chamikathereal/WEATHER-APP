import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { weatherData, fetchWeatherById, fetchForecastByCoords } from '../extra/Api';
import { Thermometer, Wind, Droplets, Waves, Eye, Navigation } from 'lucide-react';

// Import New Components
import CityHeader from '../components/CityHeader';
import MainWeatherCard from '../components/MainWeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import StatsDisplay from '../components/StatsDisplay';
import ExtendedForecast from '../components/ExtendedForecast';
// UPDATED: Import the Footer
import Footer from '../components/Footer';

// Import the helper function
import { getWeatherGradient } from '../extra/weatherUtils';

const City: React.FC = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    
    // State
    const [selectedForecast, setSelectedForecast] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    // Data Fetching
    const stateCity = location.state?.city as weatherData;
    const cityId = searchParams.get('id');

    const { data: fetchedCity } = useQuery({
        queryKey: ['weather', cityId],
        queryFn: () => fetchWeatherById(Number(cityId)),
        enabled: !stateCity && !!cityId,
    });

    const city = stateCity || fetchedCity;

    const { data: forecast } = useQuery({
        queryKey: ['forecast', city?.coord.lat, city?.coord.lon],
        queryFn: () => fetchForecastByCoords(city!.coord.lat, city!.coord.lon),
        enabled: !!city,
    });

    useEffect(() => {
        if (forecast) {
            const today = forecast.list[0].dt_txt.split(' ')[0];
            setSelectedDate(today);
        }
    }, [forecast]);

    if (!city) return <div className="text-white text-center mt-20">Loading...</div>;

    // --- UPDATED: Use the shared utility function ---
    const gradientClass = `bg-gradient-to-br ${getWeatherGradient(city.weather[0].main)}`;

    // --- DATA FILTERING LOGIC ---

    // 1. Generate Daily List
    const dailyForecast = forecast?.list.reduce((acc: any[], item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!acc.find(i => i.dt_txt.split(' ')[0] === date)) {
            acc.push(item);
        }
        return acc;
    }, []) || [];

    // 2. Active Date & Today Check
    const activeDate = selectedDate || dailyForecast[0]?.dt_txt.split(' ')[0];
    const isToday = dailyForecast.length > 0 && activeDate === dailyForecast[0].dt_txt.split(' ')[0];

    // 3. Filter Hourly Data
    const hourlyForecast = isToday
        ? forecast?.list.slice(0, 8) || [] 
        : forecast?.list.filter(item => item.dt_txt.startsWith(activeDate)) || [];

    // 4. Prepare Display Data
    const displayData = selectedForecast ? {
        temp: selectedForecast.main.temp,
        description: selectedForecast.weather[0].description,
        icon: selectedForecast.weather[0].icon,
        feels_like: selectedForecast.main.feels_like,
        humidity: selectedForecast.main.humidity,
        wind_speed: selectedForecast.wind.speed,
        pressure: selectedForecast.main.pressure,
        visibility: selectedForecast.visibility,
        sea_level: selectedForecast.main.sea_level || selectedForecast.main.pressure
    } : {
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

    // 5. Prepare Stats Data
    const stats = [
        { icon: <Thermometer size={16}/>, label: "Feels Like", value: `${Math.round(displayData.feels_like)}°C`, color: "text-orange-400" },
        { icon: <Droplets size={16}/>, label: "Humidity", value: `${displayData.humidity}%`, color: "text-blue-400" },
        { icon: <Wind size={16}/>, label: "Wind Speed", value: `${displayData.wind_speed} m/s`, color: "text-slate-300" },
        { icon: <Waves size={16}/>, label: "Pressure", value: `${displayData.pressure} hPa`, color: "text-cyan-400" },
        { icon: <Eye size={16}/>, label: "Visibility", value: `${displayData.visibility / 1000} km`, color: "text-purple-400" },
        { icon: <Navigation size={16}/>, label: "Sea Level", value: `${displayData.sea_level} hPa`, color: "text-emerald-400" }
    ];

    // --- RENDER ---
    return (
        // UPDATED: Removed 'justify-center', added 'pt-10 pb-6' for better flow
        <div className="w-full min-h-screen flex flex-col items-center p-4 sm:px-10 text-white font-poppins bg-black/20 pt-10 pb-6">
            
            {/* UPDATED: Added flex-1 so this pushes footer to bottom */}
            <div className="w-full max-w-[1000px] flex flex-col gap-6 flex-1 mb-10">
                
                <CityHeader 
                    cityName={city.name} 
                    country={city.sys.country} 
                    selectedForecast={selectedForecast}
                    activeDate={activeDate}
                    isToday={isToday}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
                    <MainWeatherCard 
                        displayData={displayData} 
                        isToday={isToday} 
                        onReset={() => setSelectedForecast(null)}
                        gradientClass={gradientClass}
                    />
                    
                    <HourlyForecast 
                        data={hourlyForecast}
                        selectedForecast={selectedForecast}
                        onHourSelect={setSelectedForecast}
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
                        onDaySelect={(day, index) => {
                            setSelectedDate(day.dt_txt.split(' ')[0]);
                            if (index === 0) {
                                setSelectedForecast(null);
                            } else {
                                setSelectedForecast(day);
                            }
                        }} 
                    />
                </div>
                <div className='mt-10'>
                    <Footer />
                </div>
            </div>

            {/* --- 4. Render Footer Component --- */}
            {/* <Footer /> */}
        </div>
    );
}

export default City;