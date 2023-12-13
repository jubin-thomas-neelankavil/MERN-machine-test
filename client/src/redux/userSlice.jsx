import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    getUser: (state, action) => {
      state.users = action.payload.map((user) => {
        return {
          id: user._id,
          address1: user.address1,
          address2: user.address2,
          city: user.city,
          country: user.country,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          state: user.state,
          zipcode: user.zipcode,
        };
      });
    },
    addUser: (state, action) => {
      console.log("addUser Action Payload:", action.payload);
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((x) => x.is === action.payload.id);
      state.users[index] = [
        action.payload.address1,
        action.payload.address2,
        action.payload.city,
        action.payload.country,
        action.payload.email,
        action.payload.firstname,
        action.payload.lastname,
        action.payload.phone,
        action.payload.state,
        action.payload.zipcode,
      ];
    },
    deleteUser: (state, action) => {
      const id = action.payload.id;
      state.users = state.users.filter((u) => u.id !== id);
    },
  },
});

export const { getUser, addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
