import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { Base64 } from "js-base64";
import AuthService from "./../../../service/auth.service";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      modal: false,
      primary: false,
      username: "",
      password: "",
      plainpassword: "",
      message: "",
    };
  }
  onChange = (e) => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value });
  };
  login = (event) => {
    event.preventDefault();
    var encode = Base64.encode(this.state.plainpassword);
    console.log("encode:=", encode);
    this.setState({ password: Base64.encode(this.state.plainpassword) });
    console.log("encrypt password:=", this.state.password);
    let formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", Base64.encode(this.state.plainpassword));
    console.log("formdata:", formData);
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log(json);

    AuthService.login(json).then(
      () => {
        this.props.history.push("/dashboard");
        window.location.reload();
      },
      (error) => {
        console.log("authentication failed");
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage,
        });
      }
    );
  };
  encryptPassword = () => {
    var encode = Base64.encode(this.state.plainpassword);
    console.log("encode:=", encode);
    this.setState({ password: encode });
    console.log("encrypt password:=", this.state.password);
  };
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.login}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          id="username"
                          name="username"
                          onChange={this.onChange}
                          placeholder="Username"
                          autoComplete="username"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          id="plainpassword"
                          name="plainpassword"
                          onChange={this.onChange}
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </InputGroup>
                      {/* <InputGroup>
                        <Input type="hidden" id="password" name="password" />
                      </InputGroup> */}
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            type="submit"
                            className="px-4"
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                    <Row>
                        <Col>
                          {this.state.message && (
                            <div className="form-group">
                              <div className="alert alert-danger" role="alert">
                                {this.state.message}
                              </div>
                            </div>
                          )}
                        </Col>
                      </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
