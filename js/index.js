// On DOM Loaded -> Initialise
document.addEventListener("DOMContentLoaded", initiate);

// Global Variables
let darkMode = matchMedia('(prefers-color-scheme: dark)').matches || true;
let allTags = ['about', 'project', 'experience', 'education', 'blog'];
let filters = [];

function initiate() {
    router();
    buildDOM();
    buildSocialActions();
    buildNavigation();
}

function router() {
    // const root = document.documentElement;
    // document.addEventListener('mousemove', evt => {
    //     root.style.setProperty('--mouse-x', evt.clientX + 'px');
    //     root.style.setProperty('--mouse-y', evt.clientY + 'px');
    // });

    window.addEventListener('popstate', initiate);
    let hash = window.location.hash;
    hash = decodeURIComponent(hash);
    // Router
    if (hash && hash !== '') {
        parseHash(hash).forEach((hashFilter) => {
            filters.push(hashFilter);
        });
    }
    let query = parseQuery(window.location.search);
    if (query && query.color) {
        if (query.color === 'dark') {
            darkMode = true;
        } else if (query.color === 'light') {
            darkMode = false;
        }
    }
}


function buildDOM() {
    // HEAD
    let title = document.getElementsByTagName('title')[0];
    title.innerText = details.title;
    let colorCSS = document.getElementById('color-css');
    if (darkMode) {
        colorCSS.href = "css/dark.css";
    } else {
        colorCSS.href = "css/light.css";
    }


    // BODY
    let desktopSize = {
        widthWindow: window.innerWidth,
        widthBody: 1000,
        widthMain: 700,
        spacing: 40
    };

    let BODY = document.getElementById('app');
    BODY.style.height = '100vh';
    BODY.style.width = '100vw';
    BODY.style.padding = `0`;
    BODY.style.margin = '0';
    BODY.style.backgroundColor = '#F2f2f2';
    BODY.style.fontFamily = 'Poppins, Arial, sans-serif';
    BODY.style.fontSize = '16px';
    BODY.style.color = '#1A1A1A';

    BODY.innerHTML = '';
    BODY.appendChild(buildLifeline(desktopSize));
    BODY.appendChild(buildSidebar(desktopSize));
}


function buildLifeline(size) {
    let lifeline = document.createElement('main');
    lifeline.id = "lifeline";
    lifeline.style.width = size.widthMain + 'px';
    lifeline.style.paddingTop = size.spacing + 'px';
    lifeline.style.paddingBottom = size.spacing + 'px';
    if (size.widthWindow > size.widthBody) {
        lifeline.style.marginLeft =
            `calc((100vw + ${size.widthBody}px) / 2 - ${size.widthMain}px)`;
            // (size.widthWindow + size.widthBody) / 2 - size.widthMain + 'px';
    }

    articles.forEach((data) => {
        let matched = data.tags.some(r => filters.includes(r));
        if (matched || filters.length === 0) {
            let article = new Article(data);
            lifeline.appendChild(article.buildArticle());
        }
    });

    return lifeline;
}


function buildSidebar(size) {

    let sidebar = document.createElement('side');
    sidebar.style.width = size.widthBody - size.widthMain - 2 * size.spacing + 'px';
    sidebar.style.position = 'fixed';
    sidebar.style.top = size.spacing * 2 + 'px';
    sidebar.style.left =
        `calc((100vw - ${size.widthBody}px) / 2 )`;
        // (size.widthWindow - size.widthBody) / 2 + 'px';
    sidebar.style.padding = size.spacing + 'px';
    sidebar.style.textAlign = 'right';

    let headingTitle = document.createElement('div');
    sidebar.appendChild(headingTitle);
    headingTitle.style.margin = '0';
    headingTitle.style.fontFamily = 'Kameron, serif';
    headingTitle.style.fontWeight = 'bold';
    headingTitle.style.color = '#1A1A1A';
    headingTitle.style.fontSize = '2rem';
    headingTitle.style.lineHeight = '2.5rem';
    headingTitle.style.letterSpacing = '1px';
    headingTitle.style.textTransform = 'uppercase';
    headingTitle.style.marginBottom = '1rem';

    headingTitle.innerText = details.title;

    sidebar.appendChild(buildSocialActions());
    sidebar.appendChild(buildNavigation());
    sidebar.appendChild(buildColorToggle());

    return sidebar;
}

