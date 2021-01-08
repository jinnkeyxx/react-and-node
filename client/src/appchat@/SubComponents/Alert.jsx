import React from 'react'
import SweetAlert from 'sweetalert-react'
import 'sweetalert/dist/sweetalert.css';
const Alert = (props) => {
    return(
        <div>
             <SweetAlert
                show={props.show}
                title="Thong Bao"
                text={props.text}
                type={props.type}
                onConfirm={props.Confirm}
            />
        </div>

    )
}
export default React.memo(Alert)