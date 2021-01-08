import React , {useState} from "react"
import {Container , Row , Col , Card} from 'react-bootstrap'
import * as api from '../Service/apiHelper'
import * as helper from '../Helper/Common'
import Alert from '../Components/Alert'
import Loading from '../Components/Loading'
const Login = () => {
    const [userValue , setUserValue] = useState('')
    const [passValue , setPassValue ] = useState('')
    const [emailValue , setEmailValue] = useState('')
    const [error , setErrorForm] = useState("")
    const [isLoading , setLoading] = useState(false)
    const [statusForm , setStatusForm] = useState("error")
    const [showAlert , setShowAlert] = useState(false)
    
    const changeInput = (event) => {
        const nameInput = event.target.name
        const value = event.target.value
        if(nameInput === "username") return setUserValue(value)
        if(nameInput === "passwork") return setPassValue(value)
        if(nameInput === "email") return setEmailValue(value)
    }
    const ConfirmAlert = () => {
      setShowAlert(false)
      if(statusForm === 'success'){
          window.location.reload()
      }
    }
    const submitForm = async (event) => {
        event.preventDefault()
        await setLoading(true)
        const data = await api.sendPostData('auth/login' ,{username : userValue , password: passValue , email : emailValue})
        if(!helper.isEmptyObj(data)){
            if(data.status === true){
                setLoading(false)
                setStatusForm("success")
                setErrorForm(data.messages)
                setShowAlert(true)
                api.saveToken(data.token)
            }
            else {
                setShowAlert(true)
                setLoading(false)
                setErrorForm(data.messages)
            }
            console.log(data);
        }
        else {
            await setLoading(false)
            await setErrorForm(data.messages)
        }
    }
    return(
        <Container className="container pt-5">
        {error !== "" && (<Alert show={showAlert} text={error} type={statusForm} Confirm={ConfirmAlert}/>)}
          <Row className="row pt-5">
            <Col md={8} sm={10}  className=" mr-auto ml-auto">
              <Card >
                <Card.Body className="card-body">
                  <Card.Text className="card-title text-center">Đăng nhập</Card.Text>
                  <hr />
                  <div className="form-group">
                    <label >Email:</label>
                    <input type="email" onChange={changeInput} className="form-control" name="email" value={userValue} placeholder="Nhập Email" />
                  </div>
                  <div className="form-group">
                    <label >Username or Email:</label>
                    <input type="text"  onChange={changeInput}   className="form-control" name="username" value={passValue} placeholder="Nhập tài khoản" />
                  </div>
                  <div className="form-group">
                    <label >Password:</label>
                    <input type="password"  onChange={changeInput}   className="form-control" name="passwork" value={emailValue} placeholder="Nhập mật khẩu" />
                  </div>
                  <div className="form-group">
                    <button type="button" onClick={submitForm} className="btn btn-primary btn-block" >
                      Đăng nhập
                    </button>
                  </div>
                </Card.Body>
                {isLoading && (<Loading/>)}
              </Card>
            </Col>
          </Row>
        </Container>
      
    )
}
export default React.memo(Login)