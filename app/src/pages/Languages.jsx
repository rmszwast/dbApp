import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import CrudTable from '../components/CrudTable';

export default function Languages({getRows, getCol}) {
  const path = 'languages'
  const [rows, setRows] = useState([]);
  const [selectVals, setSelectVals] = useState({});
  /*
   * You'll need to tailor columns to the corresponding table.
   * selectVals contains the select values for drop downs.
   * It's used in the valueOptions prop and shaped like this:
   * {
   *    devId:     string[];
   *    langNames: string[];
   *    platNames: string[];
   *    techNames: string[];
   *    countries: string[];
   * }
  */
  const columns = [
    { field: 'LanguageId',
      headerName: 'Language ID',
      width: 220,
      editable: false,
    },
    {
      field: 'Name',
      headerName: 'Language Name',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
  ];

  /*
   * You'll need to tailor the payload passed on each axios call in
   * onInsert, onUpdate, and onDelte to each corresponding table.
  */
  const onInsert = async (newRow) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + path,
        {
          Name: newRow.Name,
        }
      )
    }
    catch (error) {
      alert(
        `INSERT: Failed request to server. Status code: ${error.response.status}.
        See http resonse for more information.` 
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
              LanguageId: oldRow.LanguageId,
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
        See http resonse for more information.` 
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
              LanguageId: row.LanguageId
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
      <h1>Languages</h1>
      {rows.length > 0 && <CrudTable rows={rows} setRows={setRows} columns={columns} onInsert={onInsert} onUpdate={onUpdate} onDelete={onDelete} />}
    </>
  );
}
