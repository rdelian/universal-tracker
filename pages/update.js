import { Container, Grid } from '@material-ui/core';
import React from 'react';
import UpdateTrack from '../components/UpdateTrack'

export default function Update() {
    const [tracks, setTracks] = React.useState([])

    React.useEffect(() => {
        fetch('api/trackvalues?' + new URLSearchParams({ user: 1 }))
            .then(data => data.json())
            .then(data => {
                setTracks(data.tracksvalues)
            })
    }, [])

    return (
        <Container>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                {tracks.map((track) => <UpdateTrack trackData={track} />)}
            </Grid>
        </Container>
    )
}