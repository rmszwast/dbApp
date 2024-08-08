import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import Edit from "../components/Edit";
import { Link } from "react-router-dom";

export default function DevTechnologies() {
  const path = "developer-technologies"
  const [data, setData] = useState([]);
  const [editRow, setEditRow] = useState(null);

  const getData = async () => {
    const res = await axios.get(process.env.REACT_APP_API_URL + path);
    setData(res.data);
  }

  useEffect(() => {getData()}, []);
  return (
    <>
      {<Link to={"/"}>Home</Link>}
      <h1>Developer Technologies</h1>
      {data.length > 0 && <Table path={path} data={data} setData={setData} setEditRow={setEditRow} />}
      {console.log(editRow)}
      {/* add a form(s) here for edit/create*/}
    </>
  );
}
