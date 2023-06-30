import React, { useContext } from 'react'
import Register from './register/Register'
import { UserContext } from './UserContext'

function Routes() {
    const{username,id} = useContext(UserContext)

    if(username){
        return 'logged in as ' + username 
    }


  return (
    <div><Register/></div>
  )
}

export default Routes