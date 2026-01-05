// src/extra/Api.ts

const apiKey = process.env.REACT_APP_WEATHER_API_KEY || '';

// Renamed to PascalCase for standard React/TS convention
export interface WeatherData {
    name: string;
    id: number;
    visibility: number;
    main: {
        feels_like: number;
        humidity: number;
        temp: number;
        sea_level: number;
        pressure: number;
    };
    coord: {
        lat: number;
        lon: number;
    };
    sys: {
        country: string;
    };
    wind: {
        speed: number;
    };
    weather: [{
        id: number;
        main: string;
        description: string;
        icon: string;
    }];
}

export interface ForecastData {
    list: Array<{
        dt: number;
        main: {
            temp: number;
        };
        weather: Array<{
            description: string;
            icon: string;
        }>;
        dt_txt: string;
    }>;
}

export const fetchWeatherById = async (id: number): Promise<WeatherData> => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
        throw new Error(`City ${id} failed`);
    }
    return response.json();
};

export const fetchWeatherByName = async (name: string): Promise<WeatherData> => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error(`City "${name}" not found`);
    return response.json();
};

export const fetchForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("Forecast failed");
    return response.json();
};