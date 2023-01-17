import React, { useState } from 'react';
import { Container, margin } from '@mui/system';
import {
  Button,
  Avatar,
  TextField,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Stack,
} from '@mui/material';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Iconify from '../components/iconify';
import { AddDataBase } from './AddDataBase';

export const AddUser = () => {
  const [popUp, setpopUp] = useState(false);

  const date = new Date();

  const [dob, setDob] = useState(date);
  const [plan, setPlan] = useState(null);
  const [way, setWay] = useState(null);
  const [Name, setName] = useState(null);
  const [Gender, setGender] = useState('male');
  const [number, setNumber] = useState(null);
  const [address, setAddress] = useState(null);
  const [checkIn, setCheckIn] = useState(date);
  const [checkOut, setCheckOut] = useState(date);
  const [profile, setprofile] = useState(null);

  console.log(date);

  console.log(dob);
  const handleWay = (newValue) => {
    setWay(newValue.target.value);
  };

  const handleCheckIn = (newValue) => {
    setCheckIn(newValue);
  };

  const handleCheckOut = (newValue) => {
    setCheckOut(newValue);
  };

  const handleDob = (newValue) => {
    setDob(newValue);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleNumber = (event) => {
    setNumber(event.target.value);
  };

  const handlePlan = (event) => {
    setPlan(event.target.value);
    setCheckIn(date);
    const end = new Date();
    const m = end.getMonth();
    end.setMonth(m + 1);
    setCheckOut(end);
  };

  const changePopup = (url) => {
    setprofile(url);
    setpopUp((k) => {
      return !k;
    });
  };

  const sendData = () => {
    const user = {
      name: Name,
      gender: Gender,
      Dob: dob,
      profile_pic: profile,
      ph_Number: number,
      Address: address,
      Plan: plan,
      check_in: checkIn,
      check_out: checkOut,
      payment_method: way,
    };

    axios.post('http://localhost:3002/addUser', user);
  };

  return (
    <>
      {popUp && <AddDataBase changePopup={changePopup} />}
      <Container maxWidth="lg" className=" flex flex-col">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            New Users
          </Typography>
          <Button onClick={sendData} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Submit
          </Button>
        </Stack>
        <div className=" bg-white rounded-xl drop-shadow-xl">
          <div className=" flex ">
            <div className=" basis-1/2 py-10 flex flex-col items-center justify-center space-y-10">
              {/* Heading */}

              {/* Profile */}
              <div className=" border-b-2 border-solid  drop-shadow-xl   flex flex-col justify-center items-center space-y-6">
                <Typography variant="h4"> Personal Information</Typography>
                <Avatar src={profile} sx={{ width: 106, height: 106 }} className="   " alt="choose image" />
                <Button onClick={changePopup} variant="outlined" className="">
                  Choose Image
                </Button>
                <div className="border-b-2  border-b-gray-400 " />
              </div>

              {/* Main Details */}
              <div className=" flex flex-col justify-center items-center px-2 my-3 space-y-6 w-full">
                <FormLabel>Name</FormLabel>
                <TextField
                  onChange={handleName}
                  fullWidth
                  id="filled-basic"
                  label="Name"
                  variant="outlined"
                  className="  max-w-[2000px] w-[60%]"
                />

                <FormControl className="">
                  <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <FormLabel>Date Of Birth</FormLabel>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/DD/YYYY"
                    value={dob}
                    onChange={handleDob}
                    className="  max-w-[2000px] w-[60%]"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className="  basis-1/2 drop-shadow-xl   flex flex-col justify-center items-center space-y-10 py-10 ">
              <div className=" flex flex-col justify-center items-center px-2  space-y-6 w-[60%]">
                <Typography variant="h4"> Contact Information</Typography>
                <TextField
                  onChange={handleNumber}
                  id="filled-basic"
                  type="number"
                  label="Ph-Number"
                  placeholder="91+"
                  variant="outlined"
                  className="  max-w-[2000px] w-[100%]"
                />
                <TextField
                  onChange={handleAddress}
                  id="filled-basic"
                  label="Address"
                  multiline
                  variant="outlined"
                  rows={5}
                  className="  max-w-[2000p x] w-[100%]  "
                />
              </div>

              <div className=" flex flex-col justify-center items-center px-2  space-y-6 w-[60%]">
                <Typography variant="h4"> Subscription</Typography>

                <FormControl sx={{ m: 1 }} className="w-[100%]">
                  <InputLabel id="demo-simple-select-helper-label">Plans</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper"
                    id="demo-simple-select-helper"
                    value={plan}
                    label="Age"
                    fullWidth
                    onChange={handlePlan}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Plan 1 - 500</MenuItem>
                    <MenuItem value={20}>Plan 2 - 1000</MenuItem>
                    <MenuItem value={30}>Plan 2 - 5000</MenuItem>
                  </Select>
                  <FormHelperText>Choose the Plan</FormHelperText>
                </FormControl>

                <div className="flex space-x-4 ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Check In"
                      inputFormat="MM/DD/YYYY"
                      value={checkIn}
                      onChange={handleCheckIn}
                      className="  max-w-[2000px] w-[60%]"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Check Out"
                      inputFormat="MM/DD/YYYY"
                      value={checkOut}
                      onChange={handleCheckOut}
                      className="  max-w-[2000px] w-[60%]"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>

                <FormControl sx={{ m: 1 }} className="w-[100%]">
                  <InputLabel id="demo-simple-select-helper-label"> Payment Method</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper"
                    id="demo-simple-select-helper"
                    value={way}
                    label="Payment Method"
                    fullWidth
                    onChange={handleWay}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>G pay</MenuItem>
                    <MenuItem value={20}>Pay-tm</MenuItem>
                    <MenuItem value={30}>Cash</MenuItem>
                  </Select>
                  <FormHelperText>Choose the Plan</FormHelperText>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
