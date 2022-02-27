import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import NavBar from "../Nav/Nav";
import auth from "../Auth/Auth";

export default function Home(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated) return navigate("/");
  });

  return (
    <div>
      <NavBar />
    </div>
  );
}
