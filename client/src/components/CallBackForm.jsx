// Import necessary styles or create a CSS file for your component

const CallbackForm = ({ handleClose }) => {
  // ... (existing code)

  return (
    <div className='popup'>
      <div className='popupContent'>
        <h3>Request a Call Back</h3>
        <form className='popupForm' onSubmit={handleSubmit}>
          <div className="inputContainer">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setNameError(false)
              }}
              placeholder="Name"
              className={Nameerror ? 'error' : ''}
            />
            {Nameerror && <p className="errorText">× Please Enter Name</p>}
          </div>
          <div className="inputContainer">
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => {
                setContactNumber(e.target.value)
                setContactError(false)
              }}
              placeholder="Contact Number"
              className={Contacterror ? 'error' : ''}
            />
            {Contacterror && <p className="errorText">× Please enter Contact Number</p>}
          </div>
          <button type="submit" className="submitButton">Request a Call Back</button>
          <button onClick={handleClose} className="closeButton">Close</button>
        </form>
      </div>
      {loading && <Loader percentage={progress} />}
    </div>
  );
};

export default CallbackForm;
