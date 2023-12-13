import {
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";

const Container = styled(FormGroup)`
width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

// const defaultValue = {
//     firstname: "",
//     lastname: "",
//     email: "",
//     phone: "",
//     address1: "",
//     address2: "",
//     state: "",
//     city: "",
//     country: "",
//     zipcode: ""
// }

const EditUser = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  // const users = useSelector(state => state.users.users)
  // const data = users.find(u => u.id === id);
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
    // setUser({ ...user, ...data})
  };

  const EditUserDetails = async () => {
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
      <Typography variant="h4">Edit User</Typography>
      <FormControl>
        <InputLabel>First Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="firstname"
          value={user.firstname}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Last Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="lastname"
          value={user.lastname}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={user.email}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="phone"
          value={user.phone}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Address 1</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="address1"
          value={user.address1}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Address 2</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="address2"
          value={user.address2}
        />
      </FormControl>
      <FormControl>
        <InputLabel>State</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="state"
          value={user.state}
        />
      </FormControl>
      <FormControl>
        <InputLabel>City</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="city"
          value={user.city}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Country</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="country"
          value={user.country}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Zip Code</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="zipcode"
          value={user.zipcode}
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          onClick={() => EditUserDetails()}
          color="primary"
        >
          Edit User
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditUser;
