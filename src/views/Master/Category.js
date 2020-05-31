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
    };
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  togglePrimary() {
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
  editCategory=(name)=>{
    console.log("edit clicked",name);
  };
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
    axios
      .post("http://localhost:8030/category/add", json, config)
      .then((result) => {
        console.log(result);
      })
      .catch(console.log);
  }
  componentDidMount() {
    fetch("http://localhost:8030/category/findAll")
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
        cell: () => (
          <ButtonGroup>
            <Button
              class="btn btn-warning"
              raised
              primary
              onClick={this.editCategory(this.name)}
            >
              Edit
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              class="btn btn-warning"
              raised
              primary
              onClick={this.handleAction}
            >
              Delete
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
          className="pull-right mr-1"
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
            <ModalHeader toggle={this.togglePrimary}>Add Category</ModalHeader>
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
                              onChange={this.onChange}
                              id="description"
                            ></textarea>
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
                Add
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
