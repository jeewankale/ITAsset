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
//import MultipleValueTextInput from "react-multivalue-text-input";
import { WithContext } from 'react-tag-input';
 
const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];
class AddSoftware extends Component {
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
      category: "",
      edition: "",
      version: "",
      licenseType: "",
      licence: [],
      tags: [],
      purchaseAmount: "",
      purchaseDate: "",
      expiryDate: "",
      vendor: "",
      licenseCount: "",
      description: "",
      isWarranty: false,
      booleanwarrantyCheck: "",
      warrantyYear: "",
      warrantyMonth: "",
      isLicence: "d-none",
      isLicenceKey:"d-none",
      id: "",
      optionItems: "",
      typeOptions: null,
      manufacturer: "",
      brandOptions: null,
    };
    this.onChange = this.onChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    let type = "Software";
    let url =
      process.env.REACT_APP_ASSET_SERVICE +
      "/category/findAllCategoryByType/" +
      type;
    axios.get(url).then((result) => {
      console.log(result);
      let typeOptions = result.data.result.map((data) => (
        <option key={data} value={data}>
          {data}
        </option>
      ));
      this.setState({
        typeOptions: typeOptions,
      });
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
//   handleDelete(i) {
//     const { licence } = this.state;
//     this.setState({
//       licence: licence.filter((tag, index) => index !== i),
//     });
//     console.log(this.state.licence);
// }

// handleAddition(tag) {
//   console.log(tag.text)
//     this.setState(state => ({ licence: [...state.licence, tag] }));
//     console.log(this.state.licence);
// }
// handleDrag(tag, currPos, newPos) {
//   const licence = [...this.state.licence];
//   const newlicenseKey = licence.slice();

//   newlicenseKey.splice(currPos, 1);
//   newlicenseKey.splice(newPos, 0, tag);

//   // re-render
//   this.setState({ licence: newlicenseKey });
// }
handleDelete(i,e) {
  const { tags } = this.state;
  this.setState({
   tags: tags.filter((tag, index) => index !== i),
  });
   console.log('tags:=',this.state.tags);
   this.setState({ [e.target.name]: e.target.value });
}

handleAddition(tag,e) {
  
  this.setState({ tags: [...this.state.tags, tag] });
  console.log('tags:=',this.state.tags);
  
}

handleDrag(tag, currPos, newPos) {
  const tags = [...this.state.tags];
  const newTags = tags.slice();

  newTags.splice(currPos, 1);
  newTags.splice(newPos, 0, tag);

  // re-render
  this.setState({ tags: newTags });
}
  changeLicenceType = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    let checkbox = e.target.value;
    if(checkbox==="")
    {
      this.setState({
        isLicenceKey: "d-none",
        isLicence: "d-none",
      });
    }
    else if (checkbox==="free") {
      this.setState({
        isLicence: "d-none",
      });
    } else if(checkbox==="trial") {
      this.setState({
        isLicenceKey: "d-none",
        isLicence: "",
      });
    }
    else{
      this.setState({
        isLicence: "",
        isLicenceKey: "",
      })
    }
  };

  addSoftware = (event) => {
    let myForm = document.getElementById("form");
    console.log(myForm);
    let formData = new FormData(myForm);
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log(json)
    event.preventDefault();
  //   const config = {
  //     headers: { "content-type": "application/json" },
  //   };
  //   let url = process.env.REACT_APP_ASSET_SERVICE + "/software/add";
  //   console.log("URL:", url);
  //   axios
  //     .post(url, json,config)
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch(console.log);
   };

  render() {
    const { tags } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="12" lg="12">
            <Card className="">
              <Form
                id="form"
                className="form-horizontal"
                onSubmit={this.addSoftware}
              >
                <CardHeader className="text-white  bg-primary">
                  <strong>Add Software</strong>
                </CardHeader>
                <CardBody>
                  <Row>
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
                          <strong>Vendor</strong>
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
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="name" className="pr-1 mr-4">
                          <strong>Software Name</strong>
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter Software Name"
                          onChange={this.onChange}
                          value={this.state.name}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="edition" className="pr-1 mr-4">
                          <strong>Edition</strong>
                        </Label>
                        <Input
                          type="text"
                          id="edition"
                          name="edition"
                          placeholder="Enter Edition"
                          onChange={this.onChange}
                          value={this.state.edition}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="version" className="pr-1 mr-4">
                          <strong>Version</strong>
                        </Label>
                        <Input
                          type="text"
                          id="version"
                          name="version"
                          placeholder="Enter Version"
                          onChange={this.onChange}
                          value={this.state.version}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" sm="12" xs="12" md="6">
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="licenseType" className="pr-1 mr-4">
                          <strong>License Type</strong>
                        </Label>
                        <Input
                          type="select"
                          id="licenseType"
                          name="licenseType"
                          onChange={this.onChange}
                          onInput={this.changeLicenceType}
                          value={this.state.licenseType}
                          required
                        >
                          <option value="">Please select</option>
                          <option value="paid">Paid</option>
                          <option value="free">Free</option>
                          <option value="trial">Trial</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className={this.state.isLicence}>
                  <Col lg="4" sm="12" xs="12" md="6" className={this.state.isLicenceKey}>
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="licenseCount" className="pr-1 mr-4">
                          <strong>License Count</strong>
                        </Label>
                        <Input
                          type="text"
                          id="licenseCount"
                          name="licenseCount"
                          placeholder="Enter License Count"
                          onChange={this.onChange}
                          value={this.state.licenseCount}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4" sm="12" xs="12" md="6" className={this.state.isLicenceKey}>
                      <FormGroup className="pr-1 mr-4">
                        <Label htmlFor="tags" className="pr-1 mr-4">
                          <strong>Licence Keys</strong>
                        </Label>
                        <WithContext tags={tags}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                    placeholder="Enter License Keys"
                    name="tags"
                    id="tags"
                    ref="tags"
                    value={tags}
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
                    
                  </Row>
                  <Row>
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

export default AddSoftware;
