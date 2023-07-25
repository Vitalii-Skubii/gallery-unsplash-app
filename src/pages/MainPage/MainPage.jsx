import React, { useState, useEffect } from 'react';
import { fetchPictures, searchPictures } from '../../api/apiService';
import GalleryItem from '../../components/GalleryItem/GalleryItem';
import { Pagination } from '../../components/Pagination/Pagination';
import { getPagesCount } from '../../utils/pages';
import { MyButton } from '../../components/MyButton/MyButton';
import { useNavigate } from 'react-router-dom';
import MyInput from '../../components/MyInput/MyInput';
import { Loader } from '../../components/Loader/Loader';
import styles from './MainPage.module.css';

export const MainPage = () => {
  const navigation = useNavigate();

  const [photos, setPhotos] = useState([]);
  const [columns, setColumns] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPhotos = async (page) => {
    try {
      setError('');
      setIsLoading(true);
      const response = await fetchPictures(page);
      setPhotos(response.data);
      const totalCount = response.headers['x-total'];
      setTotalPages(getPagesCount(totalCount, 10));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching photos from Unsplash API:', error.message);
      setIsLoading(false);
      setError(error.message);
    }
  };

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
      console.error('Error fetching photos from Unsplash API:', error.message);
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPhotos(currentPage);
  }, []);

  const onInputChange = (event) => {
    setCurrentPage(1);
    setSearchValue(event.target.value);
  };

  const handleSearchPhotos = (page) => {
    if (searchValue) {
      searchPhotos(searchValue, page);
    } else {
      fetchPhotos(typeof page == 'number' ? page : 1);
    }
  };

  const handleColumnChange = () => {
    setColumns((prevState) => !prevState);
  };

  const onChangePage = async(page) => {
    await setCurrentPage(page);
    handleSearchPhotos(page);
  };

  const handleItemClick = (photo) => {
    navigation(`picture/${photo.id}`);
  };

  return (
    <div>
      <div className={styles.controls}>
        <div className={styles.search__wrapper}>
          <MyInput onChange={onInputChange} placeholder="Search..." />
          <MyButton onClick={handleSearchPhotos}>Search</MyButton>
        </div>
        <MyButton onClick={handleColumnChange}>Gallery View</MyButton>
      </div>
      {error && <h3>Error fetching photos from Unsplash API: {error}</h3>}
      {isLoading ? (
        <Loader />
      ) : photos && photos.length === 0 ? (
        <h4 className={styles.no__results}>
          Nothing was found for your request
        </h4>
      ) : (
        <div>
          <div
            className={columns ? 'gallery-container-wide' : 'gallery-container'}
          >
            {photos && !error &&
              photos?.map((photo) => (
                <GalleryItem
                  key={photo.id}
                  photo={photo}
                  onClick={handleItemClick}
                />
              ))}
          </div>
          {!error &&<Pagination
            page={currentPage}
            changePage={onChangePage}
            totalPages={totalPages}
          />}
        </div>
      )}
    </div>
  );
};
