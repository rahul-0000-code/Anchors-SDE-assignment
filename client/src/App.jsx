import React, { useState,useEffect } from 'react';
import VideoForm from './components/VideoForm';
import Loader from './components/Loader';
import ResultPage from './components/ResultPage';
import Header from './components/Header';
import axios from 'axios';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const [videoData, setVideoData] = useState({});
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [progress, setProgress] = useState(0); // Track progress from 0 to 100
  const [error, setError] = useState(false);

  const extractVideoId = (url) => {
    const videoId = url.split('v=')[1];
    if (videoId) {
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        return videoId.substring(0, ampersandPosition);
      }
      return videoId;
    }
    
    // If the above method fails, try extracting from the shortened link format
    const segments = url.split('/');
    return segments[segments.length - 1].split('?')[0];
  };
  
  const fetchVideoData = async () => {
    const videoId = extractVideoId(videoLink);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=${import.meta.env.VITE_API_KEY}`
      );
      const videoDetails = response.data.items[0];
      // console.log(videoDetails)
      if(!videoDetails){
        setError(true)
      }
      if(Object.keys(videoDetails).length>0){
        setShowResult(true);
      }
      setVideoData(videoDetails);
      
    } catch (error) {
      console.error('Error fetching video data:', error.message);
    }
  };

  //function to handle change in form
  const onChange = (e)=>{
    setVideoLink(e)
  }

  // Function to handle form submission for video analysis
  const handleVideoSubmit = async(e) => {
    setLoading(true);
    setProgress(0); // Reset progress
    await fetchVideoData();
    setLoading(false);
    // console.log(Object.keys(videoData))
  };

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 10; // Increment by 10 (adjust as needed)
          return newProgress >= 100 ? 100 : newProgress; // Cap progress at 100
        });
      }, 1000); // Change the interval time (milliseconds) as needed

      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <>
    <Header videoData={videoData} />
    <div className='main'>
      {!showResult && !showCallbackForm && !showSuccessMessage && (
        <VideoForm onSubmit={handleVideoSubmit} onChange={onChange} value={videoLink} apierror={error}/>
      )}
      {loading && <Loader percentage={progress} />}
      {showResult && !error && <ResultPage videoData={videoData} />}
    </div>
    </>
  );
};

export default App;
