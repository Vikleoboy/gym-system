import { Typography, Button } from '@mui/material';
import { Container } from '@mui/system';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

export const AddDataBase = (props) => {
  const inp = useRef(null);
  const WebcamComponent = () => <Webcam />;

  const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: 'user',
  };

  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);

  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    axios.post('http://localhost:3002/dimage', {
      url: imageSrc,
    });
    props.changePopup(imageSrc);
  }, [webcamRef]);

  const handleDevices = React.useCallback(
    (mediaDevices) => setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);
  const handle = () => {
    // const k = async () => {
    //   try {
    //     const r = await axios.get(`${proxy}folder`);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };

    inp.current.click();
    console.log('log are working');
    console.log(inp.current.value);
  };

  return (
    <>
      <div className="  z-10 absolute w-[70%]  flex flex-col left-[20%] justify-center items-center space-y-11">
        <div className=" relative bg-white p-5  max-w-[40%] drop-shadow-xl rounded-xl flex flex-col  items-center space-y-20">
          <p className="  text-2xl mx-auto">Click a Photo</p>

          <Webcam
            className=" bg-pink-300 rotate-90 rounded-2xl"
            screenshotFormat="image/jpeg"
            ref={webcamRef}
            audio={false}
            videoConstraints={{ deviceId: devices[0]?.deviceId }}
          />

          <Button type="sumbit" className=" w-[70%]" variant="contained" onClick={capture}>
            Capture Photo
          </Button>
        </div>
      </div>
    </>
  );
};
