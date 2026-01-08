import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://201.77.115.146:11000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});