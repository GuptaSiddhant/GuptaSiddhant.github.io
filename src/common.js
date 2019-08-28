
// Supporting functions
function keyboardInput(e) {
    // console.log(e);
    let code = e.code;
    switch (code) {
        case 'KeyD':
            switchDarkMode(e);
            e.stopPropagation();
            break;
        case 'KeyC':
            clearAll();
            e.stopPropagation();
            break;
        case 'KeyK':
            toggleShortcutDrawer();
            e.stopPropagation();
            break;
        case 'KeyF':
            alert('Find function coming soon.');
            e.stopPropagation();
            break;
        default:
            info.tags.forEach((tag) => {
                if (tag.code && tag.code === code) {
                    navButtonClick(tag.name);
                }
            });
            e.stopPropagation();
            break;
    }
}

function navButtonClick(tag) {
    navFilter = tag;
    scrollPosition = 0;
    setURL();
    initiate();
}

function clearAll () {
    navFilter = "";
    navigation.subNav = false;
    setURL();
    initiate();
}

function switchDarkMode(e) {
    darkMode = !darkMode;
    if (darkMode) {
        setUrlParameter("color", "dark");
    } else {
        setUrlParameter("color", "light");
    }
    initiate();
}

function toggleShortcutDrawer() {
    if (!shortcutDrawerOpen) {
        shortcutDrawerOpen = true;
        shortcutDrawerButton.innerHTML = `Shortcuts <i class="fas fa-times-circle"></i>`;
        animateSize(shortcutDrawerViewer, 'height', 0, shortcutDrawerHeight, 20);
    } else {
        shortcutDrawerOpen = false;
        shortcutDrawerButton.innerHTML = `Shortcuts <i class="fas fa-arrow-up"></i>`;
        animateSize(shortcutDrawerViewer, 'height', shortcutDrawerHeight, 0, -20);
    }
}

function animateSize(elem, prop, init, final, step = 10) {
    let x = init;
    function frame() {
        x += step;
        elem.style[prop] = x + 'px';
        if (x === final) clearInterval(id);
    }
    let id = setInterval(frame, 10);
}

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele !== value;
    });
}

function findArticlesOBJ(key, val) {
    return articles.find(obj => obj[key] === val);
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
    let newURL = queryURL + hashURL;
    history.pushState({}, info.title, newURL);
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

function invertColor(hex, bw = true) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#1A1A1A'
            : '#FFFFFF';
    }
    // invert color components
    // r = (255 - r).toString(16);
    // g = (255 - g).toString(16);
    // b = (255 - b).toString(16);
    // // pad each with zeros and return
    // return "#" + padZero(r) + padZero(g) + padZero(b);
}