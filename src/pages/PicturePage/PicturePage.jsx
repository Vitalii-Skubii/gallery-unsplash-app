import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPictureById } from '../../api/apiService';
import { MyButton } from '../../components/MyButton/MyButton';
import styles from './PicturePage.module.css';
import { Loader } from '../../components/Loader/Loader';

const PicturePage = () => {
  const navigation = useNavigate();
  const { pictureId } = useParams();
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPhotoById(pictureId);
  }, [pictureId]);

  const fetchPhotoById = async (id) => {
    try {
      setError('');
      setIsLoading(true);
      const response = await fetchPictureById(id);
      setPhoto(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching photo from Unsplash API:', error);
      setIsLoading(false);
      setError(error.message);

    }
  };

  const onTagSearch = (tag) => {
    navigation('/tags', { state: { tag: tag } });
  };

  const onGoHome = () => {
    navigation('/');
  };

  return (
    <div>
      <MyButton onClick={onGoHome}>Main Gallery</MyButton>

      {error && <h3>Error fetching photos from Unsplash API: {error}</h3>}
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {!error&&photo && (
            <img
              src={photo.urls.regular}
              alt={photo.alt_description}
              className={styles.picture__page}
            />
          )}
          <div>
            <h2>Description:</h2>
            {!error&&photo && (
              <p>{photo.alt_description || 'No description available'}</p>
            )}
            <h2>Tags:</h2>
            <div className={styles.tags}>
              {!error&&photo &&
                photo.tags.map((tag) => (
                  <span
                    key={tag.title}
                    className={styles.tag}
                    onClick={() => onTagSearch(tag.title)}
                  >
                    {tag.title}
                  </span>
                ))}
            </div>
            <h2>Likes:</h2>
            {!error&&photo && <p>{photo.likes}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default PicturePage;
