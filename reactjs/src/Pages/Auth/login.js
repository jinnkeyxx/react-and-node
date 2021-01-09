import React, { Component } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../store/actions/auth";
import "./style.css";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.changeForm = this.changeForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  changeForm(event) {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  }
  submitForm(event) {
    event.preventDefault();
    this.props.loginUser(this.state);
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.user.isAuthenticated && nextProps.errors && nextProps.errors.loginError){
      alert(nextProps.errors.loginError);
    }
  }
  render() {
    return (
      <div id="authPage">
        <Container className="pt-5">
          <Row>
            <Col md="4" sm="10" className="mr-auto ml-auto">
              <div>
                <center>
                  <img
                    className="authPage__logo img"
                    src="/assets/img/logo.svg"
                    alt="Logo"
                  />
                </center>
              </div>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">
                    Đăng nhập tài khoản
                  </Card.Title>
                  <Form className="pt-2" onSubmit={this.submitForm}>
                    <Form.Group controlId="username">
                      <Form.Control
                        className="inputAuth"
                        type="text"
                        name="username"
                        placeholder="Tài khoản hoặc email"
                        onChange={this.changeForm}
                        value={this.state.username}
                      />
                    </Form.Group>

                    <Form.Group controlId="password">
                      <Form.Control
                        className="inputAuth"
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        onChange={this.changeForm}
                        value={this.state.password}
                      />
                    </Form.Group>

                    <Button variant="primary" size="lg" type="submit" block>
                      Đăng nhập
                    </Button>
                  </Form>
                  <div className="pt-2 text-center">
                    <Link to="/auth/forgot-password">Quên tài khoản?</Link>
                  </div>
                  <div className="pt-2 text-center">
                    <span>Hoặc</span>
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/auth/register"
                      className="btn btn-success btn-block btn-lg"
                    >
                      Đăng kí tài khoản
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="pt-5"></div>
      </div>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
