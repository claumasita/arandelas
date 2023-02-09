// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem("darkMode");
const togButton = document.querySelector("#toggle-button");

const enableDarkMode = () => {
  // 1. Add the class to the Toggle & update colors
  togButton.classList.add("theme-toggle--toggled");
  setColors("true");
  // 2. Update darkMode in localStorage
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  // 1. Remove the class from the Toggle & update colors
  togButton.classList.remove("theme-toggle--toggled");
  setColors();
  // 2. Update darkMode in localStorage
  localStorage.setItem("darkMode", null);
};

// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === "enabled") {
    enableDarkMode();
} else {
    disableDarkMode();
}

togButton.addEventListener("click", darkmode);

function darkmode() {
  // get their darkMode setting
  darkMode = localStorage.getItem("darkMode");
  // if it not current enabled, enable it
  if (darkMode !== "enabled") {
    enableDarkMode();
    // if it has been enabled, turn it off
  } else {
    disableDarkMode();
  }
}

function setColors(darkmode) {
    if (darkmode === "true") {
        document.documentElement.style.setProperty("--colors-nav","var(--colors-drk-nav)");
        document.documentElement.style.setProperty("--colors-brand","var(--colors-drk-brand)");
        document.documentElement.style.setProperty("--colors-p","var(--colors-drk-p)");
        document.documentElement.style.setProperty("--colors-titles","var(--colors-drk-titles)");
        document.documentElement.style.setProperty("--colors-a","var(--colors-drk-a)");
        document.documentElement.style.setProperty("--colors-header","var(--colors-drk-header)");
        document.documentElement.style.setProperty("--colors-header-text","var(--colors-drk-header-text)");
        document.documentElement.style.setProperty("--colors-section-odd","var(--colors-drk-section-odd)");
        document.documentElement.style.setProperty("--colors-section-even","var(--colors-drk-section-even)");
    } else {
        document.documentElement.style.setProperty("--colors-nav","var(--colors-li-nav)");
        document.documentElement.style.setProperty("--colors-brand","var(--colors-li-brand)");
        document.documentElement.style.setProperty("--colors-p","var(--colors-li-p)");
        document.documentElement.style.setProperty("--colors-titles","var(--colors-li-titles)");
        document.documentElement.style.setProperty("--colors-a","var(--colors-li-a)");
        document.documentElement.style.setProperty("--colors-header","var(--colors-li-header)");
        document.documentElement.style.setProperty("--colors-header-text","var(--colors-li-header-text)");
        document.documentElement.style.setProperty("--colors-section-odd","var(--colors-li-section-odd)");
        document.documentElement.style.setProperty("--colors-section-even","var(--colors-li-section-even)");
    }
}
