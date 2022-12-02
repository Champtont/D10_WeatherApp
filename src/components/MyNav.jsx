import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const MyNav = () => {
  const location = useLocation();

  return (
    <Nav defaultActiveKey="/" className="flex-column myNav">
      <Link
        to="/"
        className={location.pathname === "/" ? "nav-link active" : "nav-link"}
      >
        WeatherNow
      </Link>
      <Link
        to="/savedCities"
        className={
          location.pathname === "/savedCities" ? "nav-link active" : "nav-link"
        }
      >
        My Cities
      </Link>
    </Nav>
  );
};

export default MyNav;