function buildSocialActions() {
    let sButtons = document.createElement('div');
    sButtons.id = 'social-actions';
    sButtons.style.display = 'flex';
    sButtons.style.justifyContent = 'flex-end';
    sButtons.style.margin = '8px 0';
    sButtons.style.color = '#1A1A1A';
    sButtons.style.cursor = 'pointer';

    details.socialActions.forEach((action) => {
        let button = buildButton(action, true);
        sButtons.appendChild(button);

        button.onclick = function () {
            if (action.type === 'top') {
                window.scrollTo(0, 0);
            } else {
                if (action.link.includes('mailto')) {
                    location.href = action.link;
                } else {
                    window.open(action.link, action.target || '_blank');
                }
            }
        };
    });
    return sButtons;
}

function buildButton(action, icon = false) {
    let button = document.createElement('div');
    button.id = 'social-actionButton';

    button.style.marginLeft = '8px';
    button.style.padding = '4px 12px';
    button.style.borderRadius = '4px';
    button.style.border = '1px solid #1A1A1A';
    button.style.transition = 'background-color 0.2s ease';
    button.style.cursor = 'pointer';

    let buttonIcon = document.createElement('i');
    if (action.icon && action.icon !== '') {
        button.appendChild(buttonIcon);
        buttonIcon.alt = action.name;
        buttonIcon.title = action.name;
        buttonIcon.className = action.icon;
    }
    if (!icon) {
        if (action.name && action.name !== '') {
            buttonIcon.style.marginRight = '0.5rem';
            let buttonText = document.createElement('span');
            button.appendChild(buttonText);
            buttonText.innerText = action.name;
        }
    }
    button.onmouseover = function () {
        button.classList.add('hover');
        button.style.backgroundColor = '#1A1A1A';
        button.style.border = "1px solid " + '#1A1A1A';
        button.style.color = '#FFFFFF';
    };
    button.onmouseleave = function () {
        button.classList.remove('hover');
        button.style.backgroundColor = 'transparent';
        button.style.border = "1px solid " + '#1A1A1A';
        button.style.color = '#1A1A1A';
    };
    return button;
}

function buildNavigation() {

    let nav = document.createElement('nav');
    nav.id = "nav-area";
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.justifyContent = 'flex-start';
    nav.style.margin = '20px 0';
    nav.style.color = '#1A1A1A';
    nav.style.position = 'relative';

    nav.innerHTML = '';
    let posTop = 0;

    let clearButton = document.createElement('div');
    clearButton.id = 'clear-button';
    clearButton.style.position = 'absolute';
    clearButton.style.top =  '200px';
    clearButton.style.right = '0';
    clearButton.style.width = '115px';
    clearButton.style.marginBottom = "0.5rem";
    clearButton.style.opacity = '0.7';
    clearButton.style.cursor = 'pointer';
    clearButton.style.display = 'none';
    clearButton.innerHTML = '<i class="far fa-times-circle"></i> Reset';

    clearButton.onclick = function () {
        filters = [];
        clearButton.style.display = 'none';
        setURL();
        initiate();
    };
    nav.appendChild(clearButton);

    allTags.forEach((tag) => {
        let name = tag.charAt(0).toUpperCase() + tag.slice(1);

        let button = buildButton({name: name});
        nav.appendChild(button);
        button.style.position = 'absolute';
        button.style.top = posTop + 'px';
        button.style.right = '0';
        button.style.width = '115px';
        button.style.marginBottom = "0.5rem";

        posTop += 40;

        if (filters.includes(tag)) {
            button.classList.add('active');
            button.style.backgroundColor = '#1A1A1A';
            button.style.border = "1px solid " + '#1A1A1A';
            button.style.color = '#FFFFFF';
            clearButton.style.display = 'block';
            button.onmouseleave = function () {
            };
        }

        button.onclick = function () {
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                button.style.backgroundColor = 'transparent';
                button.style.border = "1px solid " + '#1A1A1A';
                button.style.color = '#1A1A1A';
                clearButton.style.display = 'none';
                filters = [];
                button.onmouseleave = function () {
                    button.classList.remove('hover');
                    button.style.backgroundColor = 'transparent';
                    button.style.border = "1px solid " + '#1A1A1A';
                    button.style.color = '#1A1A1A';
                };
            } else {
                button.classList.add('active');
                button.style.backgroundColor = '#1A1A1A';
                button.style.border = "1px solid " + '#1A1A1A';
                button.style.color = '#FFFFFF';
                filters = [];
                filters.push(tag);
                clearButton.style.display = 'block';
                button.onmouseleave = function () {
                };
            }
            setURL();
            initiate();
        };
    });

    return nav;
}

function buildColorToggle() {
    let switcher = document.createElement('div');
    switcher.style.position = 'absolute';
    switcher.style.top = '0px';
    switcher.style.right = '40px';
    switcher.style.display = 'flex';
    switcher.style.justifyContent = 'flex-end';

    let modeSwitch = document.createElement('div');
    switcher.appendChild(modeSwitch);
    modeSwitch.className = 'onoffswitch';

    let modeInput = document.createElement('input');
    modeSwitch.appendChild(modeInput);
    modeInput.className = 'onoffswitch-checkbox';
    modeInput.type = 'checkbox';
    modeInput.name = 'onoffswitch';
    modeInput.id = 'myonoffswitch';
    modeInput.checked = darkMode;

    let modeLabel = document.createElement('label');
    modeSwitch.appendChild(modeLabel);
    modeLabel.className = 'onoffswitch-label';
    modeLabel.for = 'myonoffswitch';

    let innerSpan = document.createElement('span');
    modeLabel.appendChild(innerSpan);
    innerSpan.className = 'onoffswitch-inner';
    let outerSpan = document.createElement('span');
    modeLabel.appendChild(outerSpan);
    outerSpan.className = 'onoffswitch-switch';

    modeSwitch.addEventListener('click', function () {
        modeInput.checked = !modeInput.checked;
        if (modeInput.checked) {
            darkMode = true;
            // colorCSS.href = "css/dark.css";
            setUrlParameter('color', 'dark');
            initiate();
        } else {
            darkMode = false;
            // colorCSS.href = "css/light.css";
            setUrlParameter('color', 'light');
            initiate();
        }
    });
    return switcher;
}

// Supporting functions

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele !== value;
    });
}

function matchColor(tags) {
    if (tags.includes('about')) {
        return details.typeColors.about;
    } else if (tags.includes('project')) {
        return details.typeColors.project;
    } else if (tags.includes('experience')) {
        return details.typeColors.experience;
    } else if (tags.includes('education')) {
        return details.typeColors.education;
    } else if (tags.includes('blog')) {
        return details.typeColors.blog;
    } else return details.typeColors.fallback;
}

let dot = document.createElement('span');
dot.className = "dot";


function parseHash(queryString) {
    let hashes = [];
    let hashString = (queryString[0] === '#' ? queryString.substr(1) : queryString).split('#');
    for (let i = 0; i < hashString.length; i++) {
        hashes.push(hashString[i]);
    }
    return hashes;
}

function parseQuery(queryString) {
    let query = {};
    let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function setURL(queryURL = '') {

    let hashURL = '';
    if (filters.length > 0) {
        filters.forEach((filter) => {
            hashURL += '#' + filter;
        });
    }
    if (hashURL === '') {
        hashURL = '#';
    }
    history.pushState({}, 'Siddhant Gupta', queryURL + hashURL);
}

function setUrlParameter(key, value) {
    let params = new URLSearchParams(location.search);
    if (params.has(key)) {
        params.set(key, value);
    } else {
        params.append(key, value);
    }
    console.log([...params.entries()]);
    setURL('?' + params.toString());
}