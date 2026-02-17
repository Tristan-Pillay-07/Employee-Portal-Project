import { Button, Grid, TextField } from '@mui/material';
import React, {useEffect, useState} from 'react';
import useForm from './useForm';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import { connect } from 'react-redux';
import * as actions from '../actions/dEmployee';
import { toast } from 'react-toastify';

let theme = createTheme();
theme = createTheme(theme, {
  palette: {
      formBlue: theme.palette.augmentColor({
      color: {
        main: '#2b2a71',
      },
      name: 'formBlue',
      }),
    grey: theme.palette.augmentColor({
      color: {
        main: '#646464',
      },
      name: 'grey',
        }),
    }
});

const initialFieldValues = {
    name: '',
    position: '',
    email: '',
    phone: '',
    city: ''
}

const DEmployeesForm = (props) => {

    const validate = (fieldvalues = values) => {
        let temp = {...errors};
        if('name' in fieldvalues)
            temp.name = fieldvalues.name ? "" : "This field is required.";
        if('email' in fieldvalues)
            temp.email = (/$^|.+@.+..+/).test(fieldvalues.email) ? "" : "Email is not valid.";
        if('phone' in fieldvalues)
            if (!fieldvalues.phone) {
                temp.phone = "Contact number is required.";
            }
            else if (!/^\+?\d+$/.test(fieldvalues.phone)) {
                temp.phone = "Contact number is not valid. Only numbers allowed.";
            }
            else {
                temp.phone = "";
            }

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "");
    }


    const {values, setValues, errors, setErrors, handleInputChange, resetForm} = useForm(initialFieldValues, validate, props.setCurrentId);

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            const onSuccess = () => {
                resetForm();
                toast.success("Submitted successfully");
                
            }
            if (props.currentId === 0){
                props.createDEmployee(values, onSuccess);
            } else {
                props.updateDEmployee(props.currentId, values, onSuccess);
            }
        }
    }

    useEffect(() => {
        if (props.currentId === 0) {
            setValues(initialFieldValues);
        } else {
            setValues(props.DEmployeesList.find(x => x.id === props.currentId));
            setErrors({});

        }
    }, [props.currentId])

    return ( 
    <ThemeProvider theme={theme}>
    <form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2} 
        sx={
            { '& .MuiTextField-root': { m: 1, width: '25ch' }} 
        }>
            <Grid size={6}>
                <TextField 
                required name='name' 
                id='outlined-required' 
                label='Full Name' 
                fullWidth value={values.name} 
                onChange={handleInputChange}
                error={errors.name ? true : false}
                helperText={errors.name} />

                <TextField 
                required name='phone' 
                variant='outlined' 
                label='Contact Number' 
                fullWidth value={values.phone} 
                onChange={handleInputChange} 
                error={errors.phone ? true : false}
                helperText={errors.phone}/>

                <TextField 
                required name='email' 
                variant='outlined' 
                label='Email' 
                fullWidth value={values.email} 
                onChange={handleInputChange} 
                error={errors.email ? true : false}
                helperText={errors.email}/>
                
            </Grid>
            <Grid size={6} sx={{'& Button': { m: 1 }} }>
                <TextField name='position' variant='outlined' label='Position' fullWidth value={values.position} onChange={handleInputChange} />
                <TextField name='city' variant='outlined' label='City' fullWidth value={values.city} onChange={handleInputChange} />
                <div>
                    <Button variant='contained' color='formBlue' type='submit' size='large'>Submit</Button>
                    <Button variant='contained' color='grey' size='large' onClick={resetForm}>Reset</Button>
                </div>
            </Grid>
        </Grid>
    </form> 
    </ThemeProvider>);
}
 
const mapStateToProps = (state) => ({
  DEmployeesList: state.dEmployeeReducer.list
});

const mapActionToProps = {
  createDEmployee: actions.create,
  updateDEmployee: actions.update,
  deleteDEmployee: actions.Delete
};

export default connect(mapStateToProps, mapActionToProps)(DEmployeesForm);