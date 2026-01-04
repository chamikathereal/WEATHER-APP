import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import { Calendar } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

interface ExtendedForecastProps {
    dailyForecast: any[];
    activeDate: string;
    onDaySelect: (day: any, index: number) => void;
}

const ExtendedForecast: React.FC<ExtendedForecastProps> = ({ dailyForecast, activeDate, onDaySelect }) => {
    return (
        // Updated container style for premium glass effect
        <div className="bg-black/20 backdrop-blur-2xl rounded-[32px] p-6 border border-white/10 shadow-xl min-w-0">
            <div className="flex items-center gap-2 mb-4 opacity-50">
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
                    
                    const dayLabel = index === 0 
                        ? "Today" 
                        : new Date(day.dt_txt.replace(' ', 'T')).toLocaleDateString('en-US', { weekday: 'short' });

                    return (
                        <SwiperSlide key={index} className="py-2">
                            <div 
                                onClick={() => onDaySelect(day, index)}
                                className={`
                                    flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer h-full
                                    ${isDaySelected 
                                        ? "bg-white/20 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-105" 
                                        : "bg-white/5 border-white/5 hover:bg-white/10"
                                    }
                                `}
                            >
                                <span className="text-xs font-bold opacity-70 mb-2 uppercase tracking-wide">
                                    {dayLabel}
                                </span>
                                <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" className="w-12 h-12 mb-1" />
                                <span className="text-2xl font-bold tracking-tight">{Math.round(day.main.temp)}°</span>
                                <span className="text-[10px] opacity-50 capitalize mt-1 line-clamp-1">
                                    {day.weather[0].description}
                                </span>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default ExtendedForecast;