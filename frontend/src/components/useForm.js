import React, {useState, useEffect} from 'react';

const useForm = (initialfieldvalues, validate, setCurrentId) => {
    const [values, setValues] = useState(initialfieldvalues);
    const [errors, setErrors] = useState({});

        const handleInputChange = e => {
            const {name, value} = e.target;
            const fieldValue = {[name]: value};
            setValues({
                ...values,
                [name]: value
            });
 
            validate(fieldValue);
        }

        const resetForm = () => {
            setValues({
                ...initialfieldvalues
            });
            setErrors({});
            setCurrentId(0);
        }

    return { 
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
     };
}
 
export default useForm;