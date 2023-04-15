import { Typography, Button, Slider, ButtonGroup } from '@mui/material';
import { Container } from '@mui/system';
import React, { useRef, useState, useEffect, useReducer } from 'react';

import AvatarEditor from 'react-avatar-editor';

export const AvaEdi = (props) => {
  const inp = useRef(null);
  const editor = useRef();

  const img = props.img;
  const [zoom, setZoom] = useState();
  const [a, dispatch] = useReducer(reducer, { angle: 0 });

  function reducer(state, action) {
    const an = 0;
    const minN = 0;
    const maxN = 360;
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    switch (action.type) {
      case ACTION.increment:
        return { angle: clamp(state.angle + 90, minN, maxN) };
      case ACTION.decrement:
        return { angle: clamp(state.angle - 90, minN, maxN) };
      default:
        return { angle: state.angle };
    }
  }

  const setpic = () => {
    if (editor.current) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = editor.current.getImage();
      const url = canvas.toDataURL();

      console.log(url);
      props.changePopup(url);

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = editor.current.getImageScaledToCanvas();
    }
  };

  const handle = () => {
    inp.current.click();
    console.log('log are working');
    console.log(inp.current.value);
  };

  const handleRt = (event, newValue) => {
    setZoom(newValue);
  };

  console.log(a);
  return (
    <>
      <div className="  z-10  absolute w-[400px]  flex flex-col left-[20%] top-[10%] justify-center items-center space-y-11">
        <div className=" relative bg-white p-5  w-full  drop-shadow-xl rounded-xl flex flex-col  items-center space-y-20">
          <p className="  text-2xl mx-auto">Click a Photo</p>

          <div className="relative">
            <AvatarEditor
              className=" relative"
              ref={editor}
              image={img}
              width={250}
              height={250}
              borderRadius={100}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={zoom}
              rotate={a.angle}
            />

            <Slider defaultValue={1} min={1} step={0.2} max={10} aria-label="Volume" value={zoom} onChange={handleRt} />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button onClick={() => dispatch({ type: ACTION.decrement })}>Left</Button>
              <Button onClick={() => dispatch({ type: ACTION.increment })}>Right</Button>
            </ButtonGroup>
          </div>

          <Button type="sumbit" className=" w-[70%]" variant="contained" onClick={setpic}>
            Set Photo
          </Button>
        </div>
      </div>
    </>
  );
};
