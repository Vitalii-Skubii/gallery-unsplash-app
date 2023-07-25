import React from 'react';
import styles from './Gallery.module.css'

const GalleryItem = ({ photo, onClick }) => {

const onImgClick=()=>{onClick(photo)}

  return (
    <div className={styles.gallery__item} onClick={onImgClick}> 
      <img src={photo.urls.thumb} alt={photo.alt_description} />
    </div>
  );
};

export default GalleryItem;
