export function renderPhotos(photoArr) {
  const markup = photoArr
    .map(photo => {
      return `<div class="photo-card">
      <a class="gallery_link" href="${photo.largeImageURL}">
  <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
      </a>
  <div class="info">
    <p class="info-item">
      <b> Likes: </b><br/>${photo.likes}
    </p>
    <p class="info-item">
      <b>Views: </b><br/>${photo.views}
    </p>
    <p class="info-item">
      <b>Comments: </b><br/>${photo.comments}
    </p>
    <p class="info-item">
      <b>Downloads: </b><br/>${photo.downloads}
    </p>
  </div>
</div>`;
    })
    .join('');

  return markup;
}
