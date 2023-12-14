import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  styled,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Container = styled("div")`
  width: 50%;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormField = styled(FormControl)`
  margin-bottom: 20px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

const ErrorMessage = styled(Typography)`
  color: #f44336;
  margin-top: 10px;
`;

const defaultValue = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  state: "",
  city: "",
  country: [],
  zipcode: "",
};

const Adduser = () => {
  const [user, setUser] = useState(defaultValue);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // State and Country data
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch states and countries data here
    const fetchStatesAndCountries = async () => {
      try {
        // const statesResponse = await axios.get('http://localhost:8000/');
        // setStates(statesResponse.data);
        const countriesResponse = await axios.get(
          "https://restcountries.com/v3.1/all"
        );
        setCountries(countriesResponse.data);
      } catch (error) {
        console.error("Error fetching states and countries:", error.message);
      }
    };

    fetchStatesAndCountries();
  }, []);

  const onValueChange = (e) => {
    const { name, value } = e.target;

    try {
      if (
        name === "firstname" ||
        name === "lastname" ||
        name === "address1" ||
        name === "address2"
      ) {
        if (!value.trim()) {
          setErrorMessage(
            `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
          );
        } else {
          setErrorMessage("");
          setUser({ ...user, [name]: value.trim() });
        }
      } else if (name === "email") {
        if (!value.trim()) {
          setErrorMessage("Email is required");
        } else if (
          !value.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
        ) {
          setErrorMessage("Enter a valid email");
        } else {
          setErrorMessage("");
          setUser({ ...user, [name]: value.trim() });
        }
      } else if (name === "phone") {
        if (!value.trim()) {
          setErrorMessage("Mobile is required");
        } else {
          setErrorMessage("");
          setUser({ ...user, [name]: value.trim() });
        }
      } else if (name === "state" || name === "city" ) {
        setErrorMessage("");
        setUser({ ...user, [name]: value });
        

      } else if (name === "country") {
        setUser({ ...user, country: Array.isArray(value) ? value : [value] });


      }else if (name === "zipCode") {
        if (!value.trim()) {
          setErrorMessage("Zip Code is required");
        } else if (isNaN(value)) {
          setErrorMessage("Zip Code must be a number");
        } else {
          setErrorMessage("");
          setUser({ ...user, [name]: value.trim() });
        }
      } else {
        setErrorMessage("");
        setUser({ ...user, [name]: value.trim() });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addUserDetails = async () => {
    try {
      const resp = await axios.post("http://localhost:8000/add", user);
      console.log("API Response:", resp.data);
      dispatch(addUser(resp.data));
      navigate("/all");
    } catch (error) {
      setErrorMessage("Something went wrong");
      console.error("Error adding user:", error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center">
        Add User
      </Typography>

      <FormField>
        <InputLabel>First Name</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="firstname" />
      </FormField>

      <FormField>
        <InputLabel>Last Name</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="lastname" />
      </FormField>

      <FormField>
        <InputLabel>Email</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="email" />
      </FormField>

      <FormField>
        <InputLabel>Phone</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="phone" />
      </FormField>

      <FormField>
        <InputLabel>Address 1</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="address1" />
      </FormField>

      <FormField>
        <InputLabel>Address 2</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="address2" />
      </FormField>

      <FormField>
        <InputLabel>State</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="state" />
      </FormField>

      <FormField>
        <InputLabel>City</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="city" />
      </FormField>

      <FormField>
        <InputLabel>Country</InputLabel>
        <Select
          multiple
          onChange={(e) => onValueChange(e)}
          name="country"
          value={user.country}
        >
          {countries?.map((country) => (
            <MenuItem key={country.cca3} value={country.name.common}>
              {country.name.common}
            </MenuItem>
          ))}
        </Select>
      </FormField>

      <FormField>
        <InputLabel>Zip Code</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="zipcode" />
      </FormField>

      <StyledButton
        variant="contained"
        onClick={addUserDetails}
        color="primary"
      >
        Add User
      </StyledButton>

      {errorMessage && (
        <ErrorMessage variant="body2">{errorMessage}</ErrorMessage>
      )}
    </Container>
  );
};

export default Adduser;
