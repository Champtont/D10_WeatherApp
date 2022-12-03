import { Button, ListGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TfiTrash } from "react-icons/tfi";
import { GiShrug } from "react-icons/gi";
import MyFooter from "./MyFooter";

const SavedCities = () => {
  const cities = useSelector((state) => state.saved.cities);
  const dispatch = useDispatch();

  return (
    <>
      <div className="cityPage">
        <h1 className="display-1">My Cities</h1>
        <Container className="d-flex flex-column justify-content-center">
          {cities.length === 0 && (
            <h2>
              No saved Cities Yet <GiShrug />{" "}
            </h2>
          )}
          <ListGroup>
            {cities.map((city) => {
              return (
                <ListGroup.Item
                  key={city.lat}
                  className="d-flex justify-content-between listedCity mb-2"
                >
                  <p>
                    <Link to={`/city/${city.lat}/${city.lon}/${city.name}`}>
                      {city.name}
                    </Link>
                  </p>
                  <p>{city.state}</p>
                  <p>{city.country}</p>
                  <Button
                    className="delete-btn"
                    variant="danger"
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_FAV",
                        payload: city.lat,
                      });
                    }}
                  >
                    <TfiTrash />
                    <div className="delete-btn-overlay"></div>
                  </Button>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Container>
        <MyFooter />
      </div>
    </>
  );
};

export default SavedCities;
