export interface weatherData {
    name: string;
    id: number;
    main: {
        feels_like: number;
        humidity: number;
        temp: number;
        sea_level: number;
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

export const apiKey = process.env.REACT_APP_WEATHER_API_KEY || '';
// export const cityIds = (process.env.REACT_APP_CITY_LIST || '').split(',').map(id => parseInt(id));

// Helper function for fetching
export const fetchWeatherById = async (id: number): Promise<weatherData> => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
        throw new Error(`City ${id} failed`);
    }
    return response.json();
};

// Add this to your api.ts
export const fetchWeatherByName = async (name: string): Promise<weatherData> => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error(`City "${name}" not found`);
    return response.json();
};