// Global Variables
let darkMode = matchMedia("(prefers-color-scheme: dark)").matches || false;
let navFilter = "";
let mobileBreakPoint = 1000;
let scrollPosition = 0;
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
    router();
    buildDOM();

    window.scrollTo(0, scrollPosition);
    document.body.onscroll = function () {
        scrollPosition = document.body.scrollTop;
    };

    window.addEventListener("resize", initiate);
    window.addEventListener("popstate", initiate);

    document.onkeypress = function (e) {
        e = e || window.event;
        keyboardInput(e);
    };
}

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

function router() {
    let query = parseQuery(window.location.search);
    if (query && query.color) {
        if (query.color === "dark") {
            darkMode = true;
        } else if (query.color === "light") {
            darkMode = false;
        }
    }

    if (articles[0].tags[0] === 'error') {
        articles.shift();
    }

    let hash = window.location.hash;
    hash = decodeURIComponent(hash);
    // Router
    let notFound = false;
    let errorText = "";

    if (hash && hash !== "") {
        if (hash.includes("#404/")) {
            notFound = true;
            errorText = hash.split("/")[0];

            if (errorText && errorText !== '') {
                if (errorText.includes('?color=')) {
                    let colorQuery = errorText.split('=')[1];
                    colorQuery = colorQuery.split('#')[0];
                    colorQuery = colorQuery.split('/')[0];
                    if (colorQuery === 'dark') {
                        darkMode = true;
                        // setUrlParameter('color', 'dark');
                    } else {
                        darkMode = false;
                        // setUrlParameter('color', 'light');
                    }
                }
            }
            let otherHash = hash;
            hash = '#' + otherHash.split('/')[1];
            if (otherHash.split('/')[2] && otherHash.split('/')[2] !== '') {
                hash += '/' + otherHash.split('/')[2];
            }
        }

        // Main Nav
        let hashParts = hash.split("/");
        let nav = hashParts[0].split("#")[1];
        if (allTags.includes(nav)) {
            notFound = false;
            navFilter = nav;
        }
        // Sub Nav
        if (hashParts[1]) {

            navigation.subNav = true;
            navigation.subFilter = navFilter;
            navigation.subURL = hashParts[1];
        }
    }

    if (notFound) {
        articles.unshift({
            title: "Page not Found",
            icon: 'fas fa-exclamation-circle',
            pinned: true,
            tags: ["error", "404"],
            summary: `The page you are looking for might have been removed, had its name changed or is temporarily available. There are 3 things that can be done:<br><br>
                1. You can either check the URL for any errors. <br>
                2. Explore the website by using the navigation or scrolling downwards <i class="fas fa-arrow-down"></i>.<br>
                3. Contact me and reach your preferred destination as a VIP.`
        })
    } else if (errorText.includes('?color=')) {
        if (darkMode === true) {
            setUrlParameter('color', 'dark');
        } else {
            setUrlParameter('color', 'light');
        }
    } else {
        setURL();
    }
}

function buildDOM() {
    // HEAD
    let title = document.getElementById("app-title");
    let titleOG = document.getElementById("og-title");
    let titleTwitter = document.getElementById("twitter-title");
    title.innerText = info.title;
    titleOG.content = info.title;
    titleTwitter.content = info.title;
    if (navFilter !== '') {
        let name = navFilter.charAt(0).toUpperCase() + navFilter.slice(1);
        title.innerText = 'GS ' + name;
        titleOG.content = 'GS ' + name;
        titleTwitter.content = 'GS ' + name;
    }
    let descOG = document.getElementById('og-desc');
    let descTwitter = document.getElementById('twitter-desc');
    descOG.content = info.description;
    descTwitter.content = info.description;

    let imageOG = document.getElementById('og-image');
    let imageTwitter = document.getElementById('twitter-image');
    imageOG.content = info.image;
    imageTwitter.content = info.image;


    // BODY
    size = {
        isMobile: window.innerWidth < mobileBreakPoint,
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
        let dObj = findArticlesOBJ("url", navigation.subURL);
        if (dObj) {
            if (dObj.tags.includes(navigation.subFilter)) {
                let article = new Article(dObj);
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
            if (matched || navFilter === "" || data.pinned) {
                let article = new Article(data);
                lifeline.appendChild(article.buildSummaryCard());
            }
        });
    }

    return lifeline;
}

// Supporting functions
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