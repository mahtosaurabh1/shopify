// src/RegisterPage.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Stack,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { log } from "console";
import { useDispatch } from "react-redux";
import { createAccount } from "../../redux/features/auth.slice";
import { validateEmail } from "../../shared/util/util";
import { toastError } from "../../shared/toast";

interface FormValues {
  email: string;
  password: string;
  fullname: string;
}

const RegisterPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<FormValues>({
    email: "",
    password: "",
    fullname: "",
  });
  const [showPassword,setShowPassword]=useState<Boolean>(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleSubmit = () => {
    console.log(userInfo);
    const data={
      userInfo,
      successCallback:()=>{
        navigate('/shoplist');
      }
    }
    if(validateEmail(userInfo.email)){
    dispatch(createAccount(data))
      }else{
        toastError('Email should be proper')
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;    
    setUserInfo({...userInfo,[name]: value});
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };
  return (
    <Container sx={{mt:'5rem'}}>
      <Box sx={{ display: "flex", justifyContent: "space-around",flexWrap:'wrap-reverse' }}>
        {/* <Box>
          <Grid item xs={12} >
            <Typography sx={{ mt: 4,fontWeight:'bold' }} variant="h6" component="div">
              Why sign up?
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Avatar/>
                </ListItemIcon>
                <ListItemText primary="it's free" sx={{}}/>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Avatar/>
                </ListItemIcon>
                <ListItemText primary="Easy to use" sx={{}}/>
              </ListItem>
            </List>
          </Grid>
        </Box> */}
        <Paper
          elevation={2}
          sx={{
            padding: 3.5,
            width: "20rem",
          }}
        >
          <Typography
            sx={{ fontSize: "1.1rem", fontWeight: "bold", textAlign: "center" }}
          >
            Create data-management account
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <Box sx={{ p: "0px", m: "0px", textAlign: "left" }}>
              <span>Full name</span>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="fullname"
                value={userInfo.fullname}
                onChange={handleChange}
                placeholder='Enter fullname'
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
              <span>Email</span>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder='Enter email'
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <span>Password</span>
                <Button sx={{ fontSize: "11px" }} onClick={()=>{setShowPassword(!showPassword)}}>{showPassword?"Hide":"Show"}</Button>
              </Box>

              <TextField
                type={showPassword?"text":"password"}
                variant="outlined"
                margin="normal"
                fullWidth
                value={userInfo.password}
                name="password"
                onChange={handleChange}
                placeholder='Enter password'
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
            <Box sx={{ display: "flex" }}>
              <Stack>
                <Checkbox sx={{ p: "0px", m: "0px" }} />
              </Stack>
              <span>
                Receive product updates, news, and other marketing
                communications
              </span>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, backgroundColor: "#FF6C37", mb: "1rem" }}
              fullWidth
              onClick={handleSubmit}
            >
              Create Free Account
            </Button>
            <span>
              By creating an account, you agree to our terms and privacy policy.
            </span>

            <Typography
          sx={{ color: "#0265d2" ,mt:'1rem'}}
          onClick={() => navigate("/login")}
        >
          Already registered user sigin
        </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>

  );
};

export default RegisterPage;
