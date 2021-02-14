export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validateName(name) {
    const re = /^[a-zA-Z\s]*$/;
    return re.test(String(name).toLowerCase());
}

export function validateAge(age) {
    if(age < 21) {
        return false
    }
    const re = /^\d+$/;   //Positive Integer
    return re.test(String(age).toLowerCase());
}

export function validateLicense(license) {
    if (license.length < 6){
        return false
    }
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(String(license).toLowerCase());
}

export function validateExperience(experience, age) {
    if(experience > (age - 21)){
        return false
    }
    if(experience === "None"){
        return true
    }
    const re = /^\d+$/;   //Positive Integer
    return re.test(String(experience).toLowerCase());
}

export function validatePhone(phone) {
    const string = phone.slice(1, phone.length);

    if(string.length < 11) {

        return false
    }
    const re = /^\d+$/;   //Positive Integer
    return re.test(String(string).toLowerCase());
}