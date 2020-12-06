import React, { useState } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    Typography,
    Container
} from '@material-ui/core';
import {
    LockOutlined
} from '@material-ui/icons';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as RegisterAction from './store/actions'


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    leftAligin: {
        left: 1,
        position: 'absolute'
    }
}));

const Register = React.memo(({ register, history }) => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [ssn, setSSN] = useState('');
    const [email, setEmail] = useState('');
    const [fullAddress, setFullAddress] = useState('');

    const submitDetails = async () => {
        try {
            const result = await register({ firstName, lastName, PhoneNumber, ssn, fullAddress, email });
            if (result && result.message) {
                alert(result.message);
                return;
            };
            alert("Success!");
        } catch (e) {
            if (e && e.message) {
                alert(e.message);
                return;
            };
            alert("Something went wrong");
        }
    }

    const redirectToLogin = () => {
        history.push('/login');
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Button className={classes.leftAligin} color="primary" variant="contained" onClick={redirectToLogin}>Login As Admin</Button>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Submit Your Details
        </Typography>
                <ValidatorForm className={classes.form} onSubmit={submitDetails} >
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="PhoneNumber"
                        label="Contact Number"
                        name="PhoneNumber"
                        value={PhoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        validators={['required', 'matchRegexp:^[0-9\b]+$']}
                        errorMessages={['This field is required', 'Invalid Contact Number']}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="ssn"
                        label="SSN"
                        name="ssn"
                        value={ssn}
                        onChange={(e) => setSSN(e.target.value)}
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="fullAddress"
                        label="Full Address"
                        name="fullAddress"
                        value={fullAddress}
                        onChange={(e) => setFullAddress(e.target.value)}
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        SUBMIT
          </Button>

                </ValidatorForm>
            </div>
        </Container>
    );
})


export default connect(null, { ...RegisterAction })(Register)