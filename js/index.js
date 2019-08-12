// On DOM Loaded -> Initialise
document.addEventListener("DOMContentLoaded", initiate);

// Global Variables
let darkMode = matchMedia("(prefers-color-scheme: dark)").matches || true;
let allTags = ["about", "project", "experience", "education", "blog"];
let filters = [];

function initiate() {
  window.addEventListener("resize", initiate);
  window.addEventListener("popstate", initiate);

  let hash = window.location.hash;
  hash = decodeURIComponent(hash);
  // Router
  if (hash && hash !== "") {
    parseHash(hash).forEach(hashFilter => {
      filters.push(hashFilter);
    });
  }

  let query = parseQuery(window.location.search);
  if (query && query.color) {
    if (query.color === "dark") {
      darkMode = true;
    } else if (query.color === "light") {
      darkMode = false;
    }
  }

  buildDOM();
}

function buildDOM() {
  // HEAD
  let title = document.getElementsByTagName("title")[0];
  title.innerText = details.title;
  let colorCSS = document.getElementById("color-css");
  if (darkMode) {
    colorCSS.href = "css/dark.css";
  } else {
    colorCSS.href = "css/light.css";
  }

  // BODY
  let mobileBreakPoint = 1000;
  let Size = {
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

  let BODY = document.getElementById("app");
  BODY.style.height = "100vh";
  BODY.style.width = Size.widthWindow + "px";
  BODY.style.padding = `0`;
  BODY.style.margin = "0";
  BODY.style.backgroundColor = "#F2f2f2";
  BODY.style.fontFamily = "Poppins, Arial, sans-serif";
  BODY.style.fontSize = "16px";
  BODY.style.color = "#1A1A1A";
  BODY.style.overflow = "hidden";
  BODY.style.overflowY = "scroll";

  BODY.innerHTML = "";
  BODY.appendChild(buildLifeline(Size));
  if (Size.isMobile) {
    BODY.appendChild(buildHeadbar(Size));
  } else {
    BODY.appendChild(buildSidebar(Size));
  }
}

// MAIN
function buildLifeline(size) {
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

  articles.forEach(data => {
    let matched = data.tags.some(r => filters.includes(r));
    if (matched || filters.length === 0) {
      let article = new Article(data, size);
      lifeline.appendChild(article.buildArticle());
    }
  });

  return lifeline;
}

// SIDEBAR
function buildSidebar(size) {
  let sidebar = document.createElement("side");
  sidebar.style.width =
    size.widthBody - size.widthMain - 2 * size.spacing + "px";
  sidebar.style.position = "fixed";
  sidebar.style.top = size.spacing * 2 + "px";
  sidebar.style.left = (size.widthWindow - size.widthBody) / 2 + "px";
  sidebar.style.padding = size.spacing + "px";
  sidebar.style.textAlign = "right";

  let headingTitle = document.createElement("div");
  sidebar.appendChild(headingTitle);
  headingTitle.style.margin = "0";
  headingTitle.style.fontFamily = "Kameron, serif";
  headingTitle.style.fontWeight = "bold";
  headingTitle.style.color = "#1A1A1A";
  headingTitle.style.fontSize = "2rem";
  headingTitle.style.lineHeight = "2.5rem";
  headingTitle.style.letterSpacing = "1px";
  headingTitle.style.textTransform = "uppercase";
  headingTitle.style.marginBottom = "1rem";

  headingTitle.innerText = details.title;

  sidebar.appendChild(buildSocialActions(size));
  sidebar.appendChild(buildNavigation(size));
  sidebar.appendChild(buildColorToggle(size));

  return sidebar;
}

function buildSocialActions(size) {
  let sButtons = document.createElement("div");
  sButtons.id = "social-actions";
  sButtons.style.display = "flex";
  sButtons.style.justifyContent = size.isMobile ? "flex-start" : "flex-end";
  sButtons.style.margin = size.radius + "px 0";
  sButtons.style.color = "#1A1A1A";
  sButtons.style.cursor = "pointer";

  details.socialActions.forEach(action => {
    let button = size.isMobile
      ? buildButton(size, action)
      : buildButton(size, action, true);
    sButtons.appendChild(button);

    button.onclick = function() {
      if (action.type === "top") {
        window.scrollTo(0, 0);
      } else {
        if (action.link.includes("mailto")) {
          location.href = action.link;
        } else {
          window.open(action.link, action.target || "_blank");
        }
      }
    };
  });
  return sButtons;
}

function buildButton(size, action, icon = false) {
  let button = document.createElement("div");
  button.id = "social-actionButton";

  button.style.marginLeft = size.isMobile ? "0" : size.radius + "px";
  button.style.marginRight = size.isMobile ? size.radius + "px" : "0";
  button.style.padding = size.radius / 2 + "px " + (size.radius * 3) / 2 + "px";
  button.style.borderRadius = size.radius / 2 + "px";
  button.style.border = "1px solid #1A1A1A";
  button.style.transition = "background-color 0.2s ease";
  button.style.cursor = "pointer";

  let buttonIcon = document.createElement("i");
  if (action.icon && action.icon !== "") {
    button.appendChild(buttonIcon);
    buttonIcon.alt = action.name;
    buttonIcon.title = action.name;
    buttonIcon.className = action.icon;
  }
  if (!icon) {
    if (action.name && action.name !== "") {
      buttonIcon.style.marginRight = "0.5rem";
      let buttonText = document.createElement("span");
      button.appendChild(buttonText);
      buttonText.innerText = action.name;
    }
  }
  button.onmouseover = function() {
    button.classList.add("hover");
    button.style.backgroundColor = "#1A1A1A";
    button.style.border = "1px solid " + "#1A1A1A";
    button.style.color = "#FFFFFF";
  };
  button.onmouseleave = function() {
    button.classList.remove("hover");
    button.style.backgroundColor = "transparent";
    button.style.border = "1px solid " + "#1A1A1A";
    button.style.color = "#1A1A1A";
  };
  return button;
}

function buildNavigation(size) {
  let nav = document.createElement("nav");
  nav.id = "nav-area";
  nav.style.display = "flex";
  nav.style.flexDirection = size.isMobile ? "row" : "column";
  nav.style.flexWrap = "wrap";
  nav.style.justifyContent = "flex-start";
  nav.style.margin = size.spacing / 2 + "px 0";
  nav.style.color = "#1A1A1A";
  nav.style.position = "relative";

  nav.innerHTML = "";
  let posTop = 0;

  let clearButton = document.createElement("div");
  clearButton.id = "clear-button";
  clearButton.style.position = "absolute";
  clearButton.style.top = size.spacing * allTags.length + "px";
  clearButton.style.right = "0";
  clearButton.style.width = "115px";
  clearButton.style.marginBottom = "0.5rem";
  clearButton.style.opacity = "0.7";
  clearButton.style.cursor = "pointer";
  clearButton.style.display = "none";
  clearButton.innerHTML = '<i class="far fa-times-circle"></i> Reset';

  clearButton.onclick = function() {
    filters = [];
    clearButton.style.display = "none";
    setURL();
    initiate();
  };
  if (!size.isMobile) {
    nav.appendChild(clearButton);
  }

  allTags.forEach(tag => {
    let name = tag.charAt(0).toUpperCase() + tag.slice(1);

    let button = buildButton(size, { name: name });
    nav.appendChild(button);
    button.style.position = size.isMobile ? "initial" : "absolute";
    button.style.top = posTop + "px";
    button.style.right = "0";
    button.style.width = size.isMobile ? "100px" : "115px";
    button.style.marginBottom = "0.5rem";

    posTop += size.spacing;

    if (filters.includes(tag)) {
      button.classList.add("active");
      button.style.backgroundColor = "#1A1A1A";
      button.style.border = "1px solid " + "#1A1A1A";
      button.style.color = "#FFFFFF";
      clearButton.style.display = "block";
      button.onmouseleave = function() {};
    }

    button.onclick = function() {
      if (button.classList.contains("active")) {
        button.classList.remove("active");
        button.style.backgroundColor = "transparent";
        button.style.border = "1px solid " + "#1A1A1A";
        button.style.color = "#1A1A1A";
        clearButton.style.display = "none";
        filters = [];
        button.onmouseleave = function() {
          button.classList.remove("hover");
          button.style.backgroundColor = "transparent";
          button.style.border = "1px solid " + "#1A1A1A";
          button.style.color = "#1A1A1A";
        };
      } else {
        button.classList.add("active");
        button.style.backgroundColor = "#1A1A1A";
        button.style.border = "1px solid " + "#1A1A1A";
        button.style.color = "#FFFFFF";
        filters = [];
        filters.push(tag);
        clearButton.style.display = "block";
        button.onmouseleave = function() {};
      }
      setURL();
      initiate();
    };
  });

  return nav;
}

function buildColorToggle(size) {
  let switcher = document.createElement("div");
  switcher.style.position = size.isMobile ? "initial" : "absolute";
  switcher.style.top = "0px";
  switcher.style.right = size.spacing + "px";
  switcher.style.display = "flex";
  switcher.style.justifyContent = size.isMobile ? "flex-start" : "flex-end";
  switcher.style.marginTop = size.isMobile ? size.radius + "px" : "0";

  let modeSwitch = document.createElement("div");
  switcher.appendChild(modeSwitch);
  modeSwitch.className = "onoffswitch";

  let modeInput = document.createElement("input");
  modeSwitch.appendChild(modeInput);
  modeInput.className = "onoffswitch-checkbox";
  modeInput.type = "checkbox";
  modeInput.name = "onoffswitch";
  modeInput.id = "myonoffswitch";
  modeInput.checked = darkMode;

  let modeLabel = document.createElement("label");
  modeSwitch.appendChild(modeLabel);
  modeLabel.className = "onoffswitch-label";
  modeLabel.for = "myonoffswitch";

  let innerSpan = document.createElement("span");
  modeLabel.appendChild(innerSpan);
  innerSpan.className = "onoffswitch-inner";
  let outerSpan = document.createElement("span");
  modeLabel.appendChild(outerSpan);
  outerSpan.className = "onoffswitch-switch";

  modeSwitch.addEventListener("click", function() {
    modeInput.checked = !modeInput.checked;
    if (modeInput.checked) {
      darkMode = true;
      // colorCSS.href = "css/dark.css";
      setUrlParameter("color", "dark");
      initiate();
    } else {
      darkMode = false;
      // colorCSS.href = "css/light.css";
      setUrlParameter("color", "light");
      initiate();
    }
  });
  return switcher;
}

// HEADBAR
function buildHeadbar(size) {
  let headbar = document.createElement("header");
  headbar.style.position = "fixed";
  headbar.style.top = "0px";
  headbar.style.left = "0px";
  headbar.style.right = "0px";
  headbar.style.backgroundColor = `#FFFFFF`;
  headbar.style.height = (size.spacing * 5) / 2 + "px";
  headbar.style.zIndex = "50";

  let headingTitle = document.createElement("div");
  headbar.appendChild(headingTitle);
  headingTitle.style.position = "fixed";
  headingTitle.style.top = size.spacing / 2 + "px";
  headingTitle.style.left = size.spacing + "px";
  headingTitle.style.margin = "0";
  headingTitle.style.fontFamily = "Kameron, serif";
  headingTitle.style.fontWeight = "bold";
  headingTitle.style.color = "#1A1A1A";
  headingTitle.style.fontSize = "1.5rem";
  headingTitle.style.lineHeight = "38px";
  headingTitle.style.letterSpacing = "1px";
  headingTitle.style.textTransform = "uppercase";
  headingTitle.style.marginBottom = "1rem";
  headingTitle.innerText = details.title;

  let menuIcon = document.createElement("div");
  headbar.appendChild(menuIcon);
  menuIcon.style.position = "fixed";
  menuIcon.style.top = size.spacing / 2 + "px";
  menuIcon.style.right = size.spacing + "px";
  menuIcon.appendChild(
    buildButton(size, { icon: "fas fa-bars", name: "Menu" }, true)
  );

  let Menu = buildMenu(size);
  Menu.style.display = "none";

  menuIcon.onclick = function() {
    if (Menu.style.display === "none") {
      Menu.style.display = "block";
      menuIcon.innerHTML = "";
      menuIcon.appendChild(buildButton(size, { icon: "fas fa-times" }, true));
    } else {
      Menu.style.display = "none";
      menuIcon.innerHTML = "";
      menuIcon.appendChild(buildButton(size, { icon: "fas fa-bars" }, true));
    }
  };

  headbar.appendChild(Menu);
  return headbar;
}

function buildMenu(size) {
  let Menu = document.createElement("div");
  Menu.id = "menu";
  Menu.style.position = "fixed";
  Menu.style.top = "60px";
  Menu.style.left = "0px";
  Menu.style.right = "0px";
  Menu.style.backgroundColor = `#FFFFFF`;
  Menu.style.height = "auto";
  Menu.style.zIndex = "0";
  Menu.style.boxShadow = `0 0 ${size.spacing}px 0 rgba(0,0,0,0.1)`;
  Menu.style.position = "relative";
  Menu.style.padding = `${size.spacing / 2}px ${size.spacing}px  ${
    size.spacing
  }px`;

  function divider(text) {
    let divider = document.createElement("div");
    divider.innerText = text;
    divider.style.marginTop = size.radius + "px";
    divider.style.borderBottom = "1px solid #8c8c8c";
    return divider;
  }

  Menu.appendChild(divider("Contact"));
  Menu.appendChild(buildSocialActions(size));

  Menu.appendChild(divider("Navigate"));
  Menu.appendChild(buildNavigation(size));

  Menu.appendChild(divider("Color Mode"));
  Menu.appendChild(buildColorToggle(size));

  return Menu;
}

// Supporting functions
function arrayRemove(arr, value) {
  return arr.filter(function(ele) {
    return ele !== value;
  });
}

function matchColor(tags) {
  if (tags.includes("about")) {
    return details.typeColors.about;
  } else if (tags.includes("project")) {
    return details.typeColors.project;
  } else if (tags.includes("experience")) {
    return details.typeColors.experience;
  } else if (tags.includes("education")) {
    return details.typeColors.education;
  } else if (tags.includes("blog")) {
    return details.typeColors.blog;
  } else return details.typeColors.fallback;
}

function parseHash(queryString) {
  let hashes = [];
  let hashString = (queryString[0] === "#"
    ? queryString.substr(1)
    : queryString
  ).split("#");
  for (let i = 0; i < hashString.length; i++) {
    hashes.push(hashString[i]);
  }
  return hashes;
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
  let hashURL = "";
  if (filters.length > 0) {
    filters.forEach(filter => {
      hashURL += "#" + filter;
    });
  }
  if (hashURL === "") {
    hashURL = "#";
  }
  history.pushState({}, "Siddhant Gupta", queryURL + hashURL);
}

function setUrlParameter(key, value) {
  let params = new URLSearchParams(location.search);
  if (params.has(key)) {
    params.set(key, value);
  } else {
    params.append(key, value);
  }
  console.log([...params.entries()]);
  setURL("?" + params.toString());
}
