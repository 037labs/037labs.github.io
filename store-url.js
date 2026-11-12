window.getPlayStoreUrl = function (value) {
  if (typeof value !== "string" || value.trim() === "") return null;

  const url = new URL(value);
  if (url.protocol !== "https:" || url.hostname !== "play.google.com"
      || url.pathname !== "/store/apps/details" || !url.searchParams.get("id")) {
    throw new Error("Le lien Play Store doit être une URL https://play.google.com/store/apps/details?id=...");
  }
  return url.href;
};
