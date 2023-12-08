import React, { useState } from 'react';
import CallbackForm from './CallBackForm';
const Header = ({videoData}) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
       <a href="/"><img src="/logo.svg" alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} /></a> 
      </div>
      <div style={Object.keys(videoData).length > 0 ? buttonContainer : { display: 'none' }}>
        <img src="/call.svg" alt="" />
        <button style={buttonStyle} onClick={toggleForm}>Request a call back</button>
        {showForm && (
          <div className="popup">
            <div className="popup-content">
              <CallbackForm handleClose={toggleForm} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
  
const headerStyle = {
  width:'1376px',
  maxWidth:'100%',
  display: 'flex',
  justifyContent:'space-between',
  alignItems: 'center',
  paddingTop: '1rem',
  background: 'black',
  color: '#fff',
};

const logoStyle = {
  // flex: '1',
  marginLeft : '50px'
};

const buttonContainer = {
  display:'flex',
  padding: '0.5rem 1rem',
  borderRadius: '40px',
  border: '1px solid white',
  textAlign: 'right',
  marginRight : '50px',
  background: 'black',
  cursor: 'pointer',
};

const buttonStyle = {
//   padding: '0.5rem 1rem',
  fontSize: '1rem',
  border:'none',
  outline:'none',
  background: 'black',
  color: 'white',
  cursor: 'pointer',
};

export default Header;
