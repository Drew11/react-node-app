function parseCSVtoArrayArray(csv) {
    const lines = csv.trim().split("\n");
    const result = lines.map(value =>{
        return value.split(',').map(i=>i.trim());
    } );

    result[0].unshift('Id');
    result[0].push('Duplicate with' );

    for (let i = 1; i <result.length; i++) {
        for (let k = result[i].length; k > 0 ; k--) {
            result[i][k] = result[i][k-1];
        }
        result[i][0] = i;
    }
    return result;
}

let event;

const sum = (x, y)=>{
    return  x + y;
};


if(event) {
     sum()
}