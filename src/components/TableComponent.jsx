import React, {Component, Fragment} from "react";
import {Link, Outlet} from "react-router-dom";
import {Table} from "reactstrap";
import axios from "axios";
import {Hoc} from "./Hoc";

class TableComponent extends Component {
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
    console.log(this.props);
  }

  //   useEffect(() => {
  //     console.log("useEffect");
  //     getApiData();
  //   }, []);

  editData = (id) => {
    axios
      .get(
        "https://student-api.mycodelibraries.com/api/user/get-user-by-id?id=" +
          id
      )
      .then((res) => {
        this.props.formnavigate("/form/" + id);
        console.log(res.data.data);
        res.data.data.hobbies = res.data.data.hobbies.split(",");
        this.setState({obj: {...res.data.data}});
        // setobj({...res.data.data});
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
        <Outlet />
        <div className="text-center fw-bold fs-5 p-3">TableComponent</div>

        <Table>
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Profile</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Gender</th>
              <th>Hobbies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.array?.map((x, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <img src={x.image} alt="" height={40} width={40} />
                  </td>
                  <td>{x.firstName}</td>
                  <td>{x.lastName}</td>
                  <td>{x.age}</td>
                  <td>{x.city}</td>
                  <td>{x.gender}</td>
                  <td>{x.hobbies}</td>
                  <td>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => this.editData(x._id)}
                    >
                      EDIT
                    </button>

                    <button
                      className="btn btn-danger me-2"
                      onClick={() => this.deleteData(x._id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}
export default Hoc(TableComponent);
