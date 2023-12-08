import React, { useState,useEffect } from 'react';

const VideoForm = ({ onSubmit, value, onChange,apierror }) => {
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Regular expression to match YouTube video URLs
    const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/
    
    if (value.trim() !== '' && youtubeRegex.test(value)) {
      onSubmit();
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleChange = (event) => {
    onChange(event.target.value);
    setError(false);
  };
  useEffect(() => {
    setError(apierror); // Update error state based on the apierror prop
  }, [apierror]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', maxWidth: '80%' }}>
      <h1>See your Earning Potential</h1>
      <h3 style={{ fontWeight: 300 }}>Monetize your YouTube knowledge by sharing resources.</h3>
      <form style={{ display: 'flex' }} className="videoForm" onSubmit={handleSubmit}>
        <div className="videoFormInput">
          <img src="/youtube.svg" alt="" />
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Enter Youtube video link"
            className={error ? 'error' : ''}
          />
        </div>
        <button type="submit">Analyze Video</button>
      </form>
      {error && <p style={{ color: 'red' }}>× Please enter a valid YouTube video link</p>}
    </div>
  );
};

export default VideoForm;
