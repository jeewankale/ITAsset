import React, { Component } from "react";
import customStyles from "./../../assets/util/daatableStyle";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ButtonGroup,
} from "reactstrap";
import DataTable from "react-data-table-component";
import axios from "axios";

class brand extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.addBrand = this.addBrand.bind(this);
    this.modalType = "";
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      modal: false,
      primary: false,
      brandListing: [],
      name: "",
      description: "",
      id: "",
    };
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  togglePrimary() {
    this.modalType = "Add";
    this.setState({
      primary: !this.state.primary,
    });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }
  onChange = (e) => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value });
  };

  editBrand(props) {
    console.log("edit clicked", props.id);
    this.modalType = "Update";
    this.setState({
      name: props.name,
      description: props.description,
      id: props.id,
      primary: !this.state.primary,
    });
  }
  deleteBrand(props) {
    console.log("delete clicked", props.id);
    let url = process.env.REACT_APP_ASSET_SERVICE+"/brand/delete/" + props.id;
    axios
      .post(url)
      .then((result) => {
        console.log(result);
        window.location.reload(false);
      })
      .catch(console.log);
  }
  addBrand() {
    let myForm = document.getElementById("form");
    let formData = new FormData(myForm);
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    const config = {
      headers: { "content-type": "application/json" },
    };
    let url;
    if (this.modalType === "Add") {
      url = process.env.REACT_APP_ASSET_SERVICE+"/brand/add";
    } else {
      url = process.env.REACT_APP_ASSET_SERVICE+"/brand/update";
    }
    axios
      .post(url, json, config)
      .then((result) => {
        console.log(result);
      })
      .catch(console.log);
  }
  componentDidMount() {
    fetch(process.env.REACT_APP_ASSET_SERVICE+"/brand/findAll")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        this.setState({ brandListing: data.result });
        console.log(this.state.brandListing);
      })
      .catch(console.log);
  }
  render() {
    const columns = [
      {
        cell: (props) => (
          <ButtonGroup>
            <Button
              className="btn btn-warning"
              raised
              primary
              onClick={() => {
                this.editBrand(props);
              }}
            >
             <i className="fa fa-eye"></i>
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              className="btn btn-danger"
              raised
              primary
              onClick={() => {
                this.deleteBrand(props);
              }}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </ButtonGroup>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        name: "Actions",
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
      },
      {
        name: "Description",
        selector: "description",
        sortable: true,
      },
    ];

    return (
      <div className="animated fadeIn">
        <Button
          color="primary"
          onClick={this.togglePrimary}
          className="pull-right mr-1 mb-2"
        >
          Add <i className="fa fa-plus fa-sm"></i>
        </Button>
        <br></br>
        <Modal
          isOpen={this.state.primary}
          toggle={this.togglePrimary}
          className={"modal-primary modal-lg"}
        >
          <Form id="form" className="form-horizontal" onSubmit={this.addBrand}>
            <ModalHeader toggle={this.togglePrimary}>
              {this.modalType} Brand
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col xs="12" sm="12">
                  <Card>
                    <CardBody>
                      <Row>
                        <Col xs="12">
                          <FormGroup>
                            <Label htmlFor="name">
                              <b>Name</b>
                            </Label>
                            <Input
                              type="text"
                              id="name"
                              name="name"
                              value={this.state.name}
                              onChange={this.onChange}
                              placeholder="Please enter name"
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12">
                          <FormGroup>
                            <Label htmlFor="description">
                              <b>Description</b>
                            </Label>
                            <Input
                              type="text"
                              id="description"
                              name="description"
                              value={this.state.description}
                              onChange={this.onChange}
                              placeholder="Please enter Description"
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12">
                          <FormGroup>
                            <Input
                              type="hidden"
                              id="id"
                              name="id"
                              value={this.state.id}
                              onChange={this.onChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                {this.modalType}
              </Button>{" "}
              <Button color="secondary">Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>

        <DataTable
          title="Brand's"
          striped="true"
          highlightOnHover="true"
          pagination="true"
          columns={columns}
          data={this.state.brandListing}
          customStyles={customStyles}
          theme="solarized"
        />
      </div>
    );
  }
}

export default brand;
