import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import {
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  Button,
  Container,
} from '@mui/material';

import ReactWhatsapp from 'react-whatsapp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { WhatsApp } from '@mui/icons-material';
import { UserMain } from './Comp/UserMain';
import { Edm } from './Comp/EdmModefied';

export const Edit = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [Invoice, setInvoice] = useState(null);
  const [change, setchange] = useState(false);
  const [proOpen, setproOpen] = useState(false);
  const [Total, setTotal] = useState(0);
  const [userData, setuserData] = useState();
  const [massages, setmassages] = useState([]);
  const [chmsg, setchmsg] = useState(0);
  useEffect(() => {
    const k = async () => {
      const user = await axios.get(`http://localhost:3002/getUser/${id}`);
      const msg = await axios.get(`http://localhost:3002/Textdata`);
      setuserData(user.data);
      setmassages(msg.data.Texts);
      console.log(user.data);
    };
    k();
  }, [open, proOpen, change]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const k = async () => {
      let Tol = 0;
      const InTotal = [];

      if (userData !== undefined) {
        userData.Transections.map((i) => {
          const p = parseInt(i.price, 10);
          Tol += p;
          InTotal.push({
            quantity: '1',
            description: i.name,
            'tax-rate': 0,
            price: p,
          });
          return Tol;
        });

        userData.ProductTransections.map((i) => {
          Tol += parseInt(i.price, 10) * parseInt(i.qnt, 10);

          const p = parseInt(i.price, 10);
          const q = parseInt(i.qnt, 10);
          const s = {
            quantity: q,
            description: i.name,
            price: p,
            'tax-rate': 0,
          };

          InTotal.push(s);

          return Tol;
        });
      }

      console.log(InTotal);
      const d = new Date(userData.check_in);
      const o = new Date(userData.check_out);
      const imp = await axios.post(`http://localhost:3002/getInvoice`, {
        products: InTotal,
        sender: {
          company: 'DESHMUKH HEALTH CLUB',
          address: 'DESHMUKH HEALTH CLUB Deshmukh Gym,Sahakarnagar,Taroda Budruk Road',
          zip: '431605',
          city: ' Nanded, Maharashtra ',
          country: 'India',
        },
        client: {
          company: `Name : ${userData.name}`,
          address: `Ph-Num ${userData.ph_Number} : `,
          // city: 'Nanded, Maharashtra ',
          // country: 'India',
        },
        information: {
          // Invoice number
          number: userData.id,
          // Invoice data
          date: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
          // Invoice due date
          'due-date': `${o.getDate()}-${o.getMonth() + 1}-${o.getFullYear()}`,
        },
        images: {
          // The logo on top of your invoice
          logo: 'https://cdn.discordapp.com/attachments/1068777659779268660/1068777940223004734/logo-no-background.png',
          // The invoice background
        },
      });
      console.log(imp);
      setInvoice(`data:application/pdf;base64,${imp.data.pdf}`);
      setTotal(Tol);
    };

    k();
  }, [userData?.Transections, userData?.ProductTransections]);

  useEffect(() => {
    const k = async () => {
      let allMonths = 0;
      if (userData !== undefined) {
        userData.Transections.map((i) => {
          console.log(i.months, 'this hreeeee ');
          allMonths += parseInt(i.months, 10);
          return allMonths;
        });

        const d = new Date(userData.check_in);

        allMonths += d.getMonth();

        console.log(allMonths, ' here all months ');
        if (allMonths < 12) {
          console.log(allMonths);
          d.setMonth(allMonths);
          await axios.post('http://localhost:3002/changeUser', { id: userData.id, u: { ...userData, check_out: d } });
        } else if (allMonths > 12) {
          const y = Math.floor(allMonths / 12);
          const m = allMonths % 12;
          d.setFullYear(d.getFullYear() + y);
          d.setMonth(m);
          await axios.post('http://localhost:3002/changeUser', { id: userData.id, u: { ...userData, check_out: d } });
        }
        // const shit = userData.check_out;
        // if (shit !== d) {
        //   setchange((e) => !e);
        // }
      }
    };

    k();
  }, [userData?.Transections]);

  const handleProClickOpen = () => {
    setproOpen(true);
  };

  const handleDel = (idn) => {
    const k = async () => {
      const trans = [...userData.Transections];

      trans.splice(idn, 1);
      const bh = { Transections: trans };
      const ch = await axios.post(`http://localhost:3002/changeUser`, { id: userData.id, u: bh });
      setchange((e) => !e);
    };
    k();

    console.log(idn);
  };

  const handleProDel = (idn) => {
    const k = async () => {
      const trans = [...userData.ProductTransections];

      trans.splice(idn, 1);
      const bh = { ProductTransections: trans };
      const ch = await axios.post(`http://localhost:3002/changeUser`, { id: userData.id, u: bh });
      setchange((e) => !e);
    };
    k();

    console.log(idn);
  };

  return (
    <>
      <div className=" z-0 flex flex-col space-y-5 ">
        {userData ? <UserMain id={userData.id} edit data={userData} /> : <p>Loading</p>}

        <Container maxWidth="lg" className=" z-0">
          <div className="flex flex-col bg-white drop-shadow-lg rounded-lg ">
            <div className="flex">
              {userData ? (
                <div className=" basis-1/2">
                  <Edm
                    name="Plans"
                    cre={['Name', 'Price', 'Months', 'Date', 'Edit']}
                    dm={['name', 'price', 'months', 'date']}
                    handleDel={handleDel}
                    handleAdd={handleClickOpen}
                    data={userData.Transections}
                  />
                </div>
              ) : (
                <p>Loading</p>
              )}
              {userData ? (
                <div className=" basis-1/2">
                  <Edm
                    name="Products"
                    cre={['Name', 'Price', 'Quantity', 'Date', 'Edit']}
                    dm={['name', 'price', 'qnt', 'date']}
                    handleDel={handleProDel}
                    handleAdd={handleProClickOpen}
                    data={userData.ProductTransections}
                  />
                </div>
              ) : (
                <p>Loading</p>
              )}
              {userData && <PlanPopUp id={userData.id} setopen={setOpen} open={open} Trans={userData.Transections} />}
              {userData && (
                <PPopup id={userData.id} setopen={setproOpen} open={proOpen} Trans={userData.ProductTransections} />
              )}
            </div>

            <div className="flex justify-between p-10">
              <p className=" flex space-x-2 items-center">
                <span className=" text-2xl">Total Price :</span>{' '}
                <span className="text-2xl flex  items-center">
                  <CurrencyRupeeIcon /> {Total}
                </span>
              </p>

              <div className=" flex space-x-5">
                <div className=" flex justify-center items-center">
                  <Button variant="contained" type="submit">
                    <a href={Invoice} download>
                      Invoice
                    </a>
                  </Button>
                </div>

                <div className=" flex space-x-5 items-center ">
                  <div className=" min-w-[120px]">
                    <TextField
                      select
                      label="Template"
                      variant="outlined"
                      defaultValue={1}
                      value={chmsg}
                      fullWidth
                      onChange={(e) => setchmsg(e.target.value)}
                    >
                      {massages.map((msg, i) => {
                        return <MenuItem value={i}>{msg.name}</MenuItem>;
                      })}
                    </TextField>
                  </div>
                  <Button variant="contained" className=" bg-green-500" type="submit">
                    {userData ? (
                      <ReactWhatsapp number={userData.ph_Number} message={massages[chmsg].text}>
                        <WhatsApp /> whatsapp
                      </ReactWhatsapp>
                    ) : (
                      <p>Whatsapp</p>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* <div className=" flex flex-col space-y-5">{JSON.stringify(userData)}</div> */}
    </>
  );
};

/// HERE POP UP

export const PlanPopUp = (props) => {
  const [trans, settrans] = useState('');

  const [plans, setplans] = useState([]);

  useEffect(() => {
    const k = async () => {
      const d = await axios.get('http://localhost:3002/plandata');

      setplans(d.data.Plans);
    };
    k();
  }, []);

  const handleClose = () => {
    props.setopen(false);
  };

  const handleAdd = () => {
    const k = async () => {
      // const allTrans = props.Transections;
      const d = await axios.get(`http://localhost:3002/getPlan/${trans}`);
      const r = d.data;
      const date = new Date();
      const n = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      r.date = n;

      const bh = { Transections: [...props.Trans, r] };
      const ch = await axios.post(`http://localhost:3002/changeUser`, { id: props.id, u: bh });
      console.log(ch.data, 'its in the ch');
      props.setopen(false);
    };
    if (trans !== '') {
      k();
    }
  };
  const handlePlan = (event) => {
    settrans(event.target.value);
  };

  console.log(`this is tranid ${trans}`);
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '10px' }}>
          <TextField
            onChange={handlePlan}
            autoFocus
            margin="dense"
            id="name"
            label="Price"
            type="Number"
            fullWidth
            variant="standard"
            select
            required
            value={trans}
          >
            {plans.map((i) => {
              return (
                <MenuItem key={i.id} value={i.id}>
                  {i.name}{' '}
                </MenuItem>
              );
            })}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export const PPopup = (props) => {
  const [trans, settrans] = useState('');
  const [qnt, setqnt] = useState(1);
  const [plans, setplans] = useState([]);

  useEffect(() => {
    const k = async () => {
      const d = await axios.get('http://localhost:3002/prodata');

      setplans(d.data.Products);
    };
    k();
  }, []);

  const handleClose = () => {
    props.setopen(false);
  };

  const handleAdd = () => {
    const k = async () => {
      // const allTrans = props.Transections;
      const d = await axios.get(`http://localhost:3002/getPro/${trans}`);
      const r = d.data;
      const date = new Date();
      const n = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      r.date = n;
      r.qnt = qnt;
      const bh = { ProductTransections: [...props.Trans, r] };
      const ch = await axios.post(`http://localhost:3002/changeUser`, { id: props.id, u: bh });
      console.log(ch.data, 'its in the ch');
      props.setopen(false);
    };
    if (trans !== '') {
      k();
    }
  };
  const handlePlan = (event) => {
    settrans(event.target.value);
  };

  console.log(`this is tranid ${trans}`);
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '10px' }}>
          <TextField
            onChange={handlePlan}
            autoFocus
            margin="dense"
            id="name"
            label="Price"
            type="Number"
            fullWidth
            variant="standard"
            select
            required
            value={trans}
          >
            {plans.map((i) => {
              return (
                <MenuItem key={i.id} value={i.id}>
                  {i.name}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            onChange={(e) => setqnt(e.target.value)}
            sx={{ margin: '10px' }}
            autoFocus
            margin="dense"
            id="name"
            label="Qnt"
            type={'number'}
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

// export const ProPopUp = (props) => {
//   const [Name, setName] = useState();
//   const [Price, setPrice] = useState();
//   const [qn, setqnt] = useState();

//   const data = {
//     name: Name,
//     price: Price,
//     qnt: qn,
//   };

//   const getData = async () => {
//     const d = await axios.get('http://localhost:3002/prodata');

//     console.log(d);
//     props.setProductData(d.data.Products);
//   };

//   const handleProClose = () => {
//     props.setproOpen(false);
//   };

//   const handleProAdd = () => {
//     const k = async () => {
//       const d = await axios.post('http://localhost:3002/addPro', data);
//       const m = await getData();
//     };

//     k();
//     props.setproOpen(false);
//   };
//   const handleName = (event) => {
//     setName(event.target.value);
//   };

//   const handlePrice = (event) => {
//     setPrice(event.target.value);
//   };

//   const handleMonths = (event) => {
//     setqnt(event.target.value);
//   };
//   return (
//     <Dialog open={props.open} onClose={handleProClose}>
//       <DialogTitle>Subscribe</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           To subscribe to this website, please enter your email address here. We will send updates occasionally.
//         </DialogContentText>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '10px' }}>
//           <TextField
//             onChange={handleName}
//             sx={{ margin: '10px' }}
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Name"
//             select
//             fullWidth
//             variant="standard"

//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleProClose}>Cancel</Button>
//         <Button onClick={handleProAdd}>Subscribe</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
