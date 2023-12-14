import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";

const Container = styled(FormGroup)({
  width: "50%",
  margin: "5% auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

const FormField = styled(FormControl)({
  marginBottom: "20px",
  width: "100%",
});

const StyledButton = styled(Button)({
  width: "100%",
  marginTop: "20px",
});

const EditUser = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error loading user details:", error);
    }
  };

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const editUserDetails = async () => {
    try {
      await axios.put(`http://localhost:8000/${id}`, user);
      dispatch(updateUser({ id, user }));
      navigate("/all");
    } catch (error) {
      console.error("Error editing user details:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center">
        Edit User
      </Typography>

      <FormField>
        <InputLabel>First Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="firstname"
          value={user.firstname || ""}
        />
      </FormField>

      <FormField>
        <InputLabel>Last Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="lastname"
          value={user.lastname || ""}
        />
      </FormField>

      <FormField>
        <InputLabel>Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={user.email || ""}
        />
      </FormField>

      <FormField>
        <InputLabel>Phone</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="phone"
          value={user.phone || ""}
        />
      </FormField>

      <FormField>
        <InputLabel>Address 1</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="address1"
          value={user.address1 || ""}
        />
      </FormField>

      <FormField>
        <InputLabel>Address 2</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="address2"
          value={user.address2 || ""}
        />
      </FormField>

      <FormField>
        <InputLabel>State</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="state"
          value={user.state || ""}
        />
      </FormField>

      <FormField>
        <InputLabel>City</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="city"
          value={user.city || ""}
        />
      </FormField>

      <FormField>
        <InputLabel>Country</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="country"
          value={user.country || ""}
        />
      </FormField>

      <FormField>
        <InputLabel>Zip Code</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="zipcode"
          value={user.zipcode || ""}
        />
      </FormField>

      <StyledButton
        variant="contained"
        onClick={() => editUserDetails()}
        color="primary"
      >
        Edit User
      </StyledButton>
    </Container>
  );
};

export default EditUser;
