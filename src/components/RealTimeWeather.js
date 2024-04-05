import axios from "axios"
import { useEffect, useState } from "react"

export const RealTimeWeather = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if(!weatherData){
            (async () => {
                const {item} = await (await axios.get('http://localhost:3500/api/getWthrSituation')).data;
                const [data] = item;
                setWeatherData(data);
                localStorage.setItem('weather', JSON.stringify(data));
            })();
        }
    }, [weatherData]);


    return (
        <div>
        </div>
    )
}
