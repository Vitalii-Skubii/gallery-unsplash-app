import React, { useState, useEffect } from 'react';
import { searchPictures } from '../../api/apiService';
import GalleryItem from '../../components/GalleryItem/GalleryItem';
import { Pagination } from '../../components/Pagination/Pagination';
import { getPagesCount } from '../../utils/pages';
import { MyButton } from '../../components/MyButton/MyButton';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './TagCollection.module.css';
import { Loader } from '../../components/Loader/Loader';

export const TagCollection = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const [photos, setPhotos] = useState([]);
  const [columns, setColumns] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    searchPhotos(searchValue, currentPage);
  }, [currentPage, searchValue]);

  useEffect(() => {
    location?.state?.tag && setSearchValue(location?.state?.tag);
  }, [location?.state?.tag]);

  const searchPhotos = async (query, page) => {
    try {
      setError('');
      setIsLoading(true);
      const response = await searchPictures(query, page);
      setPhotos(response.data.results);
      const totalCount = response.headers['x-total'];
      setTotalPages(getPagesCount(totalCount, 10));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching photos from Unsplash API:', error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handleColumnChange = () => {
    setColumns((prevState) => !prevState);
  };

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleItemClick = (photo) => {
    navigation(`tag/${photo.id}`);
  };

  const onGoHome = () => {
    navigation('/');
  };

  return (
    <div>
      <div className={styles.tag__wrapper}>
        {location?.state?.tag && <h3>{location?.state?.tag}</h3>}
        <div className={styles.tag__controls}>
          <MyButton onClick={onGoHome}>Main Gallery</MyButton>
          <MyButton onClick={handleColumnChange}>Gallery View</MyButton>
        </div>
      </div>
      {error && <h3>Error fetching photos from Unsplash API: {error}</h3>}
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div
            className={columns ? 'gallery-container-wide' : 'gallery-container'}
          >
            {!error && photos &&
              photos?.map((photo) => (
                <GalleryItem
                  key={photo.id}
                  photo={photo}
                  onClick={handleItemClick}
                />
              ))}
          </div>

          {!error&&<Pagination
            page={currentPage}
            changePage={onChangePage}
            totalPages={totalPages}
          />}
        </div>
      )}
    </div>
  );
};
