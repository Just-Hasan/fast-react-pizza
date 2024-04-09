import { getAddress } from "../../services/apiGeocoding";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/*
/////////////////////////////////////[getPosition Explanation]
1. This function returns  a new Promise Object
2. A Promise Object is a special type of object which can be used
   to store the results of asynchronous code like fetching API or 
   using the browser web API
3. Inside of it we use the navigator.geolocation.getCurrentPosition WEB API
   to get user's location
4. getCurrentPosition receives two paramater, resovle and reject.
   resolve for sucessful getting the user's position, and reject when
   user's reject revealing their location
5. BUT, here we pass the resolve and reject paramater that belongs
   to the promise executor function to the getCurrentPosition
6. Resolve and reject are function.
7. So basically what's happening  \"Here are two functions you
   can call when you're done with your task. If you succeed, call
   resolve with the result. If you encounter an error, call reject
   with the error details."
8. Remember, If the promise is fulfilled, everything in the resolve
   will be the result of the promise. And reject will filled the
   error
9. This is one of JavaScript function tho
   
*/
function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function (fullName) {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // The data below will be the payload of the fulfilled state
    console.log(fullName.firstName, fullName.lastName);
    return { position, address };
  },
);

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload.username;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        /*
        /////////////////////////////////////[Explanation]
        1. When the fetchAdress async is fulfilled 
        2. The status will be idle
        3. The position and the adress will be filled with value
           that got returned by the fetchAdress async function above
        */
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error =
          "There was some error retrieving your location, please enable your location or fill the input field";
      });
  },
});

export default userSlice.reducer;
export const { updateName } = userSlice.actions;
/////////////////////////////////////[Selector Function]

export const getUsername = (store) => store.user.username;
export const getUserDetails = (store) => store.user;
