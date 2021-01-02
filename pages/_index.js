import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

export default function Home() {
  return (
    <>
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