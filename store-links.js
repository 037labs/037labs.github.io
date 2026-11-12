const app = window.APP_CATALOG.find((item) => item.slug === document.body.dataset.appSlug);
const playStoreLink = document.querySelector("[data-play-store-link]");

if (app && playStoreLink) {
  const url = window.getPlayStoreUrl(app.playStoreUrl);
  if (url) {
    playStoreLink.href = url;
    playStoreLink.hidden = false;
  }
}
