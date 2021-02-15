import { getCurrentDateObject } from '../helpes/helpers';

export  function validateTable (table) {
    return table.map(jurist=>{

        const keys = Object.keys(jurist);
        const copy = {...jurist};
        copy['Experience'].valid = validateExperience(copy['Experience'].value, copy['Age'].value)

        keys.forEach(key=>{

            if(key ==='License number' ){
                copy[key].valid = validateLicense(copy[key].value);
            }

            if(key ==='Phone' && copy[key].valid !== false){
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
                copy[key].valid = validateHasChildren(copy[key]);
            }

            if(key ==='Yearly Income'){
                copy[key].valid = validateYearlyIncome(copy[key].value);
            }

            if(key ==='Expiration date'){
                copy[key].valid = validateExpirationDate(copy[key].value);
            }

        });
        return copy;
    });

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateName(name) {
    const re = /^[a-zA-Z\s]*$/;
    return re.test(String(name).toLowerCase());
}

function validateYearlyIncome(string) {
    if(string > 1000000){
        return false
    }
    const re = /^\d{0,9}(\.\d{1,2})?$/;
    return re.test(String(string).toLowerCase());
}

function validateAge(age) {
    if(age < 21) {
        return false
    }
    const re = /^\d+$/;   //Positive Integer
    return re.test(String(age).toLowerCase());
}

function validateLicense(license) {
    if (license.length !== 6){
        return false
    }
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(String(license).toLowerCase());
}

function validateExperience(experience, age) {
    if(experience > (age - 21)){
        return false
    }
    if(experience === "None"){
        return true
    }
    const re = /^\d+$/;   //Positive Integer
    return re.test(String(experience).toLowerCase());
}

function validatePhone(phone) {
    const string = phone.slice(1, phone.length);

    if(string.length < 11) {

        return false
    }
    const re = /^\d+$/;   //Positive Integer
    return re.test(String(string).toLowerCase());
}

function validateHasChildren(obj) {
    let boolean = false;

    if(obj.value  === ''){
        obj.value = "FALSE";
        boolean = true;
    } else {
        boolean = obj.value.toLowerCase() === 'false' || obj.value.toLowerCase() === 'true'
    }
    return boolean;
}

function validateExpirationDate(str) {

    if(str.length !== 10 || str === ''){
        return false
    }
    let boolean = false;

    const re = /\d{4}-\d{2}-\d{2}/;
    const re1 = /\d{2}-\d{2}-\d{4}/;
    const bool = re.test(String(str));
    const bool1 = re1.test(String(str));

    if(bool || bool1) {
        const arr = str.split('-');
        const date = getCurrentDateObject();
        boolean = true;
                    //(YYYY-MM-DD або MM/DD/YYYY).
        if(bool) {
            arr.forEach((i, index)=>{

                if(index === 0 && i < date.yyyy){
                    boolean = false;
                }

                if(index === 1 && (i < date.mm || i > 12) ){
                    boolean = false;
                }

                if(index === 2 && (i < date.dd || i > 31) && arr[1] < date.mm ){
                    boolean = false;
                }
            });

        }
        if(bool1) {
            arr.forEach((i, index)=>{
                if(index === 0 && (i < date.mm || i > 12)){
                    boolean = false;
                }

                if(index === 1 && (i < date.dd || i > 31) && arr[0] < date.mm){
                    boolean = false;
                }

                if(index === 2 && i < date.yyyy){
                    boolean = false;
                }
            });
        }
    }

    return boolean;
}