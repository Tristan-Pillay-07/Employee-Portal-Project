import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/dEmployee';
import { Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, useTheme, ButtonGroup, Button } from '@mui/material';
import DEmployeesForm from './DEmployeesForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
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
    }
});

const DEmployees = (props) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllDEmployees();
  }, []);

const onDelete = id => {
  if (window.confirm('Are you sure you want to delete this employee?'))
      props.deleteDEmployee(id, () => toast.success("Employee deleted successfully!", {appearance: 'info'}));
};

  return (
    <ThemeProvider theme={theme}>
      <Paper
      sx={{
        margin: 2,  
        padding: 2,
      }}
      elevation={3}
    >
      <Grid container spacing={2}>
        <Grid size={6}>
          <DEmployeesForm currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
        <Grid size={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow  
                sx={{
                      "& .MuiTableCell-head": {
                        fontSize: "1.25rem"
                      }
                  }}>
      
                  <TableCell>Name</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>City</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.DEmployeesList?.map((record) => (
                  <TableRow key={record.id} hover>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.position}</TableCell>
                    <TableCell>{record.email}</TableCell>
                    <TableCell>{record.phone}</TableCell>
                    <TableCell>{record.city}</TableCell>
                    <TableCell>
                      <ButtonGroup variant="contained" color="none" aria-label="basic button group">
                        <Button
                        onClick={() => setCurrentId(record.id)}><EditIcon color="formBlue" /></Button>
                        <Button onClick={() => onDelete(record.id)}><DeleteIcon color="error" /></Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  DEmployeesList: state.dEmployeeReducer.list
});

const mapActionToProps = {
  fetchAllDEmployees: actions.fetchAll,
  deleteDEmployee: actions.Delete
};

export default connect(mapStateToProps, mapActionToProps)(DEmployees);
