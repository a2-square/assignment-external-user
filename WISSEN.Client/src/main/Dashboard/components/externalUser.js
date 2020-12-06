import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: 200
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function ExternalUser({ data }) {
    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {data.email}
                </Typography>
                <Typography variant="h5" component="h2">
                    {data.firstName} {data.lastName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {data.PhoneNumber}
                </Typography>
                <Typography variant="body2" component="p">
                    {data.fullAddress}
                </Typography>
            </CardContent>
        </Card>
    );
}