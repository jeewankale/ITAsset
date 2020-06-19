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
class AssetEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      modal: false,
      primary: false,
      organizationListing: [],
      categoryListing: [],
      typeListing: [],
      brandListing: [],
      name: "",
      type: "",
      category: "",
      modelNumber: "",
      serialNumber: "",
      invoiceNumber: "",
      purchaseAmount: "",
      purchaseDate: "",
      expiryDate: "",
      vendor: "",
      purchaseDocument: null,
      description: "",
      isWarranty: false,
      booleanwarrantyCheck:"",
      warrantyYear:"",
      warrantyMonth:"",
      warranty: "d-none",
      id: "",
      optionItems: "",
      typeOptions: null,
      manufacturer: "",
      brandOptions: null,
    };
    this.onChange=this.onChange.bind(this);
    this.onFileChange=this.onFileChange.bind(this);
    let initialcategory = [];
    fetch(process.env.REACT_APP_ASSET_SERVICE + "/category/findAllCategory")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        initialcategory = data.result.map((typeListing) => {
          return typeListing;
        });
        console.log(initialcategory);
        this.setState({
          typeListing: initialcategory,
        });
        console.log("mount function");
      });
    fetch(process.env.REACT_APP_ASSET_SERVICE + "/brand/findAllBrand")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let brandOptions = data.result.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ));
        this.setState({
          brandOptions: brandOptions,
        });
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
  onFileChange=(e) =>{
    e.preventDefault();
    console.log(e.target.files[0]);
    this.setState({
      purchaseDocument:e.target.files[0]
      });
    
  };
  warrantyCheck = (e) => {
    console.log("..", e.target.value);
    this.setState({
      booleanwarrantyCheck: !this.state.booleanwarrantyCheck,
    });
    let checkbox = this.state.booleanwarrantyCheck;
    if (!checkbox) {
      console.log("true");
      this.setState({
        warranty: "",
      });
    } else {
      console.log("false");
      this.setState({
        warranty: "d-none",
      });
    }
  };
  fetchCategory = (e) => {
    console.log("fetch category" + e.target.value);
    let type = e.target.value;
    let url =
      process.env.REACT_APP_ASSET_SERVICE +
      "/category/findAllCategoryByType/" +
      type;
    axios
      .get(url)
      .then((result) => {
        console.log(result);
        let typeOptions = result.data.result.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ));
        this.setState({
          typeOptions: typeOptions,
        });
      })
      .catch(console.log);
  };
  addAsset = (event) => {
    let myForm = document.getElementById("form");
    let formData = new FormData(myForm);
    // var object = {};
    // formData.forEach((value, key) => {
    //   object[key] = value;
    // });
    // var json = JSON.stringify(object);
    // console.log(json);
    // event.preventDefault();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    let url = process.env.REACT_APP_ASSET_SERVICE + "/asset/add";
    console.log("URL:",url);
    axios
      .post(url, formData, config)
      .then((result) => {
        console.log(result);
      })
      .catch(console.log);
  };

  render() {
    let arrayOfData = this.state.typeListing;
    let options = arrayOfData.map((data) => (
      <option key={data} value={data}>
        {data}
      </option>
    ));
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="12" lg="12">
            <Card className="">
              <Form id="form" className="form-horizontal"  onSubmit={this.addAsset}>
                <CardHeader className="text-white  bg-primary">
                  <strong>Add Asset</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="type" className="pr-1 mr-4">
                          <strong>Type</strong>
                        </Label>
                        <Input
                          type="select"
                          onChange={this.onChange}
                          onInput={this.fetchCategory}
                          name="type"
                          id="type"
                          value={this.state.type}
                          required
                        >
                          <option value="">Please Select</option>
                          {options}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg="4" sm="12" xs="12" md="6">
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
                          {this.state.typeOptions}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="Manufacturer" className="pr-1 mr-4">
                          <strong>Manufacturer</strong>
                        </Label>
                        <Input
                          type="select"
                          onChange={this.onChange}
                          name="manufacturer"
                          id="manufacturer"
                          value={this.state.manufacturer}
                          required
                        >
                          <option value="">Please Select</option>
                          {this.state.brandOptions}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="name" className="pr-1 mr-4">
                          <strong>Asset Name</strong>
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter Asset Name"
                          onChange={this.onChange}
                          value={this.state.name}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="modelNumber" className="pr-1 mr-4">
                          <strong>Model Number</strong>
                        </Label>
                        <Input
                          type="text"
                          id="modelNumber"
                          name="modelNumber"
                          placeholder="Enter Model Number"
                          onChange={this.onChange}
                          value={this.state.modelNumber}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="serialNumber" className="pr-1 mr-4">
                          <strong>Serial Number</strong>
                        </Label>
                        <Input
                          type="text"
                          id="serialNumber"
                          name="serialNumber"
                          placeholder="Enter Serial Number"
                          onChange={this.onChange}
                          value={this.state.serialNumber}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="invoiceNumber" className="pr-1 mr-4">
                          <strong>Invoice Number</strong>
                        </Label>
                        <Input
                          type="text"
                          id="invoiceNumber"
                          name="invoiceNumber"
                          placeholder="Enter Invoice Number"
                          onChange={this.onChange}
                          value={this.state.invoiceNumber}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="purchaseAmount" className="pr-1 mr-4">
                          <strong>Purchase Amount</strong>
                        </Label>
                        <Input
                          type="text"
                          id="purchaseAmount"
                          name="purchaseAmount"
                          placeholder="Enter Purchase Amount"
                          onChange={this.onChange}
                          value={this.state.purchaseAmount}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="purchaseDate">
                          <strong>Purchase Date</strong>
                        </Label>
                        <Input
                          type="date"
                          id="purchaseDate"
                          name="purchaseDate"
                          pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])/(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])/(?:30))|(?:(?:0\[13578\]|1\[02\])-31))"
                          placeholder="Select Purchase Date"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="expiryDate">
                          <strong>Expiry Date</strong>
                        </Label>
                        <Input
                          type="date"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="Select Expiry Date"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="vendor" className="pr-1 mr-4">
                          <strong>Vendor Name</strong>
                        </Label>
                        <Input
                          type="text"
                          id="vendor"
                          name="vendor"
                          placeholder="Enter Vendor Name"
                          onChange={this.onChange}
                          value={this.state.vendor}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="purchaseDocument" className="pr-1 mr-4">
                          <strong>Purchase Document</strong>
                        </Label>
                        <Input
                          type="file"
                          id="purchaseDocument"
                          name="purchaseDocument"
                          placeholder="Select Purchase Document"
                          onChange={this.onFileChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6" sm="12" xs="12" md="6">
                      <FormGroup>
                        <Label htmlFor="description">
                          <b>Note/Description</b>
                        </Label>
                        <Input
                          type="textarea"
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
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="warrantyCheck" className="pr-1 mr-4">
                          <strong>Is Warranty</strong>
                        </Label>
                        <Input
                          type="checkbox"
                          id="isWarranty"
                          name="warrantyCheck"
                          checked={this.state.booleanwarrantyCheck}
                          onChange={this.onChange}
                          onInput={this.warrantyCheck}
                          value={this.state.booleanwarrantyCheck}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className={this.state.warranty}>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="warrantyYear" className="pr-1 mr-4">
                          <strong>Warranty Years</strong>
                        </Label>
                        <Input
                          type="select"
                          onChange={this.onChange}
                          name="warrantyYear"
                          id="warrantyYear"
                          value={this.state.warrantyYear}
                        >
                          <option value="">Please Select</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="warrantyMonth" className="pr-1 mr-4">
                          <strong>Warranty Years</strong>
                        </Label>
                        <Input
                          type="select"
                          onChange={this.onChange}
                          name="warrantyMonth"
                          id="warrantyMonth"
                          value={this.state.warrantyMonth}
                        >
                          <option value="">Please Select</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </Input>
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

export default AssetEntry;
