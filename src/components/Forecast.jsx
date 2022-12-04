/* eslint-disable react-hooks/exhaustive-deps */
import { format } from "date-fns";
import { useState } from "react";
import { useEffect } from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";

const Forecast = (props) => {
  const params = useParams();
  const [piecesOfData, setPiecesOfData] = useState([]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    getForecast();
  }, []);

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  const getForecast = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=a1ed6c4b6744137e44cc7f17f7c44a39`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        let piecesOfData = sliceIntoChunks(data.list, 5);
        console.log(piecesOfData);
        setPiecesOfData(piecesOfData);
        console.log("step 3");
      } else {
        alert("error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="my-4 mx-2">
      {piecesOfData.map((piece, i) => (
        <Carousel.Item key={i}>
          <Row>
            {piece.map((info) => (
              <Col>
                <Card key={info.dt_txt} className="cardbehind mb-5">
                  <Card.Title className="cardhead">
                    {format(new Date(info.dt_txt), "MMM eeee do h:00 aaa")}
                  </Card.Title>
                  <div>
                    <Card.Img
                      className="img-fluid"
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`}
                      style={{ width: "100px", aspectRatio: "1.1" }}
                    />
                  </div>
                  <Card.Body className="p-1">
                    <div className="card-text">
                      {props.celsius === true && (
                        <>
                          <p className="m-0">
                            High: {Math.round(info.main.temp_max - 273.15)}{" "}
                            <RiCelsiusFill />
                          </p>
                          <p className="m-0">
                            Low: {Math.round(info.main.temp_min - 273.15)}{" "}
                            <RiCelsiusFill />
                          </p>
                        </>
                      )}
                      {props.celsius === false && (
                        <>
                          <p className="m-0">
                            High:{" "}
                            {Math.round(
                              ((info.main.temp_max - 273.15) * 9) / 5 + 32
                            )}{" "}
                            <RiFahrenheitFill />
                          </p>
                          <p className="m-0">
                            Low:{" "}
                            {Math.round(
                              ((info.main.temp_min - 273.15) * 9) / 5 + 32
                            )}{" "}
                            <RiFahrenheitFill />
                          </p>
                        </>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Forecast;
