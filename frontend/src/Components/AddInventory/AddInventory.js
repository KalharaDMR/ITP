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
    const { name, value } = e.target;
  
    // Prevent '@' character
    if (value.includes("@")) {
      return; // Stop updating if @ is found
    }
  
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
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
      <h1>Add New Inventory Item</h1>
      {errors.submit && <p className="error">{errors.submit}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Name</label>
          <input 
            type="text" 
            name="name" 
            value={inputs.name} 
            onChange={handleChange} 
            placeholder="Enter item name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input 
            type="number" 
            name="quantity" 
            value={inputs.quantity} 
            onChange={handleChange} 
            placeholder="Enter quantity"
          />
          {errors.quantity && <p className="error">{errors.quantity}</p>}
        </div>

        <div className="form-group">
          <label>Unit of Measurement</label>
          <input 
            type="text" 
            name="unit" 
            value={inputs.unit} 
            onChange={handleChange} 
            placeholder="e.g., kg, liters, pieces"
          />
          {errors.unit && <p className="error">{errors.unit}</p>}
        </div>

        <div className="form-group">
          <label>Price Per Unit (Rs)</label>
          <input 
            type="number" 
            name="pricePerUnit" 
            value={inputs.pricePerUnit} 
            onChange={handleChange} 
            placeholder="Enter price per unit"
            step="0.01"
          />
          {errors.pricePerUnit && <p className="error">{errors.pricePerUnit}</p>}
        </div>

        <div className="form-group">
          <label>Supplier</label>
          <input 
            type="text" 
            name="supplier"  
            value={inputs.supplier} 
            onChange={handleChange} 
            placeholder="Enter supplier name (optional)"
          />
        </div>

        <button type="submit">Add Inventory Item</button>
      </form>
    </div>
  );
}

export default AddInventory;