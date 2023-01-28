import { AddReaction } from '@mui/icons-material';
import React from 'react';
import { UserMain } from './Comp/UserMain';
import { Adder } from './Comp/Adder';

export const AddUser = () => {
  return (
    <>
      <UserMain edit={false} />
    </>
  );
};
