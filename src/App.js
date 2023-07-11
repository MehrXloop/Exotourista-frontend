import "./App.css";
import HotelDetail from "./pages/HotelDetail";
import HotelList from "./pages/HotelList";
import Confirmation from "./pages/Confirmation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div data-testid="app">
      <Router>
        <Navbar/>
        <Routes>
          <Route index path="/" element={<HotelList />} />
          <Route index path="/:id" element={<HotelDetail />} />
          <Route index path="/confirm" element={<Confirmation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
