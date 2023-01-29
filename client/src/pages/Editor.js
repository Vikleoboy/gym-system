import React, { useState, useEffect } from 'react';
import { Container } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContentText,
  FormControl,
  Modal,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TableHead,
} from '@mui/material';
import axios from 'axios';
import uniqid from 'uniqid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edm } from './Comp/Edm';

export const Editor = () => {
  const [data, setdata] = useState(null);
  const [ProductData, setProductData] = useState();
  const [open, setOpen] = React.useState(false);

  const [change, setchange] = useState(false);
  const [proOpen, setproOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      // console.log('axios runing ');
      const d = await axios.get('http://localhost:3002/plandata');
      const m = await axios.get('http://localhost:3002/prodata');
      console.log('axios r');
      // console.log(d);
      setdata(d.data.Plans);
      setProductData(m.data.Products);
    };

    getData();
  }, [change]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleProClickOpen = () => {
    setproOpen(true);
  };

  const k = async (ids) => {
    const ROOT_URL = 'http://localhost:3002';
    console.log('axios ');
    const n = await axios.post('http://localhost:3002/plandel', { id: ids });
    console.log('axios runing ');
    const d = await axios.get('http://localhost:3002/plandata');
    // const m = await axios.get('http://localhost:3002/prodata');
    console.log('after axios ');
    console.log(d);
    setdata(d.data.Plans);
  };
  const handleDel = (idn) => {
    console.log(idn);

    k(idn);
    setchange((e) => {
      return !e;
    });
  };

  const handleProDel = (ids) => {
    console.log(ids);
    const k = async () => {
      await axios.post('http://localhost:3002/prodel', { id: ids });

      const d = await axios.get('http://localhost:3002/plandata');
      // const m = await axios.get('http://localhost:3002/prodata');

      console.log(d);
      setdata(d.data.Plans);

      setchange((e) => {
        return !e;
      });
    };

    k();
  };

  console.log(data);
  return (
    <>
      <Container maxWidth="lg" className=" max-h-[100px] scrollhost  flex flex-col drop-shadow-xl">
        <div className="flex  space-x-2 bg-white rounded-xl drop-shadow-xl py-4">
          {/* Plans */}

          <Edm
            key={435345345}
            name="Plan"
            data={data}
            setdata={setdata}
            handleDel={handleDel}
            handleAdd={handleClickOpen}
            cre={['Name', 'Price', 'Months', 'Edit']}
            dm={['name', 'price', 'months']}
          />

          <Divider orientation="vertical" variant="middle" flexItem />

          {/* Products */}

          <Edm
            key={56421321328}
            name="Product"
            data={ProductData}
            handleDel={handleProDel}
            handleAdd={handleProClickOpen}
            cre={['Name', 'Price', 'Edit']}
            dm={['name', 'price']}
          />
        </div>

        <PlanPopUp setopen={setOpen} open={open} setdata={setdata} />
        <ProPopUp setproOpen={setproOpen} open={proOpen} setProductData={setProductData} />
      </Container>
    </>
  );
};

export const PlanPopUp = (props) => {
  const [Name, setName] = useState();
  const [Price, setPrice] = useState();
  const [Months, setMonths] = useState();

  const data = {
    name: Name,
    price: Price,
    months: Months,
  };

  const getData = async () => {
    const d = await axios.get('http://localhost:3002/plandata');

    console.log(d);
    props.setdata(d.data.Plans);
  };

  const handleClose = () => {
    props.setopen(false);
  };

  const handleAdd = () => {
    const k = async () => {
      const d = await axios.post('http://localhost:3002/addPlan', data);
      const m = await getData();
    };

    k();
    props.setopen(false);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleMonths = (event) => {
    setMonths(event.target.value);
  };
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '10px' }}>
          <TextField
            onChange={handleName}
            sx={{ margin: '10px' }}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            onChange={handlePrice}
            autoFocus
            margin="dense"
            id="name"
            label="Price"
            type="Number"
            fullWidth
            variant="standard"
          />

          <TextField
            onChange={handleMonths}
            autoFocus
            margin="dense"
            id="name"
            label="Months"
            type="Number"
            fullWidth
            variant="standard"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export const ProPopUp = (props) => {
  const [Name, setName] = useState();
  const [Price, setPrice] = useState();
  const [qn, setqnt] = useState();

  const data = {
    name: Name,
    price: Price,
    qnt: qn,
  };

  const getData = async () => {
    const d = await axios.get('http://localhost:3002/prodata');

    console.log(d);
    props.setProductData(d.data.Products);
  };

  const handleProClose = () => {
    props.setproOpen(false);
  };

  const handleProAdd = () => {
    const k = async () => {
      const d = await axios.post('http://localhost:3002/addPro', data);
      const m = await getData();
    };

    k();
    props.setproOpen(false);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleMonths = (event) => {
    setqnt(event.target.value);
  };
  return (
    <Dialog open={props.open} onClose={handleProClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '10px' }}>
          <TextField
            onChange={handleName}
            sx={{ margin: '10px' }}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            onChange={handlePrice}
            autoFocus
            margin="dense"
            id="name"
            label="Price"
            type="Number"
            fullWidth
            variant="standard"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleProClose}>Cancel</Button>
        <Button onClick={handleProAdd}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export const del = () => {
  return (
    <div className=" bg-red-500 p-2">
      <DeleteIcon />
    </div>
  );
};

/* <div className=" flex flex-col basis-1/2 p-6 space-y-5">
            <div className=" flex justify-between">
              <Typography variant="h3" className="  font-thin">
                Plans
              </Typography>
              <div className=" flex space-x-5 justify-end items-center ">
                <IconButton className=" " variant="contained">
                  <DeleteIcon className="m-0 " />
                </IconButton>
                <Button onClick={handleClickOpen} variant="contained">
                  Add
                </Button>
              </div>
            </div>

            <Divider />
            <div className=" overflow-auto max-h-[500px]  ">
              <div className=" flex flex-col justify-between space-y-3 ">
                <div className=" flex outline outline-1 bg-gray-100 outline-gray-200 p-3 rounded-md   ">
                  <div className=" basis-1/2 flex justify-center  items-center  ">
                    <p className=" text-xl font-medium"> Name </p>
                  </div>

                  <div className=" basis-1/2 flex justify-center  items-center">
                    <p className=" text-xl font-medium"> Price </p>
                  </div>
                  <div className=" basis-1/2 flex  justify-center items-center  ">
                    <p className=" text-xl font-medium"> Months </p>
                  </div>

                  <div className=" basis-1/2 flex justify-center  items-center">
                    <p className=" text-xl font-medium"> Edit </p>
                  </div>
                </div>
                {data ? (
                  data.map((plan) => {
                    return (
                      <div className=" flex outline outline-1 outline-gray-200 p-3 rounded-md   ">
                        <div key={uniqid()} className=" basis-1/3 flex justify-center  items-center  ">
                          <p className=" text-xl"> {plan.name} </p>
                        </div>

                        <div key={uniqid()} className=" basis-1/3 flex  justify-center items-center">
                          <p> {plan.price} </p>
                        </div>
                        <div key={uniqid()} className=" basis-1/3 flex justify-center items-center ">
                          <p> {plan.months} </p>
                        </div>
                        <div key={uniqid} className=" basis-1/3 flex justify-end mr-2  pr-2 items-center ">
                          <IconButton
                            id={plan.id}
                            onClick={() => handleDel(plan.id)}
                            className=" p-2 bg-red-500 rounded-md shadow-inner drop-shadow"
                          >
                            <DeleteIcon className=" drop-shadow-md fill-white" />
                          </IconButton>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>Lodaing</p>
                )}
              </div>
            </div>
          </div> */

/* <div className=" flex flex-col basis-1/2 p-6 space-y-5">
            <div className=" flex justify-between">
              <Typography variant="h3" className="  font-thin">
                Plans
              </Typography>
              <div className=" flex space-x-5 justify-end items-center ">
                <IconButton className=" " onClick={handleDel} variant="contained">
                  <DeleteIcon className="m-0 " />
                </IconButton>
                <Button onClick={handleClickOpen} variant="contained">
                  Add
                </Button>
              </div>
            </div>

            <Divider />
            <div className=" overflow-auto max-h-[500px]  ">
              <div className=" flex flex-col justify-between space-y-3 ">
                <div className=" flex outline outline-1 bg-gray-100 outline-gray-200 p-3 rounded-md   ">
                  <div className=" basis-1/2 flex justify-center  items-center  ">
                    <p className=" text-xl font-medium"> Name </p>
                  </div>

                  <div className=" basis-1/2 flex justify-center  items-center">
                    <p className=" text-xl font-medium"> Price </p>
                  </div>
                  <div className=" basis-1/2 flex  justify-center items-center  ">
                    <p className=" text-xl font-medium"> Months </p>
                  </div>

                  <div className=" basis-1/2 flex justify-center  items-center">
                    <p className=" text-xl font-medium"> Edit </p>
                  </div>
                </div>
                {data ? (
                  data.map((plan) => {
                    return (
                      <div className=" flex outline outline-1 outline-gray-200 p-3 rounded-md   ">
                        <div key={plan.name} className=" basis-1/3 flex justify-center  items-center  ">
                          <p className=" text-xl"> {plan.name} </p>
                        </div>

                        <div key={plan.price} className=" basis-1/3 flex  justify-center items-center">
                          <p> {plan.price} </p>
                        </div>
                        <div key={plan.months} className=" basis-1/3 flex justify-center items-center ">
                          <p> {plan.months} </p>
                        </div>
                        <div key={plan.id} className=" basis-1/3 flex justify-end mr-2  pr-2 items-center ">
                          <IconButton
                            id={plan.id}
                            onClick={() => handleDel(plan.id)}
                            className=" p-2 bg-red-500 rounded-md shadow-inner drop-shadow"
                          >
                            <DeleteIcon className=" drop-shadow-md fill-white" />
                          </IconButton>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>Lodaing</p>
                )}
              </div>
            </div>
          </div> */

//   <div className=" flex flex-col basis-1/2 p-6 space-y-5">
//   <div className=" flex justify-between">
//     <Typography variant="h3" className="  font-thin">
//       Products
//     </Typography>
//     <div className=" flex space-x-5 justify-end items-center ">
//       <IconButton className=" " onClick={handleProDel} variant="contained">
//         <DeleteIcon className="m-0 " />
//       </IconButton>
//       <Button onClick={handleProClickOpen} variant="contained">
//         Add
//       </Button>
//     </div>
//   </div>

//   <Divider />
//   <div className=" overflow-auto max-h-[500px]  ">
//     <div className=" flex flex-col justify-between space-y-3 ">
//       <div className=" flex outline outline-1 bg-gray-100 outline-gray-200 p-3 rounded-md   ">
//         <div className=" basis-1/2 flex justify-center  items-center  ">
//           <p className=" text-xl font-medium"> Name </p>
//         </div>

//         <div className=" basis-1/2 flex justify-center  items-center">
//           <p className=" text-xl font-medium"> Price </p>
//         </div>
//         <div className=" basis-1/2 flex  justify-center items-center  ">
//           <p className=" text-xl font-medium"> Quantity </p>
//         </div>

//         <div className=" basis-1/2 flex justify-center  items-center">
//           <p className=" text-xl font-medium"> Edit </p>
//         </div>
//       </div>
//       {ProductData ? (
//         ProductData.map((plan) => {
//           return (
//             <div className=" flex outline outline-1 outline-gray-200 p-3 rounded-md   ">
//               <div key={1} className=" basis-1/3 flex justify-center  items-center  ">
//                 <p className=" text-xl"> {plan.name} </p>
//               </div>

//               <div key={2} className=" basis-1/3 flex  justify-center items-center">
//                 <p> {plan.price} </p>
//               </div>
//               <div key={3} className=" basis-1/3 flex justify-center items-center ">
//                 <p> {plan.qnt} </p>
//               </div>
//               <div key={4} className=" basis-1/3 flex justify-end mr-2  pr-2 items-center ">
//                 <IconButton
//                   id={plan.id}
//                   onClick={() => handleProDel(plan.id)}
//                   className=" p-2 bg-red-500 rounded-md shadow-inner drop-shadow"
//                 >
//                   <DeleteIcon className=" drop-shadow-md fill-white" />
//                 </IconButton>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <p>Lodaing</p>
//       )}
//     </div>
//   </div>
// </div>

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
