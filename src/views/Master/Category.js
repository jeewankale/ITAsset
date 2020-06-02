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

class category extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.modalType = "";
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      modal: false,
      primary: false,
      categoryListing: [],
      type: "",
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
  editCategory(props) {
    console.log("edit clicked", props.id);
    this.modalType = "Update";
    this.setState({
      name: props.name,
      description: props.description,
      type: props.type,
      id: props.id,
      primary: !this.state.primary,
    });
  }
  deleteCategory(props) {
    console.log("delete clicked", props.id);
    let url = process.env.REACT_APP_ASSET_SERVICE+"/category/delete/" + props.id;
    axios
      .post(url)
      .then((result) => {
        console.log(result);
        window.location.reload(false);
      })
      .catch(console.log);
  }
  addCategory() {
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
    console.log("add button clicked" + this.state.name);
    let url;
    if (this.modalType === "Add") {
      url = process.env.REACT_APP_ASSET_SERVICE+"/category/add";
    } else {
      url = process.env.REACT_APP_ASSET_SERVICE+"/category/update";
    }
    axios
      .post(url, json, config)
      .then((result) => {
        console.log(result);
        window.location.reload(false);
      })
      .catch(console.log);
  }
  componentDidMount() {
    fetch(process.env.REACT_APP_ASSET_SERVICE+"/category/findAll")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        this.setState({ categoryListing: data.result });
        console.log(this.state.categoryListing);
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
              primary="true"
              onClick={() => {
                this.editCategory(props);
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
                this.deleteCategory(props);
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
        name: "Type",
        selector: "type",
        sortable: true,
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
        right: true,
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
          <Form
            id="form"
            className="form-horizontal"
            onSubmit={this.addCategory}
          >
            <ModalHeader toggle={this.togglePrimary}>
              {this.modalType} Category
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col xs="12" sm="12">
                  <Card>
                    <CardBody>
                      <Row>
                        <Col xs="12">
                          <FormGroup>
                            <Label htmlFor="type">
                              <b>Type</b>
                            </Label>
                            <Input
                              type="select"
                              onChange={this.onChange}
                              name="type"
                              id="type"
                              value={this.state.type}
                            >
                              <option value="">Please Select</option>
                              <option value="Hardware">Hardware</option>
                              <option value="Software">Software</option>
                              <option value="NonIT">NonIT</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
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
                            <br></br>
                            <textarea
                              type="select"
                              name="description"
                              value={this.state.description}
                              onChange={this.onChange}
                              id="description"
                            ></textarea>
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
          id="catgoryTable"
          title="Category's"
          striped="true"
          highlightOnHover="true"
          pagination="true"
          columns={columns}
          data={this.state.categoryListing}
          customStyles={customStyles}
          theme="solarized"
        />
      </div>
    );
  }
}

export default category;
