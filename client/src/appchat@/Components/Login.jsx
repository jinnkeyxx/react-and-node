import React , {useState} from "react"
import Form from './Form'
const Login = (props) => {
   
    return(
        <>
        <Form route={'auth/login'}  state={props.state} form="Dawng nhap"></Form>
       </>
    )
}
export default React.memo(Login)