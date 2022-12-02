import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const CityPage = () => {
  const [weather, setWeather] = useState([]);
  const [main, setMain] = useState(null);
  const params = useParams();

  useEffect(() => {
    getCity();
    console.log("step:1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCity = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${params.cityname}&appid=a1ed6c4b6744137e44cc7f17f7c44a39`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setWeather(data.weather);
        let main = data.main;
        console.log(main);
        setMain(main);
        console.log("step 2");
      } else {
        alert("error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container>
        <h1 className="text-center">Location: {params.cityname}</h1>
        <div>
          <Row>
            <Col xs={6}>
              {weather.map((weather) => (
                <h3 key={weather.id}>Currently: {weather.description}</h3>
              ))}
            </Col>
            <Col xs={6}>
              {main !== null && <h4>{Math.round(main.temp - 273.15)}°C</h4>}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default CityPage;