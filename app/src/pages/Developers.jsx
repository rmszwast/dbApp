import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import CrudTable from '../components/CrudTable';

export default function Developers({getRows, getCol}) {
  const path = 'developers'
  const [rows, setRows] = useState([]);
  const [selectVals, setSelectVals] = useState({});

/* Prepare the data by setting up the columns */
  const columns = [
    {
      field: 'DeveloperId',
      headerName: 'Developer ID#',
      width: 220,
      editable: true, 
      type: 'integer'           
    },
    {
    /* set this up to display country name */
      field: 'Name',
      headerName: 'Country',
      width: 200,
      editable: true,
      type: 'singleSelect',
      valueOptions: selectVals.Name,          },
    {
      field: 'DevType',
      headerName: 'Developer Type',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'Age',
      headerName: 'Age Range',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'EdLevel',
      headerName: 'Education',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'YearsCodePro',
      headerName: 'Experience (in years)',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'integer'           
    },
    {
      field: 'CompTotal',
      headerName: 'Compensation Total',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'integer'           
    },
    {
      field: 'ConvertedCompYearly',
      headerName: 'Annual Wage in $',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'integer'           
    },
  ];
      /*
   * Tailor the payload passed on each axios call in
   * onInsert, onUpdate, and onDelte to each corresponding table.
  */
  const onInsert = async (newRow) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + path,
          {
            DeveloperId: newRow.DeveloperId,
            Country: newRow.Name,
            DevType: newRow.DevType,
            Age: newRow.Age,
            EdLevel: newRow.EdLevel,
            YearsCodePro: newRow.YearsCodePro,
            CompTotal: newRow.CompTotal,
            ConvertedCompYearly: newRow.ConvertedCompYearly,
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

    /* Update will call the backend to INSERT and then CrudTable will update for the frontend */
  const onUpdate = async (newRow, oldRow) => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + path,
        {
          updateCond:
            {
              DeveloperId: oldRow.DeveloperId,
            },
          updateVals:
            {
              Country: newRow.Name,
              DevType: newRow.DevType,
              Age: newRow.Age,
              EdLevel: newRow.EdLevel,
              YearsCodePro: newRow.YearsCodePro,
              CompTotal: newRow.CompTotal,
              ConvertedCompYearly: newRow.ConvertedCompYearly,          
            }
        }
      )
    }
    catch (error) {
      alert(
        `UPDATE: Oops- Failed request to server. Status code: ${error.response.status}.
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
              DeveloperId: row.DeveloperId
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

  /* Explore this later */
  /* Note: This appears to be a universal SELECT query for all of the tables, with the exception of the intersection tables (they will be the union of their many-many relationship) */
  useEffect(() => {
    (async () => {
      setRows(await getRows(path));
      /* Do NOT change the o to objects - do not touch the o - it has to stay o for the getRow method in App.js to process */
      const o = { }
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
    <h1>Developers</h1>
    {rows.length > 0 && <CrudTable rows={rows} setRows={setRows} columns={columns} onInsert={onInsert} onUpdate={onUpdate} onDelete={onDelete} />}
    </>
  );
}
