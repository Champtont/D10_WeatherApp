import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TiPlus } from "react-icons/ti";

const SingleCity = ({ data }) => {
  const dispatch = useDispatch();

  const cities = useSelector((state) => state.saved.cities);

  return (
    <Row
      className="mx-0 mt-3 p-3 listedCity"
      style={{ border: "1px solid #00000033", borderRadius: 4 }}
    >
      <Col xs={3}>
        <Button
          className="mr-3 add-button"
          onClick={() => {
            if (cities.includes(data)) {
              alert("This city is already added");
            } else {
              dispatch({ type: "ADD_TO_SAVED", payload: data });
            }
          }}
        >
          <TiPlus />
          <div className="add-button-overlay"></div>
        </Button>
      </Col>
      <Col xs={3}>
        <Link to={`/city/${data.lat}/${data.lon}/${data.name}`}>
          {data.name}
        </Link>
      </Col>
      <Col xs={3}>
        <p>{data.state}</p>
      </Col>
      <Col xs={3}>
        <p>{data.country}</p>
      </Col>
    </Row>
  );
};

export default SingleCity;
