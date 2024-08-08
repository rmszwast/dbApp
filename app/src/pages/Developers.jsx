import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import CrudTable from '../components/CrudTable';

export default function Developers({getRows, getCol}) {
  const path = "developers"
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
        {
            field: 'DeveloperId',
            headerName: 'Developer ID#',
            width: 220,
            editable: false,            
        },
        {
            field: 'DevType',
            headerName: 'Developer Type',
            width: 220,
            align: 'left',
            headerAlign: 'left',
            editable: false,
          },
    ]
}

