import React from 'react'
import {FaLinkedin} from 'react-icons/fa'
import {FaGithubSquare} from 'react-icons/fa'

function Footer() {
    return(
        <div style={{
            display: 'inline-flex',
            flexDirection: 'column'
        }}>
            <div style={{fontSize: '12px', width: '80vw', alignSelf: 'center'}}>
                © 2020 MW-Stats. MW-Stats isn’t endorsed by Activision and doesn’t reflect the views or opinions of Activision or anyone officially involved in producing or managing Call of Duty: Modern Warfare. Call of Duty: Modern Warfare and Activision are trademarks or registered trademarks of Activision, Inc. Call of Duty © Activision, Inc.
            </div>
            <div style={{marginTop: '5px', fontSize: '30px'}}>
                <a style={{color: 'white'}} href="https://github.com/johnathan212"><FaGithubSquare/></a>
                <a style={{color: 'white'}} href="https://www.linkedin.com/in/johnathan-lee-050616191/"><FaLinkedin/></a>
            </div>
        </div>
    )
}

export default Footer