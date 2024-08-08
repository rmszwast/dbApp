import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import DevLanguages from "./pages/DevLanguages"
import Countries from "./pages/Countries"
import Platforms from "./pages/Platforms"
import Developers from "./pages/Developers"
import Languages from "./pages/Languages"
import Technologies from "./pages/Technologies"
import DevPlatforms from "./pages/DevPlatforms"
import DevTechnologies from "./pages/DevTechnologies"
import './App.css';
import { randomId } from '@mui/x-data-grid-generator';

const getRows = async (path) => {
  try {
  const res = await axios.get(process.env.REACT_APP_API_URL + path);
  const rows = res.data;
  rows.map((o, i) => o.id = randomId());
  return rows;
  }
  catch (error) {
    alert(`READ: Failed request to server. Status code: ${error.response.status}
      See http resonse for more information.`)
      return 1;
  }
}

const getCol = async (path) => {
  const column = path.split('/').at(-1);
  try {
    const res = await axios.get(process.env.REACT_APP_API_URL + path);
    const vals = res.data;
    return vals.map((o) => o[column]);
  }
  catch (error) {
    alert(`READ: Failed request to server. Status code: ${error.response.status}
          See http resonse for more information.`);

    /* ask why this returns one, is it a safeguard so server does not crash? */
    return 1;
  }
}

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Pass getRows and getCol to each page using CrudTable */}
          <Route path="/developers" element={<Developers getRows={getRows} getCol={getCol}/>} />
          <Route path="/countries" element={<Countries getRows={getRows} getCol={getCol}/>} />
          <Route path="/languages" element={<Languages getRows={getRows} getCol={getCol}/>} />
          <Route path="/platforms" element={<Platforms getRows={getRows} getCol={getCol}/>} />
          <Route path="/technologies" element={<Technologies getRows={getRows} getCol={getCol}/>} />
          <Route path="/developer-languages" element={<DevLanguages getRows={getRows} getCol={getCol} />} />
          <Route path="/developer-platforms" element={<DevPlatforms getRows={getRows} getCol={getCol}/>} />
          <Route path="/developer-technologies" element={<DevTechnologies getRows={getRows} getCol={getCol}/>} />
        </Routes>
      </Router>
    </div>
  );
}
