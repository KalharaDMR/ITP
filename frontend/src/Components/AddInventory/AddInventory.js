import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddInventory.css";

function AddInventory() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    quantity: "",
    unit: "",
    pricePerUnit: "",
    supplier: "",
  });

  const [errors,setErrors]=useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm=()=>{
    const newErrors={};

    if(!inputs.name){
      newErrors.name="Name is required.";
    }else if(inputs.name.length<2){
      newErrors.name="Name must be at least 2 characters.";
    }

    if(!inputs.quantity){
      newErrors.quantity="Quantity is required.";
    }else if(isNaN(inputs.quantity)||inputs.quantity<=0){
      newErrors.quantity="Quantity must be a positive number.";
    }

    if(!inputs.pricePerUnit){
      newErrors.pricePerUnit="Price is required.";
    }else if (isNaN(inputs.pricePerUnit)||inputs.pricePerUnit<=0){
      newErrors.pricePerUnit="Price must be a positive number.";
    }

    if(!inputs.unit){
      newErrors.unit="Unit is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length===0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()){
      return;
    }
    await axios.post("http://localhost:5000/inventory", inputs);
    history("/inventory");
  };

  return (
    <div className="add-inventory-container">
      <h1>Add Inventory Item</h1>
      {errors.submit && <p className="error">{errors.submit}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={inputs.name} onChange={handleChange} required />
        {errors.name && <p className="error">{errors.name}</p>}
        <label>Quantity</label>
        <input type="number" name="quantity" value={inputs.quantity} onChange={handleChange} required />
        {errors.quantity && <p className="error">{errors.quantity}</p>}
        <label>Unit</label>
        <input type="text" name="unit" value={inputs.unit} onChange={handleChange} required />
        {errors.unit && <p className="error">{errors.unit}</p>}
        <label>Price Per Unit</label>
        <input type="number" name="pricePerUnit" value={inputs.pricePerUnit} onChange={handleChange} required />
        {errors.pricePerUnit && <p className="error">{errors.pricePerUnit}</p>}
        <label>Supplier</label>
        <input type="text" name="supplier"  value={inputs.supplier} onChange={handleChange} />
        <button type="submit">ADD</button>
      </form>
    </div>
  );
}

export default AddInventory;