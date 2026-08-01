sessionStorage.setItem("commitHash", "7a9e810aa22a9909ddb95925a37a2d45f4781991"); // commit hash injected here, see: scripts/pre-build/install-feedback-sys-frontend

function matchColor() {
  const palettle = localStorage.getItem("/.__palette");
  if (
    (palettle !== null && JSON.parse(palettle)?.color?.scheme !== "default") ||
    (palettle === null && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("review_dark_mode");
  } else {
    document.documentElement.classList.remove("review_dark_mode");
  }
}

function hookMkdocsMaterial() {
  document.querySelector(".md-header__option").addEventListener("click", e => {
    if (!(e.target instanceof HTMLInputElement)) return;
    setTimeout(matchColor, 0); // wait for the theme to be applied
  });
}

hookMkdocsMaterial();

document$.subscribe(function () {
  matchColor();

  globalThis["OIWikiFeedbackSysFrontend"] instanceof Object &&
    OIWikiFeedbackSysFrontend.setupReview instanceof Function &&
    OIWikiFeedbackSysFrontend.setupReview(document.body, {
      apiEndpoint: "https://feedback-sys.mgt.moe/" // api endpoint injected here, see: scripts/pre-build/install-feedback-sys-frontend
    });
});
