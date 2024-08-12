import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CrudTable from '../components/CrudTable';

export default function Countries({getRows, getCol}) {
  const path = 'countries'
  const [rows, setRows] = useState([]);
  const [selectVals, setSelectVals] = useState({});

  /* Continue tailoring columns for its corresponding entity*/

  const columns = [
    {
      field: 'CountryId',
      headerName: 'Country Id',
      width: 220,
      editable: false,
    },
    {
      field: 'Name',
      headerName: 'Country Name',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'Population',
      headerName: 'Population',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'number'           
    },
    {
      field: 'CurrencyName',
      headerName: 'CurrencyName',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'InnovationIndex',
      headerName: 'InnovationIndex',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'number'           
    },
  ]; 

  /* Continue Tailoring payloads for the front end to extract data from the backend's queries */

  const onInsert = async (newRow) => {
    try {
      const res = await axios.post(
        /* Insert prompts the CREATE query from the backend */
        /* This translates as a POST to the frontend's UI */
        process.env.REACT_APP_API_URL + path,
        {
          Name: newRow.Name,
          Population: newRow.Population,
          CurrencyName: newRow.CurrencyName,
          InnovationIndex: newRow.InnovationIndex,
        },
      )
    }
    catch (error) {
      alert(
        `INSERT: Failed request to server. Status code: ${error.response.status}.
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
            CountryId: oldRow.CountryId
          },
          updateVals:
          {
           Name: newRow.Name ,
           Population: newRow.Population ,
           CurrencyName: newRow.CurrencyName ,
           InnovationIndex: newRow.InnovationIndex,
          },
        }
      )
    }
    catch (error) {
      alert(
        `UPDATE: You can do that better than that. Status code: ${error.response.status}.
        See http response for more information.`
      );
      return 1;
    }
    finally {
      const rows = await getRows(path);
      setRows([...rows]);
    }
    const rows = await getRows(path) ;
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
              CountryId: row.CountryId
            }
          }
        }
      );
    }
    catch (error) {
      alert(`DELETE: Failed request to server. Status code: ${error.reponse.status}`);
      return 1;
    }
    finally {
      const rows = await getRows(path) ; 
      setRows([...rows]);
    }
    const rows = await getRows(path);
    setRows([...rows]);
    return 0;
  };
  useEffect(() => {
    (
      async() => {
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
    <h1>Countries</h1>
    {rows.length > 0 && <CrudTable rows={rows} setRows={setRows} columns={columns} onInsert={onInsert} onUpdate={onUpdate} onDelete={onDelete} />}
    </>
  ) ;
  }

