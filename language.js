const languageToggle = document.querySelector(".language-toggle");
const supportedLanguages = ["fr", "en"];

window.rewriteLocalDirectoryLinks = function (root = document) {
  if (window.location.protocol !== "file:") return;

  root.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) return;

    const url = new URL(href, window.location.href);
    if (url.protocol === "file:" && url.pathname.endsWith("/")) {
      url.pathname += "index.html";
      link.href = url.href;
    }
  });
};

function setLanguage(language) {
  const selectedLanguage = supportedLanguages.includes(language) ? language : "fr";
  document.documentElement.lang = selectedLanguage;
  document.querySelectorAll("[data-lang]").forEach((element) => {
    element.hidden = element.dataset.lang !== selectedLanguage;
  });
  document.querySelectorAll("[data-label-fr][data-label-en]").forEach((element) => {
    element.setAttribute(
      "aria-label",
      selectedLanguage === "fr" ? element.dataset.labelFr : element.dataset.labelEn
    );
  });

  if (document.body.dataset.titleFr && document.body.dataset.titleEn) {
    document.title = selectedLanguage === "fr"
      ? document.body.dataset.titleFr
      : document.body.dataset.titleEn;
  }

  if (languageToggle) {
    const nextLanguage = selectedLanguage === "fr" ? "en" : "fr";
    languageToggle.textContent = nextLanguage.toUpperCase();
    languageToggle.setAttribute(
      "aria-label",
      selectedLanguage === "fr" ? "Switch the site to English" : "Passer le site en français"
    );
    languageToggle.title = selectedLanguage === "fr" ? "English" : "Français";
  }
}

let savedLanguage = "fr";
try {
  savedLanguage = localStorage.getItem("037labs-language") || "fr";
} catch (error) {
  if (!(error instanceof DOMException)) throw error;
}

setLanguage(savedLanguage);
window.rewriteLocalDirectoryLinks();
languageToggle?.addEventListener("click", () => {
  const nextLanguage = document.documentElement.lang === "fr" ? "en" : "fr";
  setLanguage(nextLanguage);
  try {
    localStorage.setItem("037labs-language", nextLanguage);
  } catch (error) {
    if (!(error instanceof DOMException)) throw error;
  }
});
