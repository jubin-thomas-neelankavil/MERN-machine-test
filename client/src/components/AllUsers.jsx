import React, { useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Typography,
  styled,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { getUser, deleteUser } from "../redux/userSlice";
import axios from "axios";
import { Link } from "react-router-dom";

const StyledPaper = styled(Paper)({
  width: "90%",
  margin: "50px auto",
  overflow: "auto",
});

const StyledTable = styled(Table)({
  minWidth: 650,
});

const THead = styled(TableRow)({
  "& > th": {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
});

const TableCellOverflow = styled(TableCell)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/all`);
      dispatch(getUser(response.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const deleteUserDetails = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/${id}`);
      dispatch(deleteUser({ id }));
      getAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <StyledPaper elevation={3}>
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
            <TableCell>State</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Zip Code</TableCell>
            <TableCell>Actions</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCellOverflow>{user.id}</TableCellOverflow>
              <TableCellOverflow>{user.firstname}</TableCellOverflow>
              <TableCellOverflow>{user.lastname}</TableCellOverflow>
              <TableCellOverflow>{user.email}</TableCellOverflow>
              <TableCellOverflow>{user.phone}</TableCellOverflow>
              <TableCellOverflow>{user.address1}</TableCellOverflow>
              <TableCellOverflow>{user.address2}</TableCellOverflow>
              <TableCellOverflow>{user.state}</TableCellOverflow>
              <TableCellOverflow>{user.city}</TableCellOverflow>
              <TableCellOverflow>{user.country}</TableCellOverflow>
              <TableCellOverflow>{user.zipcode}</TableCellOverflow>
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
                  onClick={() => deleteUserDetails(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledPaper>
  );
};

export default AllUsers;
