import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@mui/material';
import axios from 'axios';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'number', label: 'Number', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'checkout', label: 'CheckOut', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'plan', label: 'Plan', alignRight: false },
  { id: 'Edit', label: 'Edit', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [UserData, setUserData] = useState([]);

  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [change, setchange] = useState(true);

  const [plans, setplans] = useState([]);

  const [checked, setchecked] = useState(false);

  const handleDel = (inid) => {
    console.log(inid);
    const k = async () => {
      await axios.post('http://localhost:3002/del', { id: inid });
    };

    setchange((e) => {
      return !e;
    });
    k();
  };

  useEffect(() => {
    const k = async () => {
      const users = await axios.get('http://localhost:3002/data');
      const plan = await axios.get('http://localhost:3002/plandata');
      setplans(plan.data.Plans);
      setUserData(users.data.Users);
    };
    k();
  }, [change]);

  useEffect(() => {
    UserData?.map((user) => {
      const k = async () => {
        const d = new Date(user.check_out);
        const t = new Date();
        console.log('in k ');
        if (d.getMonth() === t.getMonth() && d.getDate() === t.getDate()) {
          await axios.post('http://localhost:3002/changeUser', { id: user.id, u: { ...user, status: 'Expired' } });
        } else if (d.getMonth() === t.getMonth()) {
          if (t.getDate() - d.getDate() <= 5) {
            await axios.post('http://localhost:3002/changeUser', { id: user.id, u: { ...user, status: '5 days' } });
          }
        } else {
          console.log('in else', user);
          await axios.post('http://localhost:3002/changeUser', { id: user.id, u: { ...user, status: 'Paid' } });
        }
      };

      k();

      return user;
    });
  }, [change, UserData]);

  const handleSwitch = () => {
    setchecked((e) => !e);

    if (!checked) {
      setUserData((u) => {
        return u.filter((i) => {
          if (i.status === '5 days') {
            return true;
          }
          return false;
        });
      });
    } else {
      setchange((e) => !e);
    }
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = UserData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - UserData.length) : 0;

  const filteredUsers = applySortFilter(UserData, getComparator(order, orderBy), filterName);
  // filteredUsers = filteredUsers.map((u)=> {
  //   if(u.status)
  // })
  const isNotFound = !filteredUsers.length && !!filterName;

  let noUser = false;

  if (UserData.length === 0) {
    noUser = true;
  } else {
    noUser = false;
  }

  const handleEdit = (inid) => {
    console.log(inid);
    navigate(`/dashboard/editUser/${inid}`);
  };

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            onClick={() => navigate('/dashboard/addUser')}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
        </Stack>

        <FormGroup>
          <FormControlLabel
            control={<Switch onChange={handleSwitch} value={checked} defaultChecked={false} />}
            label="5 days "
          />
        </FormGroup>
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer className="w-full">
              <Table className="w-full">
                <UserListHead
                  className=" w-full"
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={UserData.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody className="w-full">
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, status, gender, profile_pic, Plan, ph_Number, check_out } = row;
                    const selectedUser = selected.indexOf(name) !== -1;
                    const d = new Date(check_out);
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" className="w-full" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={profile_pic} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{ph_Number}</TableCell>

                        <TableCell align="left">{gender}</TableCell>
                        <TableCell align="left">{`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`}</TableCell>
                        <TableCell align="left">{status}</TableCell>
                        <TableCell align="left">{plans[Plan / 10 - 1]?.name}</TableCell>

                        <TableCell align="right" className="flex  ">
                          {/* <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton> */}
                          <MenuItem onClick={() => handleEdit(id)}>
                            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                            Edit
                          </MenuItem>
                          <MenuItem key={id} onClick={() => handleDel(id)} sx={{ color: 'error.main' }}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                            Delete
                          </MenuItem>
                        </TableCell>

                        <Popover
                          open={Boolean(open)}
                          anchorEl={open}
                          onClose={handleCloseMenu}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          PaperProps={{
                            sx: {
                              p: 1,
                              width: 140,
                              '& .MuiMenuItem-root': {
                                px: 1,
                                typography: 'body2',
                                borderRadius: 0.75,
                              },
                            },
                          }}
                        >
                          <MenuItem onClick={() => handleEdit(id)}>
                            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                            Edit
                          </MenuItem>

                          <MenuItem key={id} onClick={() => handleEdit(id)} sx={{ color: 'error.main' }}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                            {id}
                          </MenuItem>
                        </Popover>

                        {/* <Popover
                          open={Boolean(open)}
                          anchorEl={open}
                          onClose={handleCloseMenu}
                          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                          PaperProps={{
                            sx: {
                              p: 1,
                              width: 140,
                              '& .MuiMenuItem-root': {
                                px: 1,
                                typography: 'body2',
                                borderRadius: 0.75,
                              },
                            },
                          }}
                        >
                          <MenuItem
                            key={6543516431}
                            onClick={() => {
                              handleEdit(id);
                            }}
                          >
                            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                            Edit
                          </MenuItem>

                          <MenuItem key={id} onClick={() => handleEdit(id)} sx={{ color: 'error.main' }}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                            Delete
                          </MenuItem>
                        </Popover> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {(noUser || isNotFound) && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={UserData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
