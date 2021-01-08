import React , {useState , useEffect} from 'react'
import {Container , Row , Col , Card} from 'react-bootstrap'
import Alert from './Alert'
import * as api from '../Service/apiHelper'
import * as helper from '../Helper/Common'
import Loading from './Loading'
import AOS from 'aos'
import 'aos/dist/aos.css'
const Form = (props) => {
    const [showAlert , setShowAlert] = useState(false)
    const [isLoading , setLoading] = useState(false)
    const [userValue , setUserValue] = useState('')
    const [passValue , setPassValue ] = useState('')
    const [emailValue , setEmailValue ] = useState('')
    const [statusForm , setStatusForm] = useState("")
    const [error , setErrorForm] = useState("")
    const [success , setSuccesForm] = useState("")
    
    const ConfirmAlert = () => {
        setShowAlert(false)
        if(statusForm === 'success'){
            window.location.reload()
        }
    }
      const changeInput = (event) => {
        const nameInput = event.target.name
        const value = event.target.value
        if(nameInput === "username") return setUserValue(value)
        if(nameInput === "password") return setPassValue(value)
        if(nameInput === "email") return setEmailValue(value)
    }
    const submitForm = async (event) => {
        event.preventDefault()
        await setLoading(true)
        const data = await api.sendPostData(props.route ,{username : userValue , password: passValue , email : emailValue})
        if(!helper.isEmptyObj(data)){
            if(data.status === true){
                setLoading(false)
                setStatusForm("success")
                setErrorForm(data.message)
                setShowAlert(true)
                api.saveToken(data.token)
            }
            else {
                setStatusForm("error")
                setShowAlert(true)
                setLoading(false)
                setErrorForm(data.message)
            }
            console.log(data);
        }
        else {
            await setLoading(false)
            await setErrorForm(data.message)
        }
    }
 
    useEffect(() => {
        AOS.init({duration : 2000});
    }, [])
    return(
    <Container className="container pt-5">
        
        {error !== "" && (<Alert show={showAlert} text={error} type={statusForm} Confirm={ConfirmAlert}/>)}
        
          <Row className="row pt-5">
            <Col md={8} sm={10}  className=" mr-auto ml-auto">
              <Card data-aos="fade-right">
                <Card.Body className="card-body">
                  <Card.Text className="card-title text-center">{props.form}</Card.Text>
                  <hr />
                  {props.stateForm && (<div className="form-group">
                    <label > Email:</label>
                    <input type="text" onChange={changeInput} className="form-control" name="email" value={emailValue} placeholder="Nhập tài khoản" />
                  </div>)}
                  
                  <div className="form-group">
                    <label >Username or Email:</label>
                    <input type="text"  onChange={changeInput}   className="form-control" name="username" value={userValue} placeholder="Nhập tài khoản" />
                  </div>
                  <div className="form-group">
                    <label >Password:</label>
                    <input type="password"  onChange={changeInput}   className="form-control" name="password" value={passValue} placeholder="Nhập mật khẩu" />
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
export default React.memo(Form)