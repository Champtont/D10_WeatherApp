import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TiPlus } from "react-icons/ti";

const SingleCity = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <Row
      className="mx-0 mt-3 p-3"
      style={{ border: "1px solid #00000033", borderRadius: 4 }}
    >
      <Col xs={4}>
        <Button
          className="mr-3"
          onClick={() => {
            dispatch({ type: "ADD_TO_SAVED", payload: data });
          }}
        >
          <TiPlus />
        </Button>
        <Link to={`/city/${data.lat}`}>{data.name}</Link>
      </Col>
      <Col xs={4}>
        <p>{data.state}</p>
      </Col>
      <Col xs={4}>
        <p>{data.country}</p>
      </Col>
    </Row>
  );
};

export default SingleCity;
