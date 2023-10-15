import React, {Component, Fragment} from "react";
import {Row, Form, Col, FormGroup, Label, Input, Button} from "reactstrap";
import axios from "axios";
import {Hoc} from "./Hoc";

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      obj: {
        hobbies: [],
        firstName: "",
        lastName: "",
        gender: "",
        city: "",
        age: "",
      },
      blankObj: {},
      reference : ''
    };
  }

  getApiData = () => {
    axios
      .get("https://student-api.mycodelibraries.com/api/user/get")
      .then((res) => {
        // console.log(res.data.data);
        this.setState({array: [...res.data.data]});
        // setarray([...res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getApiData();
    if (this.props.formparams.formparams) {
      this.editData(this.props.formparams.formparams);
    }
    console.log(this.props.formparams.formparams);
  }

  getData = (e) => {
    if (e.target.name == "hobbies") {
      if (e.target.checked) {
        this.state.obj.hobbies.push(e.target.value);
      } else {
        this.state.obj.hobbies = this.state.obj.hobbies.filter(
          (x) => x != e.target.value
        );
      }
      this.state.blankObj.hobbies = [];
    } else if (e.target.name == "userImage") {
      this.state.reference = e.target.value;
      this.state.obj[e.target.name] = e.target.files[0];
    } else {
      this.state.obj[e.target.name] = e.target.value;

      this.state.blankObj[e.target.name] = "";
    }
    this.setState({obj: {...this.state.obj}});
    // setobj({...this.state.obj});
    // setblankObj({...blankObj});
    this.setState({blankObj: {...this.state.blankObj}});
  };

  save = () => {
    let formData = new FormData();

    formData.append("firstName", this.state.obj.firstName);
    formData.append("lastName", this.state.obj.lastName);
    formData.append("hobbies", this.state.obj.hobbies);
    formData.append("gender", this.state.obj.gender);
    formData.append("city", this.state.obj.city);
    formData.append("age", this.state.obj.age);
    formData.append("userImage", this.state.obj.userImage);

    if (this.state.obj._id == undefined) {
      /* AHI OBJ NI JAGYA A FORMDATA NAKHYU KM K HVE BDHI VALUE FORMDATA MA HSE */
      axios
        .post("https://student-api.mycodelibraries.com/api/user/add", formData)
        .then((res) => {
          console.log(res);
          this.getApiData();
          // this.props.formnavigate('/table')
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      /* AHI PM OBJ.ID = OBJ_ID NI JAGYA ANE PN FORM DATA MA APPEND KARAVI DEVANU */
      // obj.id = obj._id;

      formData.append("id", this.state.obj._id);

      axios
        .post(
          "https://student-api.mycodelibraries.com/api/user/update",
          formData
        )
        .then((res) => {
          console.log(res);
          this.getApiData();
          // this.props.formnavigate('/table')
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.setState({obj: {...this.state.blankObj}});
    this.props.formnavigate("/table");
    // setobj({...blankObj});
  };

  editData = (id) => {
    // console.log(id);
    axios
      .get(
        "https://student-api.mycodelibraries.com/api/user/get-user-by-id?id=" +
          id
      )
      .then((res) => {
        console.log(res.data.data);
        res.data.data.hobbies = res.data.data.hobbies.split(",");
        // setobj({...res.data.data});
        this.setState({obj: {...res.data.data}});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteData = (id) => {
    axios
      .delete(
        "https://student-api.mycodelibraries.com/api/user/delete?id=" + id
      )
      .then((res) => {
        console.log(res);
        this.getApiData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Fragment>
        <div className="text-center fw-bold fs-5 p-3">Form Component</div>

        <Form className="container form shadow-sm form">
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="firstName" className="fw-bold">
                  First Name :
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Enter First Name"
                  type="text"
                  value={this.state.obj.firstName || ""}
                  onChange={this.getData}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="lastName" className="fw-bold">
                  Last Name :
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Last Name"
                  type="text"
                  value={this.state.obj.lastName || ""}
                  onChange={this.getData}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="age" className="fw-bold">
                  Age :
                </Label>
                <Input
                  id="age"
                  name="age"
                  placeholder="Enter Age"
                  type="number"
                  value={this.state.obj.age || ""}
                  onChange={this.getData}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="city" className="fw-bold">
                  City :
                </Label>
                <select
                  name="city"
                  id=""
                  className="from-group d-block w-100 form-select"
                  onChange={this.getData}
                >
                  <option value="Surat">Surat</option>
                  <option value="Vadodara">Vadodara</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                </select>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="" className="me-2 fw-bold">
                  Gender :
                </Label>
                <Input
                  id=""
                  name="gender"
                  value="Male"
                  type="radio"
                  className="form-group me-2"
                  checked={this.state.obj.gender === "Male"}
                  onChange={this.getData}
                />
                Male
                <Input
                  id=""
                  name="gender"
                  value="Female"
                  type="radio"
                  className="me-2 ms-2"
                  checked={this.state.obj.gender === "Female"}
                  onChange={this.getData}
                />
                Female
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="" className="me-2 fw-bold">
                  Hobbies :
                </Label>
                <Input
                  id=""
                  name="hobbies"
                  value="Cricket"
                  type="checkbox"
                  className="form-group me-2"
                  checked={this.state.obj.hobbies?.includes("Cricket")}
                  onChange={this.getData}
                />
                Cricket
                <Input
                  id=""
                  name="hobbies"
                  value="Football"
                  type="checkbox"
                  className="form-group me-2 ms-2"
                  checked={this.state.obj.hobbies?.includes("Football")}
                  onChange={this.getData}
                />
                Football
                <Input
                  id=""
                  name="hobbies"
                  value="Music"
                  type="checkbox"
                  className="form-group me-2 ms-2"
                  checked={this.state.obj.hobbies?.includes("Music")}
                  onChange={this.getData}
                />
                Music
                <Input
                  id=""
                  name="hobbies"
                  value="Travelling"
                  type="checkbox"
                  className="form-group me-2 ms-2"
                  checked={this.state.obj.hobbies?.includes("Travelling")}
                  onChange={this.getData}
                />
                Travelling
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="profile" className="fw-bold">
                  Profile :
                </Label>
              {/* {  console.log(this.state.obj.userImage )} */}
                <Input
                  id="profile"
                  name="userImage"
                  placeholder="Enter profile"
                  type="file"
                  value={this.state.reference || ""}
                  onChange={this.getData}
                />
                
              </FormGroup>
            </Col>
          </Row>

          <Button onClick={this.save}>Save</Button>
        </Form>
      </Fragment>
    );
  }
}
export default Hoc(FormComponent);
