export function parseCSVtoArrayObjects ( csv ) {

    const array = convertStringToArray(csv);
    const jurists = [];
    const requiredFields = ['Full Name', 'Phone', 'Email'];
    const indices = requiredFields.map(field=>array[0].indexOf(field));

    for (let i = 1; i < array.length; i++ ){
        const jurist = {};

        for (let k = 0; k < array[i].length; k ++){
            if(array[i][k] === '' && indices.includes(k)){
                return 'Table not valid';
            }

            if(array[0][k] === 'Phone'){
                if(array[i][k].length === 10){
                    array[i][k] =`+1${array[i][k]}`
                }else
                    array[i][k] =`+${array[i][k]}`
            }

            if(array[0][k] === 'Experience'){
                if(array[i][k] === ''){
                    array[i][k] = "None"
                }
            }

            if(array[0][k] === 'License states'){
                if(array[i][k].length>2){
                   array[i][k] = array[i][k].slice(0, 2).toUpperCase();
               }
            }

            if(array[0][k] === 'Yearly Income'){
                const val = array[i][k];
                const numb = +array[i][k];
                if(Number.isNaN(numb)){
                    array[i][k] = val;
                    console.log( numb)
                }else {
                    array[i][k] = numb.toFixed(2);
                }
            }

            jurist[array[0][k]] = { value : array[i][k], valid: true };
        }

        jurist['Duplicate with'] = {value: [], valid: true};
        jurists.push(jurist);
    }

     checkDuplicate(jurists, 'Phone');
     checkDuplicate(jurists, 'Email');

     return jurists;
}

const convertStringToArray = ( str ) => {
    const lines = str.trim().split("\n");

    return lines.map((value, index)=>{
        const arr = value.split(',').map(i=>i.trim());
        if(index === 0) {
            arr.unshift('Id')
        }else
            arr.unshift(index);
        return arr;
    } );
};

const checkDuplicate  = ( arr, key ) => {
    for (let i = 0; i < arr.length; i++){
        for (let k = i + 1;  k  < arr.length; k++){
            if(arr[i][key].value === arr[k][key].value) {
                arr[i]["Duplicate with"].valid = false;
                arr[i]["Duplicate with"].value.push(arr[k]["Id"].value);
                arr[i][key].valid = false;
                arr[k]["Duplicate with"].valid = false;
                arr[k]["Duplicate with"].value.push(arr[i]["Id"].value);
                arr[k][key].valid = false;
            }
        }
    }
};

export const getCurrentDateObject = ()=>{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();

    if ( dd < 10 ) {
        dd=`0${dd}`;
    }

    if (mm < 10) {
        mm=`0${mm}`;
    }
    return {
        mm,
        dd,
        yyyy
    }
};

// function parseCSVtoArrayArray(csv) {
//     const lines = csv.trim().split("\n");
//     const result = lines.map(value =>{
//         return value.split(',').map(i=>i.trim());
//     } );
//
//     result[0].unshift('Id');
//     result[0].push('Duplicate with' );
//
//     for (let i = 1; i <result.length; i++) {
//         for (let k = result[i].length; k > 0 ; k--) {
//             result[i][k] = result[i][k-1];
//         }
//         result[i][0] = i;
//     }
//     return result;
// }
//
