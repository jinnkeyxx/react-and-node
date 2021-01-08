import React , {useState} from "react"
import Form from '../SubComponents/Form'
const Login = (props) => {
    return(
        <>
          <Form route={'auth/login'}  form="Dawng nhap"></Form>
        </>
    )
}
export default React.memo(Login)