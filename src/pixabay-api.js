import axios from 'axios';

export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '39423621-50e8064adb42a79937c7c8fdb';
  constructor() {
    this.q = null;
    this.page = 1;
  }

  fetchPhotosByQuery() {
    const axiosOptions = {
      params: {
        q: this.q,
        page: this.page,
        per_page: 39,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        key: PixabayAPI.API_KEY,
      },
    };

    return axios.get(`${PixabayAPI.BASE_URL}`, axiosOptions);
  }
}
