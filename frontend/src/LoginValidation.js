function validation(values){
    alert('')
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (values.email === '') {
        error.email = 'Email no debe estar vacio'
    }
    else if (!email_pattern.test(values.email)) {
        error.email = 'Email no coincide'
    } else {
        error.email = ''
    }

    if(values.password === ''){
        error.password = 'Contraseña no puede estar vacía'
    }
    else if(!password_pattern.test(values.password)){
        error.password = 'Contraseña no coincide'
    } else {
        error.password = ''
    }
    return error;
}

export default validation;