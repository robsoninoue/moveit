import styles from '../styles/components/Welcome.module.css';
import { EmailForm } from './EmailForm';
import { NameForm } from './nameForm';



export function Welcome() {

    return (
        <div className={styles.welcomeContainer}>
            <h1>Bem vindo ao MoveIt!</h1>
            <h2>Acelere sua produtividade com a técnica Pomodoro!</h2>
            <NameForm/>
            {/* <EmailForm/> */}
        </div>
    )
}