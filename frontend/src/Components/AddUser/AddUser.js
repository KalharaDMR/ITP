import React,{useState} from 'react';
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router";
import axios from 'axios';
import './adduser.css';

function AddUser() {
    const history = useNavigate();
    const [formData, setFormData] = useState({

        type:"",       
        date:"",
        time:"",
        title:"",
        name1:"",
        name2:"",
        email:"",
        phone:"",
        message:"",

    });

    const handleChange = (e)=>{
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };
      


    const handleSubmit=(e)=>{
      e.preventDefault();
      console.log(formData);
     sendRequest().then(()=>history('/userdetails'));

    };


    const sendRequest = async()=>{
      await axios.post("http://localhost:5000/users",{
             type:String(formData.type),
             date:Date(formData.date),
             time:String(formData.time),
             title:String(formData.title),
             name1:String(formData.name1),
             name2:String(formData.name2),
             email:String(formData.email),
             phone:Number(formData.phone),
             message:String(formData.message),
             
            }).then(res => res.data);
          };
          






  return (
    <div>
        <Nav/>
      <h1>Book Treatment</h1>


      <form onSubmit={handleSubmit}>
        <div>
          <label>TREATMENT TYPE *</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">PLEASE SELECT</option>
            <option value="SIGNATURE MASSAGE">SIGNATURE MASSAGE</option>
            <option value="SENSES FACIAL TREATMENTS">SENSES FACIAL TREATMENTS</option>
            <option value="BODY MASSAGES">BODY MASSAGES</option>
            <option value="ORIENTAL MASSAGE">ORIENTAL MASSAGE</option>
            <option value="AYURVEDA MASSAGES">AYURVEDA MASSAGES</option>
            <option value="HOT STONE MASSAGE">HOT STONE MASSAGE</option>
            <option value="HYDROTHERAPY BATHS">HYDROTHERAPY BATHS</option>
            <option value="SILKY BODY SCRUBS">SILKY BODY SCRUBS</option>
            <option value="BODY TREATMENTS">BODY TREATMENTS</option>
            <option value="SPA PACKAGES">SPA PACKAGES</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>

        <div>
          <label>PREFERRED DATE *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>PREFERRED TIME *</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>TITLE *</label>
          <select name="title" value={formData.title} onChange={handleChange} required>
            <option value="">PLEASE SELECT</option>
            <option value="MR.">MR.</option>
            <option value="MRS.">MRS.</option>
            <option value="MISS.">MISS.</option>
            <option value="DR.">DR.</option>
            <option value="REV.">REV.</option>
          </select>
        </div>

        <div>
          <label>FIRST NAME *</label>
          <input
            type="text"
            name="name1"
            value={formData.name1}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>LAST NAME *</label>
          <input
            type="text"
            name="name2"
            value={formData.name2}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>EMAIL *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>PHONE *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>MESSAGE</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit">SUBMIT</button>
      </form>
                    


    </div>
  )
}

export default AddUser
