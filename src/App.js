import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainPage from "./components/MainPage";
import MyNav from "./components/MyNav";
import CityPage from "./components/CityPage";
import { Col, Row } from "react-bootstrap";
import SavedCities from "./components/SavedCities";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Row>
          <Col xs={2} className="pr-0" stye={{ height: "100%" }}>
            <MyNav />
          </Col>
          <Col xs={10} className="pl-0">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/city/:lat/:lon/:cityname" element={<CityPage />} />
              <Route path="/savedCities" element={<SavedCities />} />
            </Routes>
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;
