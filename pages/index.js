import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Home() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            uTracker
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Grid container direction="column" justify="center" alignItems="center" >
          <Link href='/create'>
            <Button variant="contained">Create</Button>
          </Link>
          <Link href='/choose'>
            <Button variant="contained">Choose</Button>
          </Link>
          <Link href='/progress'>
            <Button variant="contained">Progress</Button>
          </Link>
        </Grid>
      </Container>
    </>
  )
}