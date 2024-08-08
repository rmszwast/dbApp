import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import DevLanguages from "./pages/DevLanguages";
//import './App.css';
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
          <Route path="/developer-languages" element={<DevLanguages getRows={getRows} getCol={getCol} />} />
        </Routes>
      </Router>
    </div>
  );
}
