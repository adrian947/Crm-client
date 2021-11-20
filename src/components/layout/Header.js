import React, {useContext} from 'react'
import { AuthcontextUser } from '../../context/authContext'
import { useApolloClient } from "@apollo/client";
import { useHistory } from 'react-router';

const Header = () => {
    const {auth, logOut} = useContext(AuthcontextUser)
    const history = useHistory();

    // console.log('header', auth )
    const client = useApolloClient();
   
    const logOutbutton = ()=>{
        client.clearStore()
        history.push('/')
        logOut();

    }



    return (
        <div className='header'>
            <p className='header__title'>{`Welcome: ${auth.name}`}</p>
            <button className='header__button' onClick={logOutbutton}>Log Out</button>
        </div>
    )
}

export default Header
