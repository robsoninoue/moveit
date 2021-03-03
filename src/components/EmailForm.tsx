import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import styles from '../styles/components/EmailForm.module.css'

export function EmailForm() {

    const {userEmail, storeEmail} = useContext(UserContext)

    const registerEmail = event => {
        event.preventDefault()
        storeEmail(event.target.email.value)
    }

    return (
        <form className={styles.emailForm} onSubmit={registerEmail}>
            <label htmlFor="email">Qual o seu e-mail?</label>
            <div>
                <input type="email" name="email" id="email" required/>
                <button type="submit"><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
            </div>
        </form>
    )
}