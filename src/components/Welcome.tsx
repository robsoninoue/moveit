import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/Welcome.module.css';
import { EmailForm } from './EmailForm';
import { NameForm } from './NameForm';



export function Welcome() {

    const {isEmailFilled, isNameFilled} = useContext(UserContext)

    return (
        <div className={styles.welcomeContainer}>
            <h1>Bem vindo ao MoveIt!</h1>
            <h2>Acelere sua produtividade com a técnica Pomodoro!</h2>
            {isEmailFilled ? <EmailForm/> : isNameFilled && <NameForm/>}
        </div>
    )
}