import Layout from "../Layout/Layouts";
import { useState, React } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Auth/login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cpassword, setCpassword] = useState("");
  const navigate=useNavigate();


  const handleSubmit = async (event) => {
      event.preventDefault();

    if(!name){
      return toast.error("name is required");
    }
    // // Check if password and confirm password are the same
    // if (password !== cpassword) {
    //   return toast.error("Password does not match");
    // }

   

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, phone, address, password, cpassword }
      );
      if(res.data.success){
        toast.success(res.data.message);
        navigate('/login');
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <Layout title={"Register"}>
        <div className="outerDiv">
          <div className="innerDiv">
            <form onSubmit={handleSubmit}>
              <div className="login-label">
                <label htmlFor="exampleInputEmail1 ">Signin</label>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputName">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputNumber"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              

              <div className="form-group">
                <label htmlFor="exampleInputName">Address</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={address}
                  placeholder="Enter Address"
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword"> Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputCpassword"
                  placeholder=" Confirm Password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </div>
              <div className="submitButon">
                <button type="submit" className="btn btn-outline-success">
                  Signin
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Register;
