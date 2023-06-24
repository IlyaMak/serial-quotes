import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/Button';
import Button from '@mui/material/IconButton';
import ShuffleIcon from '@mui/icons-material/Shuffle';

export default function Home() {
  const breakingBadUrl = 'https://api.breakingbadquotes.xyz/v1/quotes';
  const strangerThingsUrl = 'https://strangerthings-quotes.vercel.app/api/quotes';
  const gameOfThronesUrl = 'https://api.gameofthronesquotes.xyz/v1/random';
  const [quotes, setQuotes] = useState([]);
  const [isBreakingBadQuotes, setBreakindBadQuotes] = useState(true);
  const [isStrangerThingsQuotes, setStrangerThingsQuotes] = useState(false);
  const [isGameOfThronesQuotes, setGameOfThronesQuotes] = useState(false);

  const fetchBreakingBadQuotes = () => {
    setStrangerThingsQuotes(false);
    setGameOfThronesQuotes(false);
    setBreakindBadQuotes(true);
    fetch(breakingBadUrl)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setQuotes(data)
      })
  }

  const fetchStrangerThingsQuotes = () => {
    setBreakindBadQuotes(false);
    setGameOfThronesQuotes(false);
    setStrangerThingsQuotes(true);
    fetch(strangerThingsUrl)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setQuotes(data)
      })
  }

  const fetchGameofThronesQuotes = () => {
    setBreakindBadQuotes(false);
    setStrangerThingsQuotes(false);
    setGameOfThronesQuotes(true);
    fetch(gameOfThronesUrl)
      .then(response => {
        return response.json()
      })
      .then(data => {
        const data2 = [{ quote: data.sentence, author: data.character["name"] }];
        setQuotes(data2)
      })
  }

  const showSerialQuotes = () => {
    if (isBreakingBadQuotes) {
      fetchBreakingBadQuotes();
    } else if (isStrangerThingsQuotes) {
      fetchStrangerThingsQuotes();
    } else if (isGameOfThronesQuotes) {
      fetchGameofThronesQuotes();
    }
  }

  useEffect(() => {
    fetchBreakingBadQuotes()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Serial Quotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.serialsContainer}>
        <Button className={styles.serialButton} onClick={fetchBreakingBadQuotes}>
          <img className={styles.breakingBadIcon} src={"/breakingBad.png"} alt="Breaking Bad Logo" />
        </Button>
        <Button className={styles.serialButton} onClick={fetchStrangerThingsQuotes}>
          <img className={styles.strangerThingsIcon} src={"/strangerThings.png"} alt="Stranger Things Logo" />
        </Button>
        <Button className={styles.serialButton} onClick={fetchGameofThronesQuotes}>
          <img className={styles.gameOfThronesIcon} src={"/gameOfThrones.png"} alt="Game Of Thrones Logo" />
        </Button>
      </div>

      <div className={styles.main}>
        <div>
          &quot;{quotes.map(quote => (quote.quote))}&quot;
        </div>
        <div className={styles.author}>
          {quotes.map(quote => ('- ' + quote.author))}
        </div>
        <IconButton className={styles.shuffleButton} onClick={showSerialQuotes} >
          <ShuffleIcon className={styles.shuffleIcon} />
        </IconButton>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' Maklore'}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
