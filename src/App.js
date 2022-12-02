import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainPage from "./components/MainPage";
import MyFooter from "./components/MyFooter";
import MyNav from "./components/MyNav";
import CityPage from "./components/CityPage";
import { Col, Row } from "react-bootstrap";

function App() {
  return (
    <Row>
      <BrowserRouter>
        <Col xs={2}>
          <MyNav />
        </Col>
        <Col xs={10}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/city/:lat" element={<CityPage />} />
          </Routes>
          <MyFooter />
        </Col>
      </BrowserRouter>
    </Row>
  );
}

export default App;
