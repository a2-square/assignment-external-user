import React, { useCallback, useState } from 'react';
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
import * as LoginAction from 'main/Login/store/actions'


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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

const Login = React.memo(({ login, history, currentUserDetails }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    // submitting the login form
    const submitLoginForm = useCallback(
        async (event) => {
            try {
                event.preventDefault();
                await login({ email, password });
                await currentUserDetails();
                history.push('/dashboard');
            } catch (e) {
                if (e && e.message) {
                    alert(e.message);
                    return;
                };
                alert("Something went wrong");
            }
        },
        [email, password],
    )

    const redirectToLogin = () => {
        history.push('/');
    }

    return (
        <Container component="main" maxWidth="xs">
            <Button className={classes.leftAligin} color="primary" variant="contained" onClick={redirectToLogin}>Back to home</Button>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
        </Typography>
                <ValidatorForm className={classes.form} onSubmit={submitLoginForm}>
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        validators={['required', 'isEmail']}
                        errorMessages={['This field is required', 'Invalid Email ']}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        LOGIN
          </Button>

                </ValidatorForm>
            </div>
        </Container>
    );
})

const mapStateToProps = ({ loginReducer }) => {
    return {
        user: loginReducer.user
    }
}

export default connect(mapStateToProps, { ...LoginAction })(Login)