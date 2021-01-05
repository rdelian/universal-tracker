import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


export default function UpdateTrack({ trackData }) {
    const classes = useStyles();
    return (
        <Grid item>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {trackData.tracks.title}
                    </Typography>
                    <Typography color="textSecondary">
                        {trackData.createDate}
                    </Typography>
                    <TextField
                        id="standard-number"
                        label="Number"
                        type="number"
                    />
                </CardContent>
                <CardActions>
                    <Button size="small" variant="outlined" color="secondary">SKIP</Button>
                </CardActions>
            </Card>
        </Grid>

    )
}

