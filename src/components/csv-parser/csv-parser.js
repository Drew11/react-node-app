import React, {useState, useRef} from 'react';
import {
    validateExperience,
    validatePhone,
    validateEmail,
    validateName,
    validateAge,
    validateLicense} from './validators/validators';
import './csv-parser.scss';


const CsvParser = ()=> {

    const [mapTable, setMapTable] = useState(null);
    const [error, setError] = useState(null);
    const csvInputRef = useRef();

    const handleFileSelect = (event)=>{

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

    const handleFileLoad =(event)=>{

       setMapTable(parseCSVtoArrayObject(event.target.result));
    };

    function parseCSVtoArrayObject(csv) {
        const lines = csv.trim().split("\n");

        const array = lines.map((value, index)=>{
            const arr = value.split(',').map(i=>i.trim());
            if(index === 0) {
                arr.unshift('Id')
            }else
                arr.unshift(index);
            return arr;
        } );

        const jurists = [];
        const requiredFields = ['Full Name', 'Phone', 'Email'];
        const indices = requiredFields.map(field=>array[0].indexOf(field));

        for (let i = 1; i < array.length; i++ ){
            const jurist = {};


            for (let k = 0; k < array[i].length; k ++){
                if(array[i][k] === '' && indices.includes(k)){
                    setError('Table not valid');
                    return
                }

                if(array[0][k] === 'Phone'){
                    if(array[i][k].length === 10){
                        array[i][k] =`+1${array[i][k]}`
                    }else
                        array[i][k] = `+${array[i][k]}`
                }

                if(array[0][k] === 'Experience'){
                    if(array[i][k] === ''){
                        array[i][k] = "None"
                    }
                }

                jurist[array[0][k]] = { value : array[i][k],valid: true };
            }
            jurist['Duplicate with'] = {valid: true};
            jurists.push(jurist);
        }

        return jurists;
    }

    function validateTable() {
        setMapTable(prevState=>{
          return prevState.map(jurist=>{

              const keys = Object.keys(jurist);
              const copy = {...jurist};
              copy['Experience'].valid = validateExperience(copy['Experience'].value, copy['Age'].value)

              keys.forEach(key=>{

                  if(key ==='License number'){
                      copy[key].valid = validateLicense(copy[key].value);
                  }

                  if(key ==='Phone'){
                      copy[key].valid = validatePhone(copy[key].value)
                  }

                  if(key ==='Age'){
                      copy[key].valid = validateAge(copy[key].value)
                  }

                  if (key === 'Full Name'){
                      copy[key].valid = validateName(copy[key].value)
                  }

                  if(key === 'Email'){
                      copy[key].valid = validateEmail(copy[key].value)
                  }

                  if(key ==='Has children'){
                      let boolean;
                      if(copy[key].value === ''){
                          copy[key].value = "FALSE"
                      } else {
                          boolean = typeof Boolean( copy[key].value) === "boolean";
                      }
                      copy[key].valid = boolean;
                  }
              });
              return copy;
          })
        })

    }

    const crateHeaders = ()=> {
        return Object.keys(mapTable[0]).map((val, i)=>{
            if(val === 'Duplicate with'){
                return <th
                    key={i}
                    onClick={validateTable}
                >
                    {val}
                </th>
            }
            return <th>{val}</th>
        });
    };

    const createRows = ()=>{
        return mapTable.map(row=>{

            return <tr>
                {
                    Object.keys(row).map(key=>{

                       return <td
                           className={row[key].valid?'':'not-valid'}
                       >
                           {row[key].value}
                       </td>
                    })
                }
            </tr>
        });
    };

    console.log(mapTable)

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


            {error && <div>
                {error}
            </div>}

            <table>
                <thead>
                    <tr>
                        { mapTable && crateHeaders() }
                    </tr>
                </thead>

                <tbody>

                    {  mapTable && createRows() }

                </tbody>
            </table>
        </div>
    );
};

export default CsvParser;
