import { useLocation } from "react-router";

const City: React.FC = () => {

    const location = useLocation();
    //const {cityData} = location.state as {cityData: any};
    const {city} = location.state;


    return (
        <ul>
            <li>Name - {city.name}</li>
            <li>Feels Like - {city.main.feels_like}</li>
            <li>Humidity - {city.main.humidity}</li>
            <li>Country - {city.sys.country}</li>
            <li>Icon - {city.weather[0].icon}</li>
            <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="weather icon" />
        </ul>
    );
}

export default City;