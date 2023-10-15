import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import TableComponent from "./components/TableComponent";
import FormComponent from "./components/FormComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/form" />} />
          <Route path="/form" element={<FormComponent />}>
            <Route path=":formparams" />
          </Route>
          <Route path="/table" element={<TableComponent />}>
            <Route pata=":tableparams" /> {/* AA EK OBJECT CHE */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
