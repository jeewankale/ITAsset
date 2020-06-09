import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import axios from "axios";
class organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      modal: false,
      primary: false,
      organizationListing: [],
      categoryListing:[],
      brandListing:[],
      name: "",
      type: "",
      category: "",
      invoiceNumber: "",
      purAmount: "",
      id: "",
      optionItems:"",
    };
    let initialcategory = [];
    fetch(process.env.REACT_APP_ASSET_SERVICE+"/category/findAllCategory")
        .then(response => {
            return response.json();
        }).then(data => {
          initialcategory = data.result.map((categoryListing) => {
            return categoryListing
        });
        console.log(initialcategory);
        this.setState({
          categoryListing: initialcategory,
      });
      console.log("mount function")
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
  addOrganization() {
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
      url = process.env.REACT_APP_ASSET_SERVICE + "/organization/add";
    } else {
      url = process.env.REACT_APP_ASSET_SERVICE + "/organization/update";
    }
    axios
      .post(url, json, config)
      .then((result) => {
        console.log(result);
      })
      .catch(console.log);
  }

  render() {
    let arrayOfData = this.state.categoryListing;
    let options = arrayOfData.map((data) =>
            <option 
                key={data}
                value={data}
            >
                {data}
            </option>
        );
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="12" lg="12">
            <Card className="">
              <Form action="" method="post">
                <CardHeader className="text-white  bg-primary">
                  <strong>Add Asset</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="4">
                      <FormGroup className="pr-1 mr-4">
                        <Label
                          htmlFor="exampleInputName2"
                          className="pr-1 mr-4"
                        >
                          <strong>Asset Name</strong>
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Enter Asset Name"
                          onChange={this.onChange}
                          value={this.state.name}
                          required
                        />
                      </FormGroup>
                      </Col>
                      <Col lg="4" sm="4" xs="4" md="4">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="type" className="pr-1 mr-4">
                          <strong>Type</strong>
                        </Label>
                        <Input
                          type="select"
                          onChange={this.onChange}
                          name="type"
                          id="type"
                          value={this.state.type}
                          required
                        >
                           <option value="">Please Select</option>
                          {/*<option value="Hardware">Hardware</option>
                          <option value="Software">Software</option>
                          <option value="NonIT">NonIT</option> */}
                          {options}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="category" className="pr-1 mr-4">
                          <strong>Category</strong>
                        </Label>
                        <Input
                          type="select"
                          onChange={this.onChange}
                          name="category"
                          id="category"
                          value={this.state.category}
                          required
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
                    <Col xs="4">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="invoiceNumber" className="pr-1 mr-4">
                          <strong>Invoice Number</strong>
                        </Label>
                        <Input
                          type="text"
                          id="invoiceNumber"
                          placeholder="Enter Invoice Number"
                          onChange={this.onChange}
                          value={this.state.invoiceNumber}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="purAmount" className="pr-1 mr-4">
                          <strong>Purchase Amount</strong>
                        </Label>
                        <Input
                          type="text"
                          id="purAmount"
                          placeholder="Enter Purchase Amount"
                          onChange={this.onChange}
                          value={this.state.purAmount}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>{" "}
                  <Button type="reset" color="secondary">
                    Reset
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default organization;
