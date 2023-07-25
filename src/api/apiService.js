import axios from 'axios';
import { BASE_URL } from '../constants/config';

const API_KEY = process.env.REACT_APP_API_KEY;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

export const fetchPictures = async (page = 1, perPage = 10) => {
  const url = `${BASE_URL}photos?client_id=${API_KEY}&page=${page}&per_page=${perPage}`;

  const response = await instance.get(url);

  return response;
};

export const fetchPictureById = async (pictureId = '') => {
  const url = `${BASE_URL}photos/${pictureId}?client_id=${API_KEY}`;

  const response = await instance.get(url);

  return response;
};

export const searchPictures = async (
  searchQuery = '',
  page = 1,
  perPage = 10
) => {
  const url = `${BASE_URL}search/photos?client_id=${API_KEY}&query=${searchQuery}&page=${page}&per_page=${perPage}`;

  const response = await instance.get(url);

  return response;
};
