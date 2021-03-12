import { useState } from 'react'
import styles from '../styles/pages/Home.module.css'


export default function About() {
    const [test,setTest] = useState()

    async function FetchData() {
    
        const data = await fetch('https://api.github.com/users/robsoninoue/repos')
        
        const viewData = await data.json()
        
        console.log(viewData[1])
        
        const view = viewData[0].id
        console.log('oi')

        setTest(view)
        
    }
    FetchData()



    return(
        <div className={styles.container}>
            <h1>Hello World!</h1>
            <span>About</span>
            {test}
        </div>
    )
}