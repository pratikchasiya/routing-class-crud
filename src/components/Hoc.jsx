import {Fragment} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export const Hoc = (Component) => {
  const NewHoc = (props) => {
    let formnavigate = useNavigate();
    let param = useParams();
    console.log(param);
    return (
      <Fragment>
        <div className="row ">
          <div className="col-2 sidebar">
            <h2>Sidebar</h2>
            <Link to="/form" className="formlink">
              Form
            </Link>
            <br />
            <Link to="/table" className="tablelink mt-4">
              Table
            </Link>
          </div>
          <div className="col-10">
            {/* CLASS COMPONENT MA HOOK USE NAI THY ATLE CLASS COMPONENT MA HOOK KARVI HOI TO AA RITE HOC THROUGH PROPS MOKLI USE KARI SAKAY */}
            <Component formnavigate={formnavigate} formparams={param} />
          </div>
        </div>
      </Fragment>
    );
  };
  return NewHoc;
};
