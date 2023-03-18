import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// components
import { usr } from '../../../firebase/userContext';

import Iconify from '../../../components/iconify';

import { auth } from '../../../firebase/firebase';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const navigate = useNavigate();

  const { data, dispatch } = useContext(usr);

  console.log(data);

  const [showPassword, setShowPassword] = useState(false);

  const [wPass, setwPass] = useState(false);
  const [wEmail, setwEmail] = useState(false);

  const onLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        dispatch({ type: 'Login', payload: user });
        setwPass(false);
        setwEmail(false);
        navigate('/dashboard/app');

        // ...
      })
      .catch((error) => {
        console.log('not your day', error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code);

        if (error.code === 'auth/wrong-password') {
          console.log('wrong ');
          setwPass(true);
        }
        if (error.code === 'auth/invalid-email') {
          console.log('wrong e');
          setwEmail(true);
        }
      });
  };

  const handleClick = () => {
    console.log(email, password);
    onLogin();
    // navigate('/dashboard', { replace: true });
  };
  console.log(wEmail, wPass);
  return (
    <>
      <Stack spacing={3}>
        <TextField
          helperText={wEmail ? 'Incorrect entry' : 'Email'}
          onChange={(p) => setemail(p.target.value)}
          name="email"
          label="Email address"
        />

        <TextField
          onChange={(p) => setpassword(p.target.value)}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          helperText={wPass ? 'Incorrect entry' : ' Password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
