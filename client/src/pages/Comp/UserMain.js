import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
  InputAdornment,
} from '@mui/material';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Iconify from '../../components/iconify';
import { AddDataBase } from '../AddDataBase';

export const UserMain = (props) => {
  const [PlanData, setPlanData] = useState(null);
  const [popUp, setpopUp] = useState(false);
  const [out, setout] = useState(false);
  const date = new Date();
  const [User, setUser] = useState({
    name: null,
    gender: 'male',
    Dob: date,
    profile_pic: null,
    ph_Number: null,
    Address: null,
    Plan: 0,
    check_in: date,
    check_out: null,
    payment_method: null,
  });

  let num = 0;
  useEffect(() => {
    const k = async () => {
      const d = await axios.get('http://localhost:3002/plandata');
      setPlanData(d.data.Plans);
    };
    k();
  }, []);

  useEffect(() => {
    if (props.edit) {
      console.log('in the edit ');
      setUser(props.data);
    }
  }, [props.edit]);

  useEffect(() => {
    if (PlanData !== null && User.Plan !== 0) {
      console.log(User.Plan);
      const end = new Date();
      const m = end.getMonth();
      let ahh = 0;
      let ny = 0;
      const months = parseInt(PlanData[User.Plan / 10 - 1].months, 10);

      if (months > 13) {
        ny = Math.floor(months / 12);
        ahh = months % 12;
      } else {
        ahh = months;
      }

      end.setFullYear(end.getFullYear() + ny);
      end.setMonth(m + ahh);
      console.log(ahh, ny, months);
      setUser({ ...User, check_out: end });
    }
  }, [out]);

  // const getData = useCallback(() => {

  // }, [props.edit]);

  // getData();
  // const [User.Dob, setDob] = useState(date);
  // const [User.Plan, setPlan] = useState(null);
  // const [User.payment_method, setWay] = useState(null);
  // const [Name, setName] = useState(null);
  // const [Gender, setGender] = useState('male');
  // const [number, setNumber] = useState(null);
  // const [address, setAddress] = useState(null);
  // const [User.check_in, setCheckIn] = useState(date);
  // const [User.check_out, setCheckOut] = useState(date);
  // const [profile, setprofile] = useState(null);

  const navigate = useNavigate();

  const handleGender = (newValue) => {
    setUser({ ...User, gender: newValue.target.value });
  };

  const handleWay = (newValue) => {
    setUser({ ...User, payment_method: newValue.target.value });
  };

  const handleCheckIn = (newValue) => {
    setUser({ ...User, checkIn: newValue });
  };

  const handleCheckOut = (newValue) => {
    setUser({ ...User, checkOut: newValue });
  };

  const handleDob = (newValue) => {
    setUser({ ...User, Dob: newValue });
  };

  const handleName = (event) => {
    setUser({ ...User, name: event.target.value });
  };

  const handleAddress = (event) => {
    setUser({ ...User, Address: event.target.value });
  };

  const handleNumber = (event) => {
    setUser({ ...User, ph_Number: event.target.value });
  };

  const handlePlan = (event) => {
    setUser({ ...User, Plan: event.target.value });
    setout((e) => !e);
  };

  const handleOut = (event) => {
    setUser({ ...User, check_out: event });
  };

  const changePopup = (url) => {
    setUser({ ...User, profile_pic: url });
    setpopUp((k) => {
      return !k;
    });
  };

  console.log(User);

  const sendData = () => {
    // const user = {
    //   name: Name,
    //   gender: Gender,
    //   Dob: dob,
    //   profile_pic: profile,
    //   ph_Number: number,
    //   Address: address,
    //   Plan: plan,
    //   check_in: checkIn,
    //   check_out: checkOut,
    //   payment_method: way,
    // };

    console.log({ ...User, Transections: [PlanData[User.Plan / 10 - 2]] }, 'ahhhhhh');
    const k = async () => {
      if (props.edit) {
        await axios.post('http://localhost:3002/changeUser', { id: props.id, u: User });
      } else {
        await axios.post('http://localhost:3002/addUser', { ...User, Transections: [PlanData[User.Plan / 10 - 1]] });
      }
    };

    k();

    navigate('/dashboard/user');
  };

  console.log(PlanData);
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
                <Avatar src={User.profile_pic} sx={{ width: 106, height: 106 }} className="   " alt="choose image" />
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
                  value={User.name}
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
                    onChange={handleGender}
                    value={User.gender}
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
                    value={User.Dob}
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
                  placeholder="Number"
                  variant="outlined"
                  className="  max-w-[2000px] w-[100%]"
                  value={User.ph_Number}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">91+</InputAdornment>,
                  }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 10);
                  }}
                />
                <TextField
                  value={User.Address}
                  required
                  onChange={handleAddress}
                  id="filled-basic"
                  label="Address"
                  multiline
                  variant="outlined"
                  rows={5}
                  className="  max-w-[2000p x] w-[100%]  "
                />
              </div>

              <div className=" flex flex-col justify-center items-center px-2 pb-5 space-y-6 w-[60%]">
                <Typography variant="h4"> Subscription</Typography>

                <FormControl sx={{ m: 1 }} className="w-[100%]">
                  <InputLabel id="demo-simple-select-helper-label">Plans</InputLabel>
                  <Select
                    disabled={props.edit && true}
                    labelId="demo-simple-select-helper"
                    id="demo-simple-select-helper"
                    value={User.Plan}
                    label="Age"
                    fullWidth
                    onChange={handlePlan}
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    {/* <MenuItem value={10}>Plan 1 - 500</MenuItem>
                    <MenuItem value={20}>Plan 2 - 1000</MenuItem>
                    <MenuItem value={30}>Plan 2 - 5000</MenuItem> */}

                    {PlanData !== null &&
                      PlanData.map((plan) => {
                        num += 10;
                        return (
                          <MenuItem key={num} value={num}>
                            {plan.name} - {plan.price}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <FormHelperText>Choose the Plan</FormHelperText>
                </FormControl>

                {/* <TextField select label="Payment" value={User.payment_method} onChange={handleWay}>
                  <MenuItem value={10}>G pay</MenuItem>
                  <MenuItem value={20}>Pay-tm</MenuItem>
                  <MenuItem value={30}>Cash</MenuItem>
                </TextField> */}

                <div className="flex space-x-4 ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Check In"
                      inputFormat="MM/DD/YYYY"
                      value={User.check_in}
                      onChange={handleCheckIn}
                      className="  max-w-[2000px] w-[60%]"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Check Out"
                      inputFormat="MM/DD/YYYY"
                      value={User.check_out}
                      onChange={handleOut}
                      className="  max-w-[2000px] w-[60%]"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>

                {/* <FormControl sx={{ m: 1 }} className="w-[100%]">
                  <InputLabel id="demo-simple-select-helper-label">Payment</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper"
                    id="demo-simple-select-helper"
                    value={User.payment_method}
                    label="Payment"
                    fullWidth
                    onChange={handleWay}
                    defaultValue={0}
                  >
                    <MenuItem>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>G pay</MenuItem>
                    <MenuItem value={20}>Pay-tm</MenuItem>
                    <MenuItem value={30}>Cash</MenuItem>
                  </Select>
                  <FormHelperText>Choose the Plan</FormHelperText>
                </FormControl> */}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
