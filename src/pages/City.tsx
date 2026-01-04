import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { weatherData, fetchWeatherById, fetchForecastByCoords } from '../extra/Api';
import { Thermometer, Wind, Droplets, Waves, ArrowLeft, Calendar, Clock, Eye, Navigation } from 'lucide-react';

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import StatCard from '../components/StatCard';

const City: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const stateCity = location.state?.city as weatherData;
    const cityId = searchParams.get('id');

    const { data: fetchedCity } = useQuery({
        queryKey: ['weather', cityId],
        queryFn: () => fetchWeatherById(Number(cityId)),
        enabled: !stateCity && !!cityId,
    });

    const city = stateCity || fetchedCity;

    const { data: forecast, isLoading: forecastLoading } = useQuery({
        queryKey: ['forecast', city?.coord.lat, city?.coord.lon],
        queryFn: () => fetchForecastByCoords(city!.coord.lat, city!.coord.lon),
        enabled: !!city,
    });

    if (!city) return <div className="text-white text-center mt-20">Loading...</div>;

    const hourlyForecast = forecast?.list.slice(0, 12) || [];

    const dailyForecast = forecast?.list.reduce((acc: any[], item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!acc.find(i => i.dt_txt.split(' ')[0] === date)) {
            acc.push(item);
        }
        return acc;
    }, []) || [];

    const stats = [
        { icon: <Thermometer size={16}/>, label: "Feels Like", value: `${Math.round(city.main.feels_like)}°C`, color: "text-orange-400" },
        { icon: <Droplets size={16}/>, label: "Humidity", value: `${city.main.humidity}%`, color: "text-blue-400" },
        { icon: <Wind size={16}/>, label: "Wind Speed", value: `${city.wind.speed} m/s`, color: "text-slate-300" },
        { icon: <Waves size={16}/>, label: "Pressure", value: `${city.main.pressure} hPa`, color: "text-cyan-400" },
        { icon: <Eye size={16}/>, label: "Visibility", value: `${city.visibility / 1000} km`, color: "text-purple-400" },
        { icon: <Navigation size={16}/>, label: "Sea Level", value: `${city.main.sea_level || city.main.pressure} hPa`, color: "text-emerald-400" }
    ];

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:px-10 text-white font-poppins bg-black/20">
            
            <div className="w-full max-w-[1000px] flex flex-col gap-4">
                
                <div className="w-full flex items-center mb-2">
                    <button onClick={() => navigate('/')} className="p-2 bg-white/10 rounded-full mr-4 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                        <ArrowLeft size={18} />
                    </button>
                    <h1 className="text-xl font-bold">{city.name}, {city.sys.country}</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 bg-white/10 backdrop-blur-xl rounded-[24px] p-6 border border-white/20 shadow-2xl flex flex-col items-center justify-center">
                        <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`} alt="weather" className="w-24 h-24" />
                        <span className="text-5xl font-bold leading-none">{Math.round(city.main.temp)}°C</span>
                        <p className="capitalize opacity-70 mt-2 text-sm font-medium">{city.weather[0].description}</p>
                    </div>

                    <div className="md:col-span-2 bg-white/5 backdrop-blur-md rounded-[24px] p-5 border border-white/10 flex flex-col min-w-0 justify-center">
                        <div className="flex items-center gap-2 mb-3 opacity-60 px-2">
                            <Clock size={14} />
                            <h2 className="text-xs font-bold uppercase tracking-wider">Hourly Forecast</h2>
                        </div>
                        
                        <Swiper
                            modules={[FreeMode, Pagination]} /* Added Pagination module */
                            freeMode={true}
                            pagination={{ clickable: true }} /* Enabled Pagination */
                            spaceBetween={10}
                            slidesPerView={4}
                            breakpoints={{
                                320: { slidesPerView: 3 },
                                640: { slidesPerView: 5 },
                                1024: { slidesPerView: 6 }
                            }}
                            className="w-full pb-8" /* Added padding for dots */
                        >
                            {hourlyForecast.map((hour, idx) => (
                                <SwiperSlide key={idx} className="flex flex-col items-center justify-center">
                                    <div className="flex flex-col items-center bg-white/5 p-3 rounded-xl border border-white/5 w-full">
                                        <span className="text-[10px] opacity-60 font-medium whitespace-nowrap">
                                            {new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="icon" className="w-10 h-10" />
                                        <span className="text-md font-bold">{Math.round(hour.main.temp)}°C</span>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                <div className="w-full min-w-0">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={12}
                        slidesPerView={2}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 }
                        }}
                        className="pb-10"
                    >
                        {stats.map((stat, index) => (
                            <SwiperSlide key={index} className="flex justify-center h-full">
                                <StatCard {...stat} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-[24px] p-6 border border-white/20 shadow-2xl min-w-0">
                    <div className="flex items-center gap-2 mb-4 opacity-60">
                        <Calendar size={16} />
                        <h2 className="font-bold uppercase text-xs tracking-wider">Extended Forecast</h2>
                    </div>
                    
                    <Swiper
                        modules={[FreeMode, Pagination]} /* Added Pagination module */
                        freeMode={true}
                        pagination={{ clickable: true }} /* Enabled Pagination */
                        spaceBetween={12}
                        slidesPerView={2}
                        breakpoints={{
                            480: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 }
                        }}
                        className="w-full pb-8" /* Added padding for dots */
                    >
                        {dailyForecast.map((day, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/5 text-center transition-all hover:bg-white/10 h-full">
                                    <span className="text-xs font-bold opacity-80 mb-2 uppercase tracking-tighter">
                                        {index === 0 ? "Today" : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                                    </span>
                                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" className="w-12 h-12" />
                                    <span className="text-xl font-bold">{Math.round(day.main.temp)}°C</span>
                                    <span className="text-[10px] opacity-50 capitalize mt-1 line-clamp-1">
                                        {day.weather[0].description}
                                    </span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default City;