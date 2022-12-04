import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";
import MyFooter from "./MyFooter";
import Forecast from "./Forecast";

/*To convert millibars (mb) to inches of mercury (in Hg), divide the millibar reading by 33.86:
in Hg = mb / 33.86*/

const CityPage = () => {
  const [weather, setWeather] = useState([]);
  const [main, setMain] = useState(null);
  const [celsius, setCelsius] = useState(true);
  const params = useParams();

  useEffect(() => {
    getCity();
    console.log("step:1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCity = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=a1ed6c4b6744137e44cc7f17f7c44a39`
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
      <div className="cityPage">
        <h1 className="text-center display-2">Location: {params.cityname}</h1>
        <div>
          <Row>
            <Col xs={{ span: 8, offset: 2 }}>
              {weather.map((weather) => (
                <Card className="cardbehind" key={weather.id}>
                  <Card.Header className="cardhead d-flex justify-content-between">
                    <h3>Currently: {weather.description}</h3>
                    {celsius === true && (
                      <Button
                        className="add-button"
                        onClick={() => {
                          setCelsius(false);
                        }}
                      >
                        <RiFahrenheitFill />
                      </Button>
                    )}
                    {celsius === false && (
                      <Button
                        className="add-button"
                        onClick={() => {
                          setCelsius(true);
                        }}
                      >
                        <RiCelsiusFill />
                      </Button>
                    )}
                  </Card.Header>
                  <Card.Body>
                    {main !== null && (
                      <div>
                        <Row className="justify-content-center align-items-center">
                          <Col>
                            {celsius === true && (
                              <h4>
                                Temp: {Math.round(main.temp - 273.15)}{" "}
                                <RiCelsiusFill />
                              </h4>
                            )}
                            {celsius === false && (
                              <h4>
                                Temp:{" "}
                                {Math.round(
                                  ((main.temp - 273.15) * 9) / 5 + 32
                                )}{" "}
                                <RiFahrenheitFill />
                              </h4>
                            )}
                          </Col>
                          <Col>
                            <img
                              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                              alt="weather icon"
                            />
                          </Col>
                          <Col>
                            <h5>Humidity: {main.humidity}%</h5>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {celsius === true && (
                              <p>
                                Feels Like:{" "}
                                {Math.round(main.feels_like - 273.15)}{" "}
                                <RiCelsiusFill />
                              </p>
                            )}
                            {celsius === false && (
                              <p>
                                Feels Like:{" "}
                                {Math.round(
                                  ((main.feels_like - 273.15) * 9) / 5 + 32
                                )}{" "}
                                <RiFahrenheitFill />
                              </p>
                            )}
                          </Col>
                          <Col>
                            {celsius === true && (
                              <p>
                                High: {Math.round(main.temp_max - 273.15)}{" "}
                                <RiCelsiusFill />
                              </p>
                            )}
                            {celsius === false && (
                              <p>
                                High:{" "}
                                {Math.round(
                                  ((main.temp_max - 273.15) * 9) / 5 + 32
                                )}{" "}
                                <RiFahrenheitFill />
                              </p>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            Pressure: {(main.pressure / 33.86).toFixed(1)} Hg
                          </Col>
                          <Col>
                            {celsius === true && (
                              <p>
                                Low: {Math.round(main.temp_min - 273.15)}{" "}
                                <RiCelsiusFill />
                              </p>
                            )}
                            {celsius === false && (
                              <p>
                                Low:{" "}
                                {Math.round(
                                  ((main.temp_min - 273.15) * 9) / 5 + 32
                                )}{" "}
                                <RiFahrenheitFill />
                              </p>
                            )}
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
          <Forecast celsius={celsius} />
        </div>
        <MyFooter />
      </div>
    </>
  );
};

export default CityPage;
