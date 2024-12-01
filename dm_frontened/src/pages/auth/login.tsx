// src/RegisterPage.tsx
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAccount } from "../../redux/features/auth.slice";
import { validateEmail } from "../../shared/util/util";
import { toastError } from "../../shared/toast";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [userInfo, setUserInfo] = useState<FormValues>({
    email: "",
    password: "",
  });

    
    const authToken=localStorage.getItem("userinfo"); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(userInfo);
    const data = {
      userInfo,
      successCallback: () => {
        navigate('/shoplist');
      },
    };

    if (validateEmail(userInfo.email)) {
      dispatch(loginAccount(data));
    } else {
      toastError("Email should be proper");
    }

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGotoRegister = () => {
    navigate("/register");
  };

  useEffect(()=>{
    if(authToken){
      navigate('/shoplist')
    }else{
      navigate('/login')
    }
  },[])
  return (
    <Container sx={{ width: "26rem", mt: "5rem" }}>
      <Paper
        elevation={2}
        sx={{
          padding: 3.5,
        }}
      >
        <Typography
          sx={{ fontSize: "1.1rem", fontWeight: "bold", textAlign: "center" }}
        >
          Sign in to application
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <Box sx={{ p: "0px", m: "0px", textAlign: "left" }}>
            <span>Email</span>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="email"
              type="email"
              value={userInfo.email}
              onChange={handleChange}
              placeholder="Enter email"
              sx={{
                mt: "5px",
                "& .MuiInputBase-root": {
                  height: "40px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "10px",
                },
              }}
            />
          </Box>
          <Box sx={{ p: "0px", m: "0px", textAlign: "left" }}>
            <span>Password</span>

            <TextField
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={userInfo.password}
              name="password"
              onChange={handleChange}
              placeholder="Enter password"
              sx={{
                mt: "5px",
                "& .MuiInputBase-root": {
                  height: "40px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "10px",
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <span style={{ color: "#0265d2" }}>Forgot password?</span>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, backgroundColor: "#FF6C37" }}
            fullWidth
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Box>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
        <span
          style={{ color: "#0265d2",cursor:'pointer' }}
          onClick={() => navigate("/register")}
        >
          Create free account
        </span>
      </Box>
    </Container>
  );
};

export default Login;
