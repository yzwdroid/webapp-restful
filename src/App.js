import "./App.css";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import List from "./components/List";
import Edit from "./components/Edit";
import Add from "./components/Add";
import EditCategory from "./components/EditCategory";
import AddCategory from "./components/AddCategory";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<List />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/add" element={<Add />} />
          <Route path="/editCategory/:id" element={<EditCategory />} />
          <Route path="/addCategory" element={<AddCategory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
