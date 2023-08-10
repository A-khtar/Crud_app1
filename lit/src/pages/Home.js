import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import Axios from "axios";
import {toast} from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);
  const loadData = async() => {
    const response = await Axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();

  },[]);
  const deletecontact = (id) => {
    if(window.confirm("Are you sure?")) {
        Axios.delete(`http://localhost:5000/api/remove/${id}`);
        toast.success("contact deleted successfully");
        setTimeout(() => loadData(),500);
    }
  };
  return (
    <div style={{marginTop:"150px"}}>
        <Link to = "/addContact">
            <button className = "btn btn-contact">Add Contact</button>
        </Link>
        <table className ="styled-tabled">
            <thead>
                <tr>
                    <th style = {{textAlign: "Center"}}>No</th>
                    <th style = {{textAlign: "Center"}}>Name</th>
                    <th style = {{textAlign: "Center"}}>Email</th>
                    <th style = {{textAlign: "Center"}}>Contact</th>
                    <th style = {{textAlign: "Center"}}>Magics</th>
                </tr>
            </thead>
            <tbody>
  {data.map((item, index) => (
    <tr key={item.id}>
      <th scope="row">{index + 1}</th>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.contact}</td>
      <td>
        <Link to={`/update/${item.id}`}>
          <button className="btn btn-edit">Edit</button>
        </Link>
        <button
          className="btn-btn-delete"
          onClick={() => deletecontact(item.id)} // Corrected syntax
        >
          Delete
        </button>
        <Link to={`/view/${item.id}`}>
          <button className="btn-btn-view">View</button>
        </Link>
      </td>
    </tr>
  ))}
</tbody>
        </table>
        <h2 className='abc'>Welcome to the Home Page</h2>
    </div>
  );
};

export default Home; 