import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import MyFooter from "./MyFooter";

/*To convert millibars (mb) to inches of mercury (in Hg), divide the millibar reading by 33.86:
in Hg = mb / 33.86*/

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
      <div className="mainPage">
        <h1 className="text-center display-1">Location: {params.cityname}</h1>
        <div>
          <Row>
            <Col xs={{ span: 8, offset: 2 }}>
              {weather.map((weather) => (
                <Card className="cardbehind" key={weather.id}>
                  <Card.Header className="cardhead">
                    <h3>Currently: {weather.description}</h3>
                  </Card.Header>
                  <Card.Body>
                    {main !== null && (
                      <div>
                        <Row className="justify-content-center align-items-center">
                          <Col>
                            <h4>Temp: {Math.round(main.temp - 273.15)} °C</h4>
                          </Col>
                          <Col>
                            <img
                              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                              alt="weather icon"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p>
                              Feels Like: {Math.round(main.feels_like - 273.15)}
                              °C
                            </p>
                          </Col>
                          <Col>
                            <p>High: {Math.round(main.temp_max - 273.15)} °C</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col></Col>
                          <Col>
                            <p>Low: {Math.round(main.temp_min - 273.15)} °C</p>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </Col>
            <Col xs={6}></Col>
          </Row>
        </div>
        <MyFooter />
      </div>
    </>
  );
};

export default CityPage;
