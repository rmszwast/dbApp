import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import CrudTable from '../components/CrudTable';

export default function Technologies({getRows, getCol}) {
  const path = 'technologies'
  const [rows, setRows] = useState([]);
  const [selectVals, setSelectVals] = useState({});

  /* Tailor the columns to the Technology Entity for the application */

  const columns = [
    { field: 'TechnologyId',
      headerName: 'Technology ID',
      width: 220,
      editable: false,
    },
    {
      field: 'Name',
      headerName: 'Technology Name',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
  ];

  /*
   * Next, tailor the payload passed on each axios call in
   * onInsert, onUpdate, and onDelte to each corresponding table.
  */

  const onInsert = async (newRow) => {
    try {
    
        /* This sends a request to the backend for its INSERT query so the frontend can display updated values */
      const res = await axios.post(
        process.env.REACT_APP_API_URL + path,
        {
          Name: newRow.Name,
        }
      )
    }
    catch (error) {
      alert(
        `INSERT: There was a failed request to server. Status code: ${error.response.status}.
        See http response for more information.` 
      );
      return 1;
    }
    finally {
      const rows = await getRows(path); 
      setRows([...rows]);  
    }
    const rows = await getRows(path); 
    setRows([...rows]);
    return 0;
  };

  const onUpdate = async (newRow, oldRow) => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + path,
        {
          updateCond:
            {
              TechnologyId: oldRow.TechnologyId,
            },
          updateVals:
            {
              Name: newRow.Name,
            }
        }
      )
    }
    catch (error) {
      alert(
        `UPDATE: Failed request to server. Status code: ${error.response.status}.
        See http response for more information.` 
      );
      return 1;
    }
    finally {
      const rows = await getRows(path); 
      setRows([...rows]);  
    }
    const rows = await getRows(path); 
    setRows([...rows]);
    return 0;
  };

  const onDelete = async (row) => {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_API_URL + path,
        {
          data: {
            deleteCond: {
                TechnologyId: row.TechnologyId
            }
          }
        }
      );
    }
    catch (error) { 
      alert(`DELETE: Failed request to server. Status code: ${error.response.status}`);
      return 1;
    }
    finally {
      const rows = await getRows(path); 
      setRows([...rows]);
    }
    const rows = await getRows(path); 
    setRows([...rows]);
    return 0;
  };
  
  useEffect(() => {
    (async () => {
      setRows(await getRows(path));
      const o = {}
      selectVals.devId = await getCol('developers/DeveloperId');
      selectVals.langNames = await getCol('languages/Name');
      selectVals.platNames = await getCol('platforms/Name');
      selectVals.techNames = await getCol('technologies/Name');
      selectVals.countries = await getCol('countries/Name');
      setSelectVals({...selectVals});
    })();
  }, []);

  return (
    <>
      {<Link to={"/"}>Home</Link>}
      <h1>Technology</h1>
      {rows.length > 0 && <CrudTable rows={rows} setRows={setRows} columns={columns} onInsert={onInsert} onUpdate={onUpdate} onDelete={onDelete} />}
    </>
  );
}
