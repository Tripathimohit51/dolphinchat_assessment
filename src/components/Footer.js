import React from 'react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';


const Footer = () => {
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: "2a3a85f5dbe518de9d59e95436c1c318",
        lat: '48.137154',
        lon: '11.576124',
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
      });
    return(
    <>
     <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Munich"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
    </>
    );
}
export default Footer;