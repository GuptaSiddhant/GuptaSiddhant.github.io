// Global Variables
let darkMode = matchMedia("(prefers-color-scheme: dark)").matches || true;
let navFilter = "";
let mobileBreakPoint = 1000;
let allTags = [];
info.tags.forEach(tag => {
  tag.name !== "other" ? allTags.push(tag.name) : null;
});
let size, color;
let navigation = {
  subNav: false,
  subFilter: "",
  subURL: ""
};

// On DOM Loaded -> Initialise
document.addEventListener("DOMContentLoaded", initiate);
function initiate() {
  window.addEventListener("resize", initiate);
  window.addEventListener("popstate", initiate);

  let query = parseQuery(window.location.search);
  if (query && query.color) {
    if (query.color === "dark") {
      darkMode = true;
    } else if (query.color === "light") {
      darkMode = false;
    }
  }

  let hash = window.location.hash;
  hash = decodeURIComponent(hash);
  // Router
  if (hash && hash !== "") {
    // Main Nav
    let hashParts = hash.split("/");
    let nav = hashParts[0].split("#")[1];
    if (allTags.includes(nav)) {
      navFilter = nav;
    }
    // Sub Nav
    if (hashParts[1]) {
      navigation.subNav = true;
      navigation.subFilter = navFilter;
      navigation.subURL = hashParts[1];
    }
  }

  buildDOM();
}

function buildDOM() {
  // HEAD
  let title = document.getElementsByTagName("title")[0];
  title.innerText = info.title;

  // BODY
  size = {
    isMobile: window.innerWidth < mobileBreakPoint ? true : false,
    widthWindow: window.innerWidth,
    widthBody:
      window.innerWidth > mobileBreakPoint
        ? mobileBreakPoint
        : window.innerWidth,
    widthMain: window.innerWidth > mobileBreakPoint ? 700 : window.innerWidth,
    spacing: window.innerWidth > mobileBreakPoint ? 40 : 24,
    radius: 8
  };
  color = {
    primary: darkMode ? "#E6E6E6" : "#1A1A1A",
    secondary: darkMode ? "#B3B3B3" : "#4D4D4D",
    inverse: darkMode ? "#FFFFFF" : "#000000",
    highlight: darkMode ? "#000000" : "#FFFFFF",
    background: darkMode ? "#000000" : "#F2F2F2",
    card: darkMode ? "#222222" : "#FFFFFF"
  };
  let BODY = document.getElementById("app");
  BODY.style.height = "100vh";
  BODY.style.width = size.widthWindow + "px";
  BODY.style.padding = `0`;
  BODY.style.margin = "0";
  BODY.style.backgroundColor = color.background;
  BODY.style.fontFamily = "Poppins, Arial, sans-serif";
  BODY.style.fontSize = "16px";
  BODY.style.color = color.primary;

  BODY.innerHTML = "";
  if (size.isMobile) {
    BODY.appendChild(buildHeadbar());
  } else {
    BODY.appendChild(buildSidebar());
  }

  BODY.appendChild(buildLifeline());
}

// MAIN
function buildLifeline() {
  let lifeline = document.createElement("main");
  lifeline.id = "lifeline";
  lifeline.style.width = size.widthMain + "px";
  lifeline.style.paddingTop = size.spacing + "px";
  lifeline.style.paddingBottom = size.spacing + "px";
  if (size.widthWindow > size.widthBody) {
    lifeline.style.marginLeft =
      (size.widthWindow + size.widthBody) / 2 - size.widthMain + "px";
    // `calc((100vw + ${size.widthBody}px) / 2 - ${size.widthMain}px)`;
  }
  if (size.isMobile) {
    lifeline.style.paddingTop = "80px";
  }

  if (navigation.subNav && navigation.subFilter === navFilter) {
    let dObj = findDetailsOBJ("url", navigation.subURL);
    if (dObj) {
      if (dObj.tags.includes(navigation.subFilter)) {
        let article = new Article(dObj);
        console.log(dObj);
        lifeline.appendChild(article.buildFullArticle());
      } else {
        navigation.subNav = false;
        buildDOM();
      }
    } else {
      navigation.subNav = false;
      buildDOM();
    }
  } else {
    articles.forEach(data => {
      let matched = data.tags.some(r => navFilter === r);
      if (matched || navFilter === "") {
        let article = new Article(data);
        lifeline.appendChild(article.buildSummaryCard());
      }
    });
  }

  return lifeline;
}

// Supporting functions
function arrayRemove(arr, value) {
  return arr.filter(function(ele) {
    return ele !== value;
  });
}

function findDetailsOBJ(key, val) {
  return details.find(obj => obj[key] === val);
}

function findInfoOBJ(key, val) {
  return info.tags.find(obj => obj[key] === val);
}

function matchColor(tags) {
  for (var i = 0; i < tags.length; i++) {
    tags[i] = tags[i].toLowerCase();
  }
  let matches = allTags.filter(x => tags.includes(x));
  if (matches[0] && matches[0] !== "") {
    return findInfoOBJ("name", matches[0]).color;
  } else {
    return findInfoOBJ("name", "other").color;
  }
}

function matchIcon(tags) {
  for (var i = 0; i < tags.length; i++) {
    tags[i] = tags[i].toLowerCase();
  }
  let matches = allTags.filter(x => tags.includes(x));
  if (matches[0] && matches[0] !== "") {
    return findInfoOBJ("name", matches[0]).icon;
  } else {
    return findInfoOBJ("name", "other").icon;
  }
}

function parseQuery(queryString) {
  let query = {};
  let pairs = (queryString[0] === "?"
    ? queryString.substr(1)
    : queryString
  ).split("&");
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
}

function setURL(queryURL = "") {
  let hashURL = "#";
  if (navFilter !== "") {
    hashURL += navFilter;
    if (navigation.subNav && navigation.subFilter === navFilter) {
      hashURL += "/" + navigation.subURL;
    }
  }
  history.pushState({}, info.title, queryURL + hashURL);
}

function setUrlParameter(key, value) {
  let params = new URLSearchParams(location.search);
  if (params.has(key)) {
    params.set(key, value);
  } else {
    params.append(key, value);
  }
  // [...params.entries()];
  setURL("?" + params.toString());
}
