import React , {useState} from 'react'
import Login from '../Components/Login'
import Register from '../Components/Register'
const Auth = () => {
    const [state , setState] = useState(true)
    const changeState = () => {
        return state ? setState(false) : setState(true)
    }
    return(
        <>
            <div className="text-center pt-4">
                <button onClick={changeState} className="btn btn-primary">{state ? "Register" : "Login"}</button>
            </div>
            {state ? (<Login/>): (<Register/>)}
        </>
    )
}
export default React.memo(Auth)