import React from 'react';
import { Container, Stack, Typography } from '@mui/icons-material';
import './col.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AdjustIcon from '@mui/icons-material/Adjust';

export const Product = () => {
  return (
    <>
    <div>product</div>
    <div className='rectangle'>
    <div className='arroww'><ArrowBackIosIcon /><ArrowForwardIosIcon />
    <span className='text-col'> Navigation</span>
    <div className='internal-rect'>
      <div className='text-col  row-item-flex'> <PostAddIcon /><AddCommentOutlinedIcon/>
      <DriveFileRenameOutlineIcon/><LockOutlinedIcon /></div>
      
     
    </div>
    
    </div>
    </div>
     <div>
    <div className='Rect-box col-item-flex'>
      <div className='blue-col'><CheckBoxIcon />
    <span className='text-col'> Puma Mens Deviate </span>
    {/* <div className='green-col'>
      <AdjustIcon /><span>online</span>

    </div>
   */}
    
    
    </div>
    <div className='blue-col'><CheckBoxIcon />
    <span className='text-col'> Puma Mens Deviate </span></div>
    <div className='blue-col'><CheckBoxIcon />
    <span className='text-col'> Puma Mens Deviate </span></div>
    <div className='blue-col'><CheckBoxIcon />
    <span className='text-col'> Puma Mens Deviate </span></div>
    <div className='blue-col'><CheckBoxIcon />
    <span className='text-col'> Puma Mens Deviate </span></div>
    <div className='blue-col'><CheckBoxIcon />
    <span className='text-col'> Puma Mens Deviate </span></div>

  </div>
   
  






    
  </div>



    </>
  )
}
