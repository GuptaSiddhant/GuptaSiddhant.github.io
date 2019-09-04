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
            let otherHash = hash;
            hash = '#' + otherHash.split('/')[1];
            if (otherHash.split('/')[2] && otherHash.split('/')[2] !== '') {
                hash += '/' + otherHash.split('/')[2];
            }
            console.log(errorText);
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
    applyCSS(BODY, {
        height: "100vh",
        width: size.widthWindow + "px",
        padding: 0,
        margin: 0,
        backgroundColor: color.background,
        fontFamily: "Poppins, Arial, sans-serif",
        fontSize: "16px",
        color: color.primary,
    });

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
    applyCSS(lifeline, {
        width: size.widthMain + "px",
        paddingTop: size.spacing + "px",
        paddingBottom: size.spacing + "px",
    });
    if (size.widthWindow > size.widthBody) {
        applyCSS(lifeline, {marginLeft: (size.widthWindow + size.widthBody) / 2 - size.widthMain + "px",});
    }
    if (size.isMobile) {
        applyCSS(lifeline, {paddingTop: '80px'});
    }

    if (navigation.subNav && navigation.subFilter === navFilter) {
        let dObj = findArticlesOBJ("url", '#' + navigation.subFilter + '/' + navigation.subURL);
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
    applyCSS(container, {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 100,
        boxShadow: `0 0 ${size.spacing}px 0 rgba(0,0,0,${darkMode ? 0.5 : 0.2})`,
    });

    container.appendChild(shortcutDrawerButton);
    shortcutDrawerButton.innerHTML += shortcutDrawerOpen ? `<i class="fas fa-times-circle"></i>` : `<i class="fas fa-arrow-up"></i>`;
    shortcutDrawerButton.innerHTML = `Shortcuts `;
    applyCSS(shortcutDrawerButton, {
        backgroundColor: color.card,
        color: color.primary,
        width: '140px',
        borderRadius: `${size.radius}px ${size.radius}px 0 0`,
        height: `${size.spacing}px`,
        lineHeight: `${size.spacing}px`,
        textAlign: 'center',
        position: `absolute`,
        top: `-${size.spacing}px`,
        left: (size.widthWindow - size.widthBody) / 2 + 120 + "px",
        cursor: `pointer`,
    });

    container.appendChild(shortcutDrawerViewer);
    shortcutDrawerViewer.innerHTML = ``;
    applyCSS(shortcutDrawerViewer, {
        width: `100%`,
        height: shortcutDrawerOpen ? `${shortcutDrawerHeight}px` : 0,
        backgroundColor: color.card,
        position: 'relative',
    });

    let content = document.createElement('div');
    shortcutDrawerViewer.appendChild(content);
    applyCSS(content, {
        position: 'absolute',
        top: `${size.spacing - 10}px`,
        left: `${(size.widthWindow - size.widthBody) / 2 + 3 * size.spacing}px`,
        right: `${(size.widthWindow - size.widthBody) / 2}px`,
        height: `${shortcutDrawerHeight - 2 * size.spacing}px`,
    });
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

    shortcutDrawerButton.onclick = toggleShortcutDrawer;

    return container;
}