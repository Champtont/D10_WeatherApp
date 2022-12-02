import { useParams } from "react-router-dom";

const CityPage = () => {
  const getCity = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        alert("error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return <></>;
};

export default CityPage;
