 import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

const PER_PAGE = 15;
let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    hideLoader();
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({ message: 'No images found.', position: 'topRight' });
      return;
    }

    createGallery(data.hits);
    if (totalHits > page * PER_PAGE) {
      showLoadMoreButton();
    }
  } catch {
    iziToast.error({ message: 'Error fetching images.', position: 'topRight' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton(); // приховати одразу, щоб уникнути подвійних кліків
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);

    if (page * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }

    scrollByCardHeight();
  } catch {
    iziToast.error({ message: 'Error loading more images.', position: 'topRight' });
  } finally {
    hideLoader();
  }
});

function scrollByCardHeight() {
  const card = document.querySelector('.gallery__item');
  if (card) {
    const { height } = card.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: 'smooth' });
  }
}
