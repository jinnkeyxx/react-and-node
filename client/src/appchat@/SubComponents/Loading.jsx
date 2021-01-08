import React from 'react'
import '../Css/Loading.css'
const Loading = () => {
    return(
        <div id="loading">
        <div className="lds-facebook"><div></div><div></div><div></div></div>

        </div>
    )
}
export default React.memo(Loading)