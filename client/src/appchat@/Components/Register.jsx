import React , {useState} from "react"
import Form from '../SubComponents/Form'
const Register = (props) => {
   
    return(
        <>
            <Form route={'auth/register'} stateForm={true} state={props.state} form="Dawng ki"></Form>
       </>
    )
}
export default React.memo(Register)