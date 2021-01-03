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
          <br />
          <Link href='/create'>
            <Button variant="contained">Create</Button>
          </Link>
          <br />
          <Link href='/choose'>
            <Button variant="contained">Choose</Button>
          </Link>
          <br />
          <Link href='/progress'>
            <Button variant="contained">Progress</Button>
          </Link>
          <br />
          <Link href='/subscribe'>
            <Button variant="contained">Subscribe</Button>
          </Link>
        </Grid>
      </Container>
    </>
  )
}