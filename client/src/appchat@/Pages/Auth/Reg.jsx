import React , {useState} from 'react'
import Register from '../../Components/Register'
const Reg = () => {
    return(
        <>
            <div className="text-center pt-4">
                <a href="/Auth/login" className="btn btn-primary">Đăng nhập</a>
            </div>
            <Register/>
        </>
    )
}
export default React.memo(Reg)