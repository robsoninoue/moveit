import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/Welcome.module.css';
import { EmailForm } from './EmailForm';
import { Loading } from './Loading';
import { NameForm } from './NameForm';
import Head from 'next/head'


export function Welcome() {

    const {isEmailFilled, isNameFilled, isLoading} = useContext(UserContext)

    return (
        <div>
            <Head>
                <title>Welcome to Move.it by criei.online</title>
            </Head>
            <div className={styles.welcomeContainer}>
                <h1>Bem vindo ao MoveIt!</h1>
                <h2>Acelere sua produtividade com a técnica Pomodoro!</h2>
                {isEmailFilled ? <EmailForm/> : isNameFilled && <NameForm/>}
                {isLoading ? <Loading/>:<div></div>}
            </div>
        </div>
    )
}