import React, { useState,useEffect } from 'react';
import axios from 'axios';
const CheckHow = ({ handleClose }) => {  
  return (
    <div className='popup'>
      <div className='popupContent'>
        <h3>Formula to Calculate Video Earnings: </h3>
        <h4>Earnings = min(subscriber count, views) + 10 * comments + 5 * likes</h4>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default CheckHow;