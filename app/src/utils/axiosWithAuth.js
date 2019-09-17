import axios from 'axios';

export const axiosWithAuth = () => {

  return axios.create({
      withCredentials: true
  })
}