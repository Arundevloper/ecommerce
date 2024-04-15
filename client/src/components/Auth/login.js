import React, { useState } from "react";
import Layout from "../Layout/Layouts";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate,useLocation} from "react-router-dom";
import { useAuth } from "../context/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth(); // Use object destructuring
  const navigate = useNavigate();
  const location=useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
     
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <Layout title={"Login"}>
        <div className="outerDiv">
          <div className="innerDiv">
            <form onSubmit={handleSubmit}>
              <div className="login-label">
                <label htmlFor="exampleInputEmail1">Login</label>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
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
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="submitButon">
                <button
                  type="submit"
                  className="btn btn-primary  btn-outline-success"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Login;
