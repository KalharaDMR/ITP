import React from 'react'


function User(props) {
  const {_id,type,date,time,title,name1,name2,email,phone,message} = props.user; //inpit to Backend details 

  return (
    <div>
       
        <h2>User Display</h2>
        <br></br>

        <h3>Id:{_id}</h3>
        <h3>Treatment Type :{type}</h3>
        <h3>3Preffered Date:{date}</h3>
        <h3>Preffered Time:{time}</h3>
        <h3>Title :{title}</h3>
        <h3>First name:{name1}</h3>
        <h3>Last Name:{name2}</h3>
        <h3>Email:{email}</h3>
        <h3>Phone:{phone}</h3>
        <h3>Message:{message}</h3>
        
        <button>Update</button>
        <button>Delete</button>
        <br></br><br></br><br></br>
      
    </div>
  )
}

export default User
