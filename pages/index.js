import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Link href='/create'>
        <div className='card'>Create Track</div>
      </Link>
      <Link href='/choose'>
        <div className='card'>Alege</div>
      </Link>
      <Link href='/progress'>
        <div className='card'>Progres</div>
      </Link>
    </>
  )
}