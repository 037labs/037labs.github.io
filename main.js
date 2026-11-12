const appList = document.querySelector("#app-list");

function makeLink(label, href) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = label;
  return link;
}

function renderApp(app) {
  if (!app || typeof app.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(app.slug)
      || typeof app.name !== "string" || typeof app.description !== "string") {
    throw new Error("Une entrée de apps.json est incomplète ou invalide.");
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
  head.append(monogram);

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
  description.textContent = app.description;
  const links = document.createElement("nav");
  links.className = "app-links";
  links.setAttribute("aria-label", `Documents pour ${app.name}`);
  const documentLinks = [
    makeLink("Présentation", basePath),
    makeLink("Confidentialité", `${basePath}privacy-policy/`),
    makeLink("Conditions", `${basePath}terms/`)
  ];
  if (app.accountDeletion === true) {
    documentLinks.push(makeLink("Supprimer mon compte", `${basePath}delete-account/`));
  }
  links.append(...documentLinks);
  card.append(head, title, description, links);
  return card;
}

async function loadApps() {
  try {
    const response = await fetch("apps.json");
    if (!response.ok) throw new Error(`Impossible de charger apps.json (${response.status}).`);
    const apps = await response.json();
    if (!Array.isArray(apps)) throw new Error("apps.json doit contenir une liste d’applications.");
    if (apps.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-card";
      const icon = document.createElement("span");
      icon.className = "empty-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "+";
      const text = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = "Votre catalogue est prêt.";
      const detail = document.createElement("p");
      detail.textContent = "Ajoutez une première application dans apps.json ; ses liens vers les documents apparaîtront ici.";
      text.append(title, detail);
      empty.append(icon, text);
      appList.replaceChildren(empty);
      return;
    }
    appList.replaceChildren(...apps.map(renderApp));
  } catch (error) {
    const message = document.createElement("p");
    message.className = "error-card";
    message.textContent = `Le catalogue n’a pas pu être affiché. ${error.message}`;
    appList.replaceChildren(message);
  }
}

document.querySelector("#year").textContent = new Date().getFullYear();
loadApps();
