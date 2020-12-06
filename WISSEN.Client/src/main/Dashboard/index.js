import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import * as DashboardAction from 'main/Dashboard/store/actions'
import Header from "main/Common/components/header"
import ExternalUser from "main/Dashboard/components/externalUser";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    gridRoot: {
        marginTop: theme.spacing(8),
        padding: 20
    },
}));

const Dashboard = React.memo(({ externalUser, ...props }) => {
    const classes = useStyles();
    const getExternalUsers = async () => {
        const payload = {
            getType: 'all'
        };
        props.getExternalUsers(payload);
    }

    useEffect(() => {
        getExternalUsers();
    }, [])

    return (
        <div className={classes.root}>
            <Header />
            <CssBaseline />
            <Grid container className={classes.gridRoot}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        {externalUser.map((extUser) => (
                            <Grid key={extUser._id} item>
                                <ExternalUser key={extUser._id} data={extUser} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
})

const mapStateToProps = ({ DashboardReducer }) => {
    return {
        externalUser: DashboardReducer.externalUser
    }
}

export default connect(mapStateToProps, { ...DashboardAction })(Dashboard)