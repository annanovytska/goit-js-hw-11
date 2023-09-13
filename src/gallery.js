import { PixabayAPI } from './pixabay-api';
import { renderPhotos } from './render';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formEl: document.querySelector('#search-form'),
  divPhotoWrapper: document.querySelector('.js-gallery'),
  loadMoreBtnEl: document.querySelector('.js-load-more'),
};

const pixabayAPI = new PixabayAPI();
const simple = new SimpleLightbox('.gallery a');

refs.formEl.addEventListener('submit', onFormElSubmit);

async function onFormElSubmit(event) {
  event.preventDefault();
  const value = event.target.elements.searchQuery.value.trim();
  pixabayAPI.q = value;

  // Скинула page до початкового значення після того, як наклікала
  pixabayAPI.page = 1;

  try {
    const { data } = await pixabayAPI.fetchPhotosByQuery();
    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.divPhotoWrapper.innerHTML = '';
      refs.loadMoreBtnEl.classList.add('is-hidden');
      event.target.reset();

      return;
    }

    if (data.totalHits < 40) {
      refs.divPhotoWrapper.innerHTML = renderPhotos(data.hits);
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      refs.loadMoreBtnEl.classList.add('is-hidden');
      return;
    }
    refs.divPhotoWrapper.innerHTML = renderPhotos(data.hits);
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    simple.refresh();
    refs.loadMoreBtnEl.classList.remove('is-hidden');
  } catch (err) {
    console.log(err);
  }
}

refs.loadMoreBtnEl.addEventListener('click', onLoadmoreBtnClick);

async function onLoadmoreBtnClick(event) {
  pixabayAPI.page += 1;

  try {
    const { data } = await pixabayAPI.fetchPhotosByQuery();
    refs.divPhotoWrapper.insertAdjacentHTML(
      'beforeend',
      renderPhotos(data.hits)
    );
    simple.refresh();

    if (Math.ceil(data.totalHits / 40) < pixabayAPI.page) {
      refs.loadMoreBtnEl.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (err) {
    console.log(err);
  }
}
