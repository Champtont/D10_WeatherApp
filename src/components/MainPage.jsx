import { Col } from "react-bootstrap";
import { useState } from "react";
import { Form } from "react-bootstrap";
import SingleCity from "./SingleCity";
import MyFooter from "./MyFooter";
import { FaRegSmileBeam } from "react-icons/fa";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [cities, setcities] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=a1ed6c4b6744137e44cc7f17f7c44a39`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setcities(data);
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
        <h1 className="text-center">Search for Your City</h1>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="type and press Enter"
            />
          </Form>
        </Col>
        {query === "" && (
          <p className="main-directions display-4 mt-5">
            You can save cities for quick access later! <FaRegSmileBeam />{" "}
          </p>
        )}
        {query !== "" && (
          <Col xs={10} className="mx-auto mb-5">
            {cities.map((cityData) => (
              <SingleCity key={cityData.lat} data={cityData} />
            ))}
          </Col>
        )}
        <MyFooter />
      </div>
    </>
  );
};

export default MainPage;
