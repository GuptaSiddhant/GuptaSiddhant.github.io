// Global Variables
let darkMode = matchMedia("(prefers-color-scheme: dark)").matches || false;
let navFilter = "";
let mobileBreakPoint = 1000;
let scrollPosition = 0;
let allTags = [];
info.tags.forEach(tag => {
    tag.name !== "other" ? allTags.push(tag.name) : null;
});
let searchText = ``;
let size, color;
let navigation = {
    subNav: false,
    subFilter: "",
    subURL: ""
};
let shortcutDrawerOpen;
let shortcutDrawerButton = document.createElement('div');
let shortcutDrawerViewer = document.createElement('div');
let shortcutDrawerHeight = 180;

// On DOM Loaded -> Initialise
document.addEventListener("DOMContentLoaded", initiate);

function initiate() {

    window.addEventListener("popstate", initiate);
    window.addEventListener("resize", buildDOM);
    shortcutDrawerOpen = false;

    router();
    buildDOM();

    document.onkeypress = function (e) {
        e = e || window.event;
        // Ignore Alt, Ctrl, Shift, AltGraph, Command/Windows combinations
        if (!e.altKey && !e.ctrlKey && !e.shiftKey && !e.altGraphKey && !e.metaKey) {
            //Check if search is in focus
            if (searchInput !== document.activeElement) {
                e.preventDefault();
                keyboardInput(e);
            }
        }
    };
}

function router() {
    let query = parseQuery(window.location.search);
    if (query) {
        if (query.color) {
            if (query.color === "dark") {
                darkMode = true;
            } else if (query.color === "light") {
                darkMode = false;
            }
        }
        if (query.search) {
            searchText = query.search.toLowerCase();
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
        });
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
        BODY.appendChild(buildShortcutViewer());
    }

    BODY.appendChild(buildLifeline());

    window.scrollTo(0, scrollPosition);
    document.body.onscroll = function () {
        scrollPosition = document.body.scrollTop;
    };
}

// MAIN
function buildLifeline() {
    let emptyLine = true;

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
                emptyLine = false;
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
            let hashMatch = data.tags.some(r => navFilter === r);
            let searchMatch = data.title.toLowerCase().includes(searchText) || data.subtitle && data.subtitle.toLowerCase().includes(searchText) || data.tags.some(r => r.toLowerCase().includes(searchText)) || data.tech && data.tech.some(r => r.toLowerCase().includes(searchText));

            if (hashMatch || navFilter === "" || data.pinned) {
                if (searchText === '') {
                    let article = new Article(data);
                    emptyLine = false;
                    lifeline.appendChild(article.buildSummaryCard());
                } else if (searchMatch) {
                    let article = new Article(data);
                    emptyLine = false;
                    lifeline.appendChild(article.buildSummaryCard());
                }
            }
        });
    }

    if (emptyLine) {
        let article = new Article({
            title: "No results found!",
            icon: 'fas fa-exclamation-circle',
            pinned: true,
            tags: ["error"],
            summary: `You're quite deep into the rabbit hole and there is nothing here.<br> <br>
                Few possible next steps:<br>
                1. Try searching for something else or selecting some other navigation option.<br>
                2. Try clearing all search criteria and selected navigation option (Press C). <br>
                3. Contact me and find your preferred item as a VIP.`
        });
        lifeline.appendChild(article.buildSummaryCard());
    }

    return lifeline;
}

// Bottom Drawer
function buildShortcutViewer() {
    let container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '0';
    container.style.width = '100%';
    container.style.zIndex = '100';

    container.appendChild(shortcutDrawerButton);
    shortcutDrawerButton.style.backgroundColor = color.card;
    shortcutDrawerButton.style.color = color.primary;
    shortcutDrawerButton.style.width = '140px';
    shortcutDrawerButton.style.borderRadius = `${size.radius}px ${size.radius}px 0 0`;
    shortcutDrawerButton.style.height = `${size.spacing}px`;
    shortcutDrawerButton.style.lineHeight = `${size.spacing}px`;
    shortcutDrawerButton.style.textAlign = 'center';
    shortcutDrawerButton.style.position = `absolute`;
    shortcutDrawerButton.style.top = `-${size.spacing}px`;
    shortcutDrawerButton.style.left = (size.widthWindow - size.widthBody) / 2 + 120 + "px";
    shortcutDrawerButton.style.cursor = `pointer`;
    shortcutDrawerButton.innerHTML = `Shortcuts `;
    shortcutDrawerButton.innerHTML += shortcutDrawerOpen ? `<i class="fas fa-times-circle"></i>` : `<i class="fas fa-arrow-up"></i>`;

    container.appendChild(shortcutDrawerViewer);
    shortcutDrawerViewer.style.width = `100%`;
    shortcutDrawerViewer.style.height = shortcutDrawerOpen ? `${shortcutDrawerHeight}px` : `0`;
    shortcutDrawerViewer.style.backgroundColor = color.card;
    shortcutDrawerViewer.style.position = 'relative';
    shortcutDrawerViewer.innerHTML = ``;
    let content = document.createElement('div');
    shortcutDrawerViewer.appendChild(content);
    content.style.position = 'absolute';
    content.style.top = `${size.spacing - 10}px`;
    content.style.left = `${(size.widthWindow - size.widthBody) / 2 + 3 * size.spacing}px`;
    content.style.right = `${(size.widthWindow - size.widthBody) / 2 + 0 * size.spacing}px`;
    content.style.height = `${shortcutDrawerHeight - 2 * size.spacing}px`;
    content.innerHTML = `<h3 style="margin-bottom: 10px">Keyboard Shortcuts 
    <span style="font-size: 0.8rem; font-weight: normal; text-transform: capitalize">
    (Press <b>K</b> to show/hide this panel)</span></h3>
     <div style="column-count: 3">
     <b>A</b> - Navigate to About <br>
     <b>P</b> - Navigate to Projects <br>
     <b>X</b> - Navigate to Experience <br>
     
     <b>E</b> - Navigate to Education <br>
     <b>B</b> - Navigate to Blog <br>
     <b>F</b> - Navigate to Favourite <br>
     
     <b>S</b> - Search Website <br>
     <b>C</b> - Clear Selection <br>
     <b>D</b> - Toggle Dark Mode <br>
     <!--<b>Alt+K</b> - Show/Hide Shortcuts <br>-->
    </div>`;
    container.style.boxShadow = `0 0 ${size.spacing}px 0 rgba(0,0,0,${darkMode ? 0.5 : 0.2})`;

    shortcutDrawerButton.onclick = toggleShortcutDrawer;

    return container;
}