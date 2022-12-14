/**
 * Copyright (c) 2020, 2022, Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
 import React from 'react';
 import PropTypes from 'prop-types';
 import { Link } from 'react-router-dom';
 
 /**
  * Component representing an Video List Item displayed in the list of videos.
  *
  * @param {string} topicId The Topic to which the Video belongs, used when creating
  *                         the link to the video details
  * @param {string} topicName The Topic name, used to render breadcrumbs
  * @param {object} video The Video to display
  */
 const VideosListItem = (props) => {
   const { video, topicName, topicId } = props;
 
   // whole view is wrapped in a "Link" component with the URL of the format
   // videos/videoId?topicName=name&topicId=id
   return (
     <a href={video.fields.videoBrowseUrl}>
       <div className="article">
 
         <div className="title-date">
           <h4 className="title">{video.fields.videoTitle}</h4>
         </div>
 
         {video.fields.videoThumbnailUrl && (
           <picture>
             <source
               type="image/webp"
               srcSet={video.fields.videoThumbnailUrl}
               sizes="80px"
             />
             <source srcSet={video.fields.videoThumbnailUrl} sizes="80px" />
             <img
               src={video.fields.videoThumbnailUrl}
               alt="Video thumbnail"
             />
           </picture>
         )}
 
         <div className="description">
           {video.fields.videoDescription}
         </div>
       </div>
     </a>
   );
 };
 
 export default VideosListItem;
 
 VideosListItem.propTypes = {
  topicId: PropTypes.string.isRequired,
  topicName: PropTypes.string.isRequired,
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fields: PropTypes.shape({
      videoTitle: PropTypes.string.isRequired,
	  videoDescription: PropTypes.string.isRequired,
	  videoThumbnailUrl: PropTypes.string.isRequired,
	  videoBrowseUrl: PropTypes.string.isRequired,
	  releaseDate: PropTypes.shape({
        value: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};
