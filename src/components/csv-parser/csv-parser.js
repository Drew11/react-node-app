import React, { useState, useRef } from 'react';
import { validateTable } from './validators/validators';
import './csv-parser.scss';
import { parseCSVtoArrayObjects } from './helpes/helpers'
const CsvParser = ()=> {

    const [mapTable, setMapTable] = useState(null);
    const [error, setError] = useState(null);
    const csvInputRef = useRef();

    const handleFileSelect = ( event ) => {

        const arr = event.target.files[0].name.split('.');

        if(arr[arr.length - 1] !== 'csv'){
            setError("Not allowed format, try again this time *.csv only");
            return;
        }

        let reader = new FileReader();
        reader.readAsText(event.target.files[0]);
        reader.onload = handleFileLoad;
        csvInputRef.current.value = "";
    };
    const handleFileLoad = ( event ) => {
        const convertRes = parseCSVtoArrayObjects(event.target.result);

        if(typeof convertRes === 'string') {
            setError(convertRes);
            setMapTable(null);
        }else {
            setMapTable(validateTable(convertRes));
            setError(null);
        }
    };

    const crateHeaders = () => {
        return Object.keys(mapTable[0]).map((val, i)=>{
            return <th key={i}>{val}</th>
        });
    };

    const createRows = () => {
        return mapTable.map((row, i)=>{
            return <tr
                key={i}
            >
                {
                    Object.keys(row).map((key, idx)=>{
                       const value = Array.isArray(row[key].value)? row[key].value.join(', '): row[key].value;
                       return <td
                           className={row[key].valid ?'':'not-valid'}
                       >
                           { value }
                       </td>
                    })
                }
            </tr>
        });
    };
    const tableHeaders = mapTable && crateHeaders();
    const tableRows = mapTable && createRows();
    const errorView = error && <div className="error" >
        <div>
            <span>
                { error }
            </span>
        </div>

        <button
            onClick={()=>setError(null)}
        >
            &#x2715;
        </button>

    </div>;

    return (
        <div className="csv-parser">
            <header>
                <span>AppCo</span>
            </header>

            <div>
                <div>
                    <label htmlFor="csv">Choose a file &#8682;</label>

                    <input
                           ref={csvInputRef}
                           type="file"
                           multiple
                           id="csv"
                           name="file"
                           accept=".csv"
                           onChange={handleFileSelect}
                    />
                </div>


                {
                     <button className={mapTable?'': 'hide'}
                        onClick={()=>{
                            csvInputRef.current.value = "";
                            setMapTable(null)
                        }}
                    >
                        &#x2715;
                    </button>
                }
            </div>

            { errorView }

            <table>
                <thead>
                    <tr>
                        { tableHeaders }
                    </tr>
                </thead>

                <tbody>
                    {   tableRows }
                </tbody>
            </table>

        </div>
    );
};

export default CsvParser;
