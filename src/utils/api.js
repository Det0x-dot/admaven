

import axios from 'axios';

const API_BASE_URL = 'https://publishers.ad-maven.com/api/public/content_locker'; // Replace with actual API URL

export const postContentLocker = async (data) => {
  const token = 'c748af94d49fee5317b3c0a4717f3d8d48e4a5ad3f63c6431513fec1c2d7e97d'; // Replace with your actual API token
  try {
    const response = await axios.post(API_BASE_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};