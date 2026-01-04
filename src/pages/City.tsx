import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { weatherData, fetchWeatherById, fetchForecastByCoords } from '../extra/Api';
import { Thermometer, Wind, Droplets, Waves, ArrowLeft, Calendar, Clock, Eye, Navigation } from 'lucide-react';

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import StatCard from '../components/StatCard';

const City: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const [selectedForecast, setSelectedForecast] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

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

    // 1. Generate Daily List (Unique Days)
    const dailyForecast = forecast?.list.reduce((acc: any[], item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!acc.find(i => i.dt_txt.split(' ')[0] === date)) {
            acc.push(item);
        }
        return acc;
    }, []) || [];

    // 2. Determine which date to show
    const activeDate = selectedDate || dailyForecast[0]?.dt_txt.split(' ')[0];
    const isToday = dailyForecast.length > 0 && activeDate === dailyForecast[0].dt_txt.split(' ')[0];

    const hourlyForecast = isToday
        ? forecast?.list.slice(0, 8) || [] 
        : forecast?.list.filter(item => item.dt_txt.startsWith(activeDate)) || [];

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

    const stats = [
        { icon: <Thermometer size={16}/>, label: "Feels Like", value: `${Math.round(displayData.feels_like)}°C`, color: "text-orange-400" },
        { icon: <Droplets size={16}/>, label: "Humidity", value: `${displayData.humidity}%`, color: "text-blue-400" },
        { icon: <Wind size={16}/>, label: "Wind Speed", value: `${displayData.wind_speed} m/s`, color: "text-slate-300" },
        { icon: <Waves size={16}/>, label: "Pressure", value: `${displayData.pressure} hPa`, color: "text-cyan-400" },
        { icon: <Eye size={16}/>, label: "Visibility", value: `${displayData.visibility / 1000} km`, color: "text-purple-400" },
        { icon: <Navigation size={16}/>, label: "Sea Level", value: `${displayData.sea_level} hPa`, color: "text-emerald-400" }
    ];

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:px-10 text-white font-poppins bg-black/20">
            <div className="w-full max-w-[1000px] flex flex-col gap-4">
                
                {/* Navigation Header */}
                <div className="w-full flex items-center mb-2">
                    <button onClick={() => navigate('/')} className="p-2 bg-white/10 rounded-full mr-4 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                        <ArrowLeft size={18} />
                    </button>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold leading-tight">{city.name}, {city.sys.country}</h1>
                        {(selectedForecast || !isToday) && (
                            <span className="text-[10px] text-blue-300 font-bold uppercase animate-pulse">
                                Viewing: {selectedForecast 
                                    ? new Date(selectedForecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', weekday: 'short' }) 
                                    : new Date(activeDate).toLocaleDateString(undefined, { weekday: 'long' })
                                }
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Main Weather Display */}
                    <div 
                        onClick={() => {
                            if (isToday) setSelectedForecast(null);
                        }} 
                        className="md:col-span-1 bg-white/10 backdrop-blur-xl rounded-[24px] p-6 border border-white/20 shadow-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-white/20"
                    >
                        <img src={`https://openweathermap.org/img/wn/${displayData.icon}@4x.png`} alt="weather" className="w-24 h-24" />
                        <span className="text-5xl font-bold leading-none">{Math.round(displayData.temp)}°C</span>
                        <p className="capitalize opacity-70 mt-2 text-sm font-medium">{displayData.description}</p>
                    </div>

                    {/* Hourly Swiper */}
                    <div className="md:col-span-2 bg-white/5 backdrop-blur-md rounded-[24px] p-5 border border-white/10 flex flex-col min-w-0 justify-center">
                        <div className="flex items-center gap-2 mb-1 opacity-60 px-2">
                            <Clock size={14} />
                            <h2 className="text-xs font-bold uppercase tracking-wider">
                                {isToday ? "Hourly Forecast (Next 24h)" : `Hourly Forecast (${new Date(activeDate).toLocaleDateString(undefined, { weekday: 'short' })})`}
                            </h2>
                        </div>
                        
                        {hourlyForecast.length > 0 ? (
                            <Swiper
                                modules={[FreeMode, Pagination]}
                                freeMode={true}
                                pagination={{ clickable: true }}
                                spaceBetween={10}
                                slidesPerView={4}
                                className="w-full py-4 px-2 pb-8" 
                                breakpoints={{
                                    320: { slidesPerView: 3 },
                                    640: { slidesPerView: 5 },
                                    1024: { slidesPerView: 6 }
                                }}
                            >
                                {hourlyForecast.map((hour, idx) => {
                                    const isSelected = selectedForecast?.dt === hour.dt;
                                    return (
                                        <SwiperSlide key={idx} className="flex flex-col items-center justify-center h-auto">
                                            <div 
                                                onClick={() => setSelectedForecast(hour)}
                                                className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                                                    isSelected 
                                                    ? "bg-blue-500/20 border-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.3)] scale-105" 
                                                    : "bg-white/5 border-white/5 hover:bg-white/10"
                                                } w-full`}
                                            >
                                                <span className="text-[10px] opacity-60 font-medium whitespace-nowrap">
                                                    {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="icon" className="w-10 h-10" />
                                                <span className="text-md font-bold">{Math.round(hour.main.temp)}°C</span>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        ) : (
                            <div className="h-full flex items-center justify-center opacity-50 text-sm">
                                No hourly data available
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full min-w-0">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={12}
                        slidesPerView={2}
                        pagination={{ clickable: true }}
                        className="pb-10 px-2"
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 }
                        }}
                    >
                        {stats.map((stat, index) => (
                            <SwiperSlide key={index} className="flex justify-center h-full py-1">
                                <StatCard {...stat} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* 3. EXTENDED FORECAST SWIPER (Days) */}
                <div className="bg-white/10 backdrop-blur-xl rounded-[24px] p-6 border border-white/20 shadow-2xl min-w-0">
                    <div className="flex items-center gap-2 mb-4 opacity-60">
                        <Calendar size={16} />
                        <h2 className="font-bold uppercase text-xs tracking-wider">Extended Forecast</h2>
                    </div>
                    
                    <Swiper
                        modules={[FreeMode, Pagination]}
                        freeMode={true}
                        pagination={{ clickable: true }}
                        spaceBetween={12}
                        slidesPerView={2}
                        className="w-full pb-8 px-2"
                        breakpoints={{
                            480: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 }
                        }}
                    >
                        {dailyForecast.map((day, index) => {
                            const dateStr = day.dt_txt.split(' ')[0];
                            const isDaySelected = activeDate === dateStr;

                            // --- FIX: USE STRING PARSING TO AVOID TIMEZONE SHIFTS ---
                            // We replace space with T to make it ISO format, which Date parses more reliably 
                            // as a "Local" representation in this context, matching the grouping logic.
                            const dayLabel = index === 0 
                                ? "Today" 
                                : new Date(day.dt_txt.replace(' ', 'T')).toLocaleDateString('en-US', { weekday: 'short' });

                            return (
                                <SwiperSlide key={index} className="py-2">
                                    <div 
                                        onClick={() => {
                                            setSelectedDate(dateStr);
                                            if (index === 0) {
                                                setSelectedForecast(null);
                                            } else {
                                                setSelectedForecast(day);
                                            }
                                        }}
                                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer h-full ${
                                            isDaySelected 
                                            ? "bg-blue-500/20 border-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.3)] scale-105" 
                                            : "bg-white/5 border-white/5 hover:bg-white/10"
                                        }`}
                                    >
                                        <span className="text-xs font-bold opacity-80 mb-2 uppercase">
                                            {dayLabel}
                                        </span>
                                        <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" className="w-12 h-12" />
                                        <span className="text-xl font-bold">{Math.round(day.main.temp)}°C</span>
                                        <span className="text-[10px] opacity-50 capitalize mt-1 line-clamp-1">
                                            {day.weather[0].description}
                                        </span>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default City;