import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Button, Divider, IconButton } from '@mui/material';

export const Edm = (props) => {
  return (
    <div className=" flex flex-col basis-1/2 p-6 space-y-5">
      <div className=" flex justify-between">
        <Typography variant="h3" className="  font-thin">
          {props.name}
        </Typography>
        <div className=" flex space-x-5 justify-end items-center ">
          <Button onClick={props.handleAdd} variant="contained">
            Add
          </Button>
        </div>
      </div>

      <Divider />
      <div className=" overflow-auto max-h-[500px]  ">
        <div className=" flex flex-col justify-between space-y-3 ">
          <div className=" flex outline outline-1 bg-gray-100 outline-gray-200 p-3 rounded-md   ">
            {props.cre.map((c) => {
              return (
                <div className=" basis-1/2 flex justify-center  items-center  ">
                  <p className=" text-xl font-medium"> {c} </p>
                </div>
              );
            })}
          </div>
          {props.data ? (
            props.data.map((plan) => {
              return (
                <div className=" flex outline outline-1 outline-gray-200 p-3 rounded-md   ">
                  {props.dm.map((l, n) => {
                    return (
                      <div key={n} className=" basis-1/3 flex justify-center  items-center  ">
                        <p className=" text-xl"> {plan[l]} </p>
                      </div>
                    );
                  })}

                  <div
                    key={'sdfasdfasdfasdgafbhjtwjgadfsgsdfgagyubjidfiqweiojd'}
                    className=" basis-1/3 flex justify-end mr-2  pr-2 items-center "
                  >
                    <IconButton
                      onClick={() => props.handleDel(plan.id)}
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
    </div>
  );
};
