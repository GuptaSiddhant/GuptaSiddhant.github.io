// SIDEBAR
function buildSidebar() {
  let sidebar = document.createElement("side");
  sidebar.style.width =
    size.widthBody - size.widthMain - 2 * size.spacing + "px";
  sidebar.style.position = "fixed";
  sidebar.style.top = size.spacing * 1 + "px";
  sidebar.style.height = 200 + allTags.length * 40 + "px";
  // sidebar.style.bottom = size.spacing * 1 + "px";
  sidebar.style.left = (size.widthWindow - size.widthBody) / 2 + "px";
  sidebar.style.padding = size.spacing + "px";
  sidebar.style.textAlign = "right";

  let headingTitle = document.createElement("div");
  sidebar.appendChild(headingTitle);
  headingTitle.style.margin = "0";
  headingTitle.style.fontFamily = "Kameron, serif";
  headingTitle.style.fontWeight = "bold";
  headingTitle.style.color = color.primary;
  headingTitle.style.fontSize = "2rem";
  headingTitle.style.lineHeight = "2.5rem";
  headingTitle.style.letterSpacing = "1px";
  headingTitle.style.textTransform = "uppercase";
  headingTitle.style.marginBottom = "1rem";

  headingTitle.innerText = info.title;

  sidebar.appendChild(buildSocialActions());
  sidebar.appendChild(buildNavigation());
  sidebar.appendChild(buildColorToggle());

  return sidebar;
}

