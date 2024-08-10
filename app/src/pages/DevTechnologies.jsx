import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import CrudTable from '../components/CrudTable';

export default function DevTechnologies({getRows, getCol}) {
  const path = "developer-technologies"
  const [rows, setRows] = useState([]);
  const [selectVals, setSelectVals] = useState({});

  /* Continue Tailoring */
  const columns = [
    { field: 'DeveloperId',
      headerName: 'Developer ID',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: selectVals.devId,
    },
    {
      field: 'DevType',
      headerName: 'Developer Type',
      width: 220,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'TechnologyId',
      headerName: 'Technology ID',
      type: 'string',
      width: 220,
      editable: false,
    },
    {
      field: 'Name',
      headerName: 'TechnologyName',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: selectVals.techNames,
    },
    {
      field: 'HaveWorkedWith',
      headerName: 'Have Worked With?',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: [0, 1]
    },
    {
      field: 'WantToWorkWith',
      headerName: 'Want to Work With?',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: [0, 1]
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
            DeveloperId: newRow.DeveloperId,
            Name: newRow.Name,
            HaveWorkedWith: newRow.HaveWorkedWith,
            WantToWorkWith: newRow.WantToWorkWith,
          }
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
              DeveloperId: oldRow.DeveloperId,
              TechnologyId: oldRow.TechnologyId,
            },
          updateVals:
            {
              DeveloperId: newRow.DeveloperId,
              Name: newRow.Name,
              HaveWorkedWith: newRow.HaveWorkedWith,
              WantToWorkWith: newRow.WantToWorkWith,
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
              DeveloperId: row.DeveloperId,
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
      <h1>Developer Technologies</h1>
      {rows.length > 0 && <CrudTable rows={rows} setRows={setRows} columns={columns} onInsert={onInsert} onUpdate={onUpdate} onDelete={onDelete} />}
    </>
  );
}
