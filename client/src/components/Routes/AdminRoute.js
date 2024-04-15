import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./spinner";

export default function AdminRoute() {
  const [ok, setOK] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      console.log("Token from privat" + auth.token);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
        );
        if (res.data.ok) {
          setOK(true);
        } else {
          setOK(false);
        }
      } catch (error) {
        console.error("Error while checking authentication:", error);
        setOK(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth]);

  return ok ? <Outlet /> : <Spinner />;
}