function buildSocialActions() {
  let sButtons = document.createElement("div");
  sButtons.id = "social-actions";
  sButtons.style.display = "flex";
  sButtons.style.justifyContent = size.isMobile ? "flex-start" : "flex-end";
  sButtons.style.margin = size.radius + "px 0";
  sButtons.style.color = color.primary;
  sButtons.style.cursor = "pointer";

  info.socialActions.forEach(action => {
    let button = size.isMobile
      ? buildButton(action)
      : buildButton(action, true);
    sButtons.appendChild(button);
    button.id = "social-actionButton";

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

function buildButton(action, icon = false, accent = false) {
  let button = document.createElement("div");

  button.style.marginLeft = size.isMobile ? "0" : size.radius + "px";
  button.style.marginRight = size.isMobile ? size.radius + "px" : "0";
  button.style.padding = size.radius / 2 + "px " + (size.radius * 3) / 2 + "px";
  button.style.borderRadius = size.radius / 2 + "px";
  button.style.border = "1px solid " + color.primary;
  button.style.color = color.primary;
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
    button.style.backgroundColor = accent
      ? matchColor([action.name])
      : color.primary;
    button.style.border = "1px solid " + color.primary;
    button.style.color = accent ? "#FFFFFF" : color.highlight;
  };
  button.onmouseleave = function() {
    button.classList.remove("hover");
    button.style.backgroundColor = "transparent";
    button.style.border = "1px solid " + color.primary;
    button.style.color = color.primary;
  };
  return button;
}

function buildNavigation() {
  let nav = document.createElement("nav");
  nav.id = "nav-area";
  nav.style.display = "flex";
  nav.style.flexDirection = size.isMobile ? "row" : "column";
  nav.style.flexWrap = "wrap";
  nav.style.justifyContent = "flex-start";
  nav.style.margin = size.spacing / 2 + "px 0";
  nav.style.color = color.padding;
  nav.style.position = "relative";

  nav.innerHTML = "";
  let posTop = 0;

  let clearButton = document.createElement("div");
  clearButton.id = "clear-button";
  clearButton.style.position = "absolute";
  clearButton.style.top = size.spacing * allTags.length + "px";
  clearButton.style.right = "0";
  clearButton.style.width = "130px";
  clearButton.style.marginBottom = "0.5rem";
  clearButton.style.opacity = "0.7";
  clearButton.style.cursor = "pointer";
  clearButton.style.display = "none";
  clearButton.innerHTML = '<i class="far fa-times-circle"></i> Clear';

  clearButton.onclick = function() {
    navFilter = "";
    navigation.subNav = false;
    clearButton.style.display = "none";
    setURL();
    initiate();
  };
  if (!size.isMobile) {
    nav.appendChild(clearButton);
  }

  allTags.forEach(tag => {
    let name = tag.charAt(0).toUpperCase() + tag.slice(1);

    let button = buildButton({ name: name }, false, true);
    nav.appendChild(button);
    button.style.position = size.isMobile ? "initial" : "absolute";
    button.style.top = posTop + "px";
    button.style.right = "0";
    button.style.width = size.isMobile ? "100px" : "115px";
    button.style.marginBottom = "0.5rem";

    posTop += size.spacing;

    if (navFilter === tag) {
      button.classList.add("active");
      button.style.backgroundColor = matchColor([tag]);
      button.style.border = "1px solid " + matchColor([tag]);
      button.style.color = "#FFFFFF"; //color.highlight;
      clearButton.style.display = "block";
      button.onmouseleave = function() {};
    }

    button.onclick = function() {
      if (button.classList.contains("active")) {
        button.classList.remove("active");
        button.style.backgroundColor = "transparent";
        button.style.border = "1px solid " + color.primary;
        button.style.color = color.primary;
        clearButton.style.display = "none";
        navFilter = "";
        navigation.subNav = false;
        button.onmouseleave = function() {
          button.classList.remove("hover");
          button.style.backgroundColor = "transparent";
          button.style.border = "1px solid " + color.primary;
          button.style.color = color.primary;
        };
      } else {
        button.classList.add("active");
        button.style.backgroundColor = matchColor([tag]);
        button.style.border = "1px solid " + matchColor([tag]);
        button.style.color = "#FFFFFF";
        navigation.subNav = false;
        navFilter = tag;
        clearButton.style.display = "block";
        button.onmouseleave = function() {};
      }
      setURL();
      initiate();
    };
  });

  return nav;
}

function buildColorToggle() {
  let switcher = document.createElement("div");
  switcher.style.position = size.isMobile ? "initial" : "absolute";
  switcher.style.bottom = "0px";
  switcher.style.right = size.spacing + "px";
  switcher.style.display = "flex";
  switcher.style.flexDirection = "column";
  switcher.style.justifyContent = size.isMobile ? "flex-start" : "flex-end";
  switcher.style.marginTop = size.isMobile ? size.radius + "px" : "0";

  let mode = document.createElement("div");
  switcher.appendChild(mode);
  if (!size.isMobile) {
    let switchLabel = document.createElement("div");
    switcher.appendChild(switchLabel);
    switchLabel.innerHTML = `Dark Mode ${darkMode ? "ON" : "OFF"}`;
    switchLabel.style.opacity = "0.7";
    switchLabel.style.fontSize = "0.8rem";
  }

  let modeLabel = document.createElement("label");
  mode.appendChild(modeLabel);
  modeLabel.classList = "switch";

  let modeInput = document.createElement("input");
  modeLabel.appendChild(modeInput);
  modeInput.type = "checkbox";
  modeInput.name = "onoffswitch";
  modeInput.id = "myonoffswitch";
  modeInput.checked = darkMode;

  let modeSpan = document.createElement("span");
  modeLabel.appendChild(modeSpan);
  modeSpan.classList = "slider round";

  switcher.onclick = function(e) {
    modeInput.checked = !modeInput.checked;
    darkMode = modeInput.checked;
    e.stopPropagation();
    if (darkMode) {
      setUrlParameter("color", "dark");
    } else {
      setUrlParameter("color", "light");
    }
    initiate();
  };
  return switcher;
}

// HEADBAR
function buildHeadbar() {
  let headbar = document.createElement("header");
  headbar.style.position = "fixed";
  headbar.style.top = "0px";
  headbar.style.left = "0px";
  headbar.style.right = "0px";
  headbar.style.backgroundColor = color.card;
  headbar.style.height = (size.spacing * 5) / 2 + "px";
  headbar.style.zIndex = "50";
  headbar.style.boxShadow = `0 0 ${size.spacing}px 0 rgba(0,0,0,${
    darkMode ? 0.5 : 0.2
  })`;

  let headingTitle = document.createElement("div");
  headbar.appendChild(headingTitle);
  headingTitle.style.position = "fixed";
  headingTitle.style.top = size.spacing / 2 + "px";
  headingTitle.style.left = size.spacing + "px";
  headingTitle.style.margin = "0";
  headingTitle.style.fontFamily = "Kameron, serif";
  headingTitle.style.fontWeight = "bold";
  headingTitle.style.color = color.primary;
  headingTitle.style.fontSize = "1.5rem";
  headingTitle.style.lineHeight = "38px";
  headingTitle.style.letterSpacing = "1px";
  headingTitle.style.textTransform = "uppercase";
  headingTitle.style.marginBottom = "1rem";
  headingTitle.style.cursor = "pointer";
  headingTitle.innerText = info.title;
  headingTitle.onclick = function() {
    window.scrollTo(0, 0);
  };

  let menuIcon = document.createElement("div");
  headbar.appendChild(menuIcon);
  menuIcon.style.position = "fixed";
  menuIcon.style.top = size.spacing / 2 + "px";
  menuIcon.style.right = size.spacing + "px";
  menuIcon.appendChild(
    buildButton({ icon: "fas fa-bars", name: "Menu" }, true)
  );

  let Menu = buildMenu();
  Menu.style.display = "none";
  let overlay = document.createElement("div");
  overlay.style.display = "none";
  overlay.style.position = "fixed";
  overlay.style.top = "50px";
  overlay.style.left = "0px";
  overlay.style.right = "0px";
  overlay.style.bottom = "0px";
  overlay.style.backgroundColor = "#000000";
  overlay.style.opacity = "0.5";
  overlay.style.zIndex = "20";

  menuIcon.onclick = function() {
    if (Menu.style.display === "none") {
      Menu.style.display = "block";
      menuIcon.innerHTML = "";
      menuIcon.appendChild(buildButton({ icon: "fas fa-times" }, true));
      overlay.style.display = "block";
    } else {
      Menu.style.display = "none";
      menuIcon.innerHTML = "";
      menuIcon.appendChild(buildButton({ icon: "fas fa-bars" }, true));
      overlay.style.display = "none";
    }
  };
  headbar.appendChild(overlay);
  headbar.appendChild(Menu);
  return headbar;
}

function buildMenu() {
  let Menu = document.createElement("div");
  Menu.id = "menu";
  Menu.style.position = "fixed";
  Menu.style.top = "50px";
  Menu.style.left = "0px";
  Menu.style.right = "0px";
  Menu.style.backgroundColor = color.card;
  Menu.style.height = "auto";
  Menu.style.zIndex = "50";
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
  Menu.appendChild(buildSocialActions());

  Menu.appendChild(divider("Navigate"));
  Menu.appendChild(buildNavigation());

  Menu.appendChild(divider(`Dark Mode - ${darkMode ? "ON" : "OFF"}`));
  Menu.appendChild(buildColorToggle());

  return Menu;
}
