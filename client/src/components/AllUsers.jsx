import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";
import { deleteUser } from "../redux/userSlice";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #000000;
    color: #ffffff;
  }
`;

const AllUsers = () => {
  // const [users, setUsers] = useState([])

  const dispatch = useDispatch();
  const userss = useSelector((state) => state.users.users);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await axios.get(`http://localhost:8000/all`);
    dispatch(getUser(response.data));
  };

  const deleteuserDetails = async (id) => {
    await axios.delete(`http://localhost:8000/${id}`);
    dispatch(deleteUser({ id }));
    getAllUsers();
  };

  return (
    <StyledTable>
      <TableHead>
        <THead>
          <TableCell>Id</TableCell>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Address 1</TableCell>
          <TableCell>Address 2</TableCell>
          <TableCell>state</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Country</TableCell>
          <TableCell>ZipCode</TableCell>
          <TableCell></TableCell>
        </THead>
      </TableHead>
    
      <TableBody>
        {userss.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.firstname}</TableCell>
            <TableCell>{user.lastname}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.address1}</TableCell>
            <TableCell>{user.address2}</TableCell>
            <TableCell>{user.state}</TableCell>
            <TableCell>{user.city}</TableCell>
            <TableCell>{user.country}</TableCell>
            <TableCell>{user.zipcode}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                style={{ marginRight: 10 }}
                component={Link}
                to={`/edit/${user.id}`}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteuserDetails(user.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    
    </StyledTable>
  );
};

export default AllUsers;
