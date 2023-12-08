import React, { useState,useEffect } from 'react';
import CheckHow from './CheckHow';
import axios from 'axios';
const ResultPage = (props) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const {videoData} = props
  const originalDateString = videoData.snippet.publishedAt;
  const date = new Date(originalDateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  
  const [videosInCategory, setVideosInCategory] = useState([]);
  const [subscribers, setSubscribers] = useState(null);


  const getSubscribersCount = async(channelId)=>{
    try {
      const channelResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${import.meta.env.VITE_API_KEY}`
      );
      const subscriberCount =parseInt(channelResponse.data.items[0].statistics.subscriberCount);
      return subscriberCount;
    } catch (error) {
      console.error('Error fetching subscriber count:', error);
      return null;
    }
  }
  const viewCount = parseInt(videoData.statistics.viewCount, 10); // Convert string to integer
  const commentCount = parseInt(videoData.statistics.commentCount, 10); // Convert string to integer
  const likeCount = parseInt(videoData.statistics.likeCount, 10); // Convert string to integer
  const earning = Math.min(viewCount,subscribers) + 10 * commentCount + 5 * likeCount;

  useEffect(() => {
    const fetchData = async () => {
      // Fetch subscriber count
      const subscriberCount = await getSubscribersCount(videoData.snippet.channelId);
      setSubscribers(subscriberCount);

      try {
        const response = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=10&regionCode=in&videoCategoryId=${videoData.snippet.categoryId}&key=${import.meta.env.VITE_API_KEY}`
        );
  
        const videos = response.data.items.map(async (item) => {
          const title =
            item.snippet.title.length > 50
              ? `${item.snippet.title.substring(0, 20)}...`
              : item.snippet.title;
  
          const date = new Date(item.snippet.publishedAt).toLocaleDateString(
            'en-US',
            options
          );
  
          const [views, likes, comment] = [
            item.statistics.viewCount || NaN,
            item.statistics.likeCount || NaN,
            item.statistics.commentCount || NaN,
          ];
  
          const channelId = item.snippet.channelId;
  
          const [subscriberCount, videoInfo] = await Promise.all([
            getSubscribersCount(channelId),
            Promise.resolve({
              title,
              url: item.snippet.thumbnails.medium.url,
              videoId: item.id,
              views,
              likes,
              comment,
              date,
            }),
          ]);
  
          const earning =
            Math.min(videoInfo.views, subscriberCount) +
            10 * parseInt(videoInfo.likes) +
            5 * parseInt(videoInfo.comment);
  
          return {
            ...videoInfo,
            subscriber: subscriberCount,
            earning,
          };
        });
  
        const rankedVideos = (await Promise.all(videos))
          .slice()
          .sort((a, b) => b.views - a.views)
          .map((video, index) => ({
            ...video,
            rank: index + 1,
          }));
  
        setVideosInCategory(rankedVideos);
      } catch (error) {
        console.error('Error fetching videos in category:', error);
      }
    };
  
    fetchData();
  }, [videoData.snippet.channelId,videoData.snippet.categoryId]);

  return (
    <>
    
      <div className='result' style={{backgroundColor:'#1E1E1E'}}>
        <div className="thumbnail">
          <div className="batch">
            <img src="/batch.svg" alt="" />
            Top Earner Video
          </div>
          <div className="image">
            <img src={videoData.snippet.thumbnails.medium.url} alt="Thumbnail" />
          </div>
          <div className="date">
            Uploaded on - {formattedDate}
          </div>
        </div>
        <div className="statics">
          <div className="title">
            <h3 style={{fontWeight:500}}>{videoData.snippet.title}</h3>
          </div>
          <div className="description">
            <ul>
              <li><img src="/views.svg" alt="views" />{videoData.statistics.viewCount}</li>
              <li> <img src="/like.svg" alt="likes" /> {videoData.statistics.likeCount}</li>
              <li><img src="/comment.svg" alt="comment" /> {videoData.statistics.commentCount}</li>
            </ul>
          </div>
        </div>
        <div className="earning" style={{backgroundColor:'#282828'}}>
          <div className="title">
            <h1 style={{fontWeight:500}}>₹{earning}</h1>
          </div>
          <div>
            <button onClick={toggleForm}>check how?</button>
            {showForm && (
          <div className="popup">
            <div className="popup-content">
              <CheckHow handleClose={toggleForm} />
            </div>
          </div>
        )}
          </div>
        </div>
        
      </div>
      <p style={{marginTop:"70px",fontWeight:"500",color:'#FFFFFFB2'}} >Other Videos Potentials</p>
      <div className="headings">
        <div className='heading'>Rank</div>
        <div className='heading'>Title</div>
        <div className='heading'>Thumbnail</div>
        <div className='heading'>Views</div>
        <div className='heading'>Likes</div>
        <div className='heading'>Commment</div>
        <div className='heading'>Uploaded On</div>
        <div className='heading'>Estimated Earning</div>
      </div>
      <div className='Columns'>
         {/* Check if videosInCategory array is empty */}
      {videosInCategory.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          No videos found in this category.
        </div>
      )}
          {videosInCategory.map(video => (
            <div key={video.rank} className="column">
              <div >{video.rank}</div>
              <div >{video.title}</div>
              <div><img src={video.url} alt="" /></div>
              <div>{video.views}</div>
              <div>{video.likes}</div>
              <div>{video.comment}</div>
              <div>{video.date}</div>
              <div>{video.earning}</div>
            </div>
          ))}
      </div>
      </>
  );
};

export default ResultPage;
