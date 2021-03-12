import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengesProvider } from "../contexts/ChallengeContext";
import { CountdownProvider } from "../contexts/CountdownContext";
import { UserProvider } from "../contexts/UserContext";
import styles from '../styles/pages/Home.module.css';

export default function Home(props) {
  // console.log(props)
  return (
    <UserProvider>
      <ChallengesProvider>
        <div className={styles.container}>

          <Head>
            <title>Inicio | App nextJS</title>
          </Head>
          <ExperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </ChallengesProvider>
    </UserProvider>
  )
}