import React, { useState, useEffect } from 'react';
import './style.css';

// components
// import StoryReel from './StoryReel/StoryReel';
// import MessageSender from './MessageSender/MessageSender';
import Post from '../../Components/Post';

// image
import arif from '../../img/story/arif.jpg'
import postImage from '../../img/story/storyImage/web-development.jpg'


const Feed = () => {
  
    return (
        <div className="feed">
            {/* <StoryReel />
            <MessageSender /> */}
            <Post 
                key='1'
                profilePic={arif}
                message='WOW this works!'
                timestamp='This is a timestamp'
                username='devarif'
                image={postImage}
            />
        </div>
    )
}

export default Feed;
