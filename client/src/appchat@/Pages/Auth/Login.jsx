import React , {useState} from 'react'
import Login from '../../Components/Login'
const Log = () => {
    return(
        <>
            <div className="text-center pt-4">
                <a href="/Auth/reg" className="btn btn-primary">Đăng kí</a>
            </div>
            <Login/>
        </>
    )
}
export default React.memo(Log)