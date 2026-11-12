const appList = document.querySelector("#app-list");

function renderApp(app) {
  if (!app || typeof app.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(app.slug)
      || typeof app.name !== "string" || typeof app.description !== "string") {
    throw new Error("Une entrée du catalogue apps.js est incomplète ou invalide.");
  }

  const basePath = `apps/${encodeURIComponent(app.slug)}/`;
  const card = document.createElement("article");
  card.className = "app-card";

  const head = document.createElement("div");
  head.className = "app-card-head";
  const monogram = document.createElement("span");
  monogram.className = "app-monogram";
  monogram.setAttribute("aria-hidden", "true");
  monogram.textContent = app.name.trim().charAt(0).toUpperCase() || "A";
  if (typeof app.icon === "string" && app.icon.trim()) {
    const icon = document.createElement("img");
    icon.className = "app-icon";
    icon.src = app.icon;
    icon.alt = "";
    icon.onerror = () => icon.replaceWith(monogram);
    head.append(icon);
  } else {
    head.append(monogram);
  }

  if (typeof app.platform === "string" && app.platform.trim()) {
    const platform = document.createElement("span");
    platform.className = "app-platform";
    platform.textContent = app.platform;
    head.append(platform);
  }

  const title = document.createElement("h3");
  title.textContent = app.name;
  const description = document.createElement("p");
  description.className = "app-description";
  const descriptionFr = document.createElement("span");
  descriptionFr.dataset.lang = "fr";
  descriptionFr.hidden = document.documentElement.lang !== "fr";
  descriptionFr.textContent = app.description;
  const descriptionEn = document.createElement("span");
  descriptionEn.dataset.lang = "en";
  descriptionEn.hidden = document.documentElement.lang !== "en";
  descriptionEn.textContent = app.descriptionEn || app.description;
  description.append(descriptionFr, descriptionEn);
  const links = document.createElement("nav");
  links.className = "app-links";
  links.dataset.labelFr = `Documents pour ${app.name}`;
  links.dataset.labelEn = `Documents for ${app.name}`;
  links.setAttribute("aria-label", document.documentElement.lang === "fr"
    ? links.dataset.labelFr
    : links.dataset.labelEn);
  const makeBilingualLink = (fr, en, href) => {
    const link = document.createElement("a");
    link.href = href;
    const frenchLabel = document.createElement("span");
    frenchLabel.dataset.lang = "fr";
    frenchLabel.hidden = document.documentElement.lang !== "fr";
    frenchLabel.textContent = fr;
    const englishLabel = document.createElement("span");
    englishLabel.dataset.lang = "en";
    englishLabel.hidden = document.documentElement.lang !== "en";
    englishLabel.textContent = en;
    link.append(frenchLabel, englishLabel);
    return link;
  };
  const documentLinks = [
    makeBilingualLink("Présentation", "Overview", basePath),
    makeBilingualLink("Confidentialité", "Privacy", `${basePath}privacy-policy/`),
    makeBilingualLink("Conditions", "Terms", `${basePath}terms/`)
  ];
  if (app.accountDeletion === true) {
    documentLinks.push(makeBilingualLink("Supprimer mon compte", "Delete account", `${basePath}delete-account/`));
  }
  links.append(...documentLinks);
  card.append(head, title, description, links);
  const playStoreUrl = window.getPlayStoreUrl(app.playStoreUrl);
  if (playStoreUrl) {
    const storeLink = document.createElement("a");
    storeLink.className = "button button-store";
    storeLink.href = playStoreUrl;
    storeLink.target = "_blank";
    storeLink.rel = "noopener noreferrer";
    const storeLabelFr = document.createElement("span");
    storeLabelFr.dataset.lang = "fr";
    storeLabelFr.hidden = document.documentElement.lang !== "fr";
    storeLabelFr.textContent = "Voir sur Google Play";
    const storeLabelEn = document.createElement("span");
    storeLabelEn.dataset.lang = "en";
    storeLabelEn.hidden = document.documentElement.lang !== "en";
    storeLabelEn.textContent = "Get it on Google Play";
    storeLink.append(storeLabelFr, storeLabelEn);
    card.append(storeLink);
  }
  return card;
}

function loadApps() {
  try {
    const apps = window.APP_CATALOG;
    if (!Array.isArray(apps)) throw new Error("apps.js doit définir window.APP_CATALOG avec une liste d’applications.");
    if (apps.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-card";
      const icon = document.createElement("span");
      icon.className = "empty-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "+";
      const text = document.createElement("div");
      const title = document.createElement("strong");
      const titleFr = document.createElement("span");
      titleFr.dataset.lang = "fr";
      titleFr.hidden = document.documentElement.lang !== "fr";
      titleFr.textContent = "Aucune application disponible.";
      const titleEn = document.createElement("span");
      titleEn.dataset.lang = "en";
      titleEn.hidden = document.documentElement.lang !== "en";
      titleEn.textContent = "No apps available.";
      title.append(titleFr, titleEn);
      const detail = document.createElement("p");
      const detailFr = document.createElement("span");
      detailFr.dataset.lang = "fr";
      detailFr.hidden = document.documentElement.lang !== "fr";
      detailFr.textContent = "Revenez bientôt pour découvrir nos applications.";
      const detailEn = document.createElement("span");
      detailEn.dataset.lang = "en";
      detailEn.hidden = document.documentElement.lang !== "en";
      detailEn.textContent = "Check back soon to discover our apps.";
      detail.append(detailFr, detailEn);
      text.append(title, detail);
      empty.append(icon, text);
      appList.replaceChildren(empty);
      return;
    }
    appList.replaceChildren(...apps.map(renderApp));
    window.rewriteLocalDirectoryLinks(appList);
  } catch (error) {
    const message = document.createElement("p");
    message.className = "error-card";
    message.textContent = `Le catalogue n’a pas pu être affiché. ${error.message}`;
    appList.replaceChildren(message);
  }
}

document.querySelector("#year").textContent = new Date().getFullYear();
loadApps();
