let darkMode = matchMedia('(prefers-color-scheme: dark)').matches;
let allTags = ['about', 'project', 'experience', 'education', 'blog'];
let filters = [];
let clearButton;

document.addEventListener("DOMContentLoaded", initiate);

function initiate() {
    router();
    buildDOMhead();
    buildDOMbody();
    buildSocialActions();
    buildFilterArea();
    buildArticles();
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

function buildDOMhead() {
    let title = document.getElementsByTagName('title')[0];
    title.innerText = details.title;

    let colorCSS = document.getElementById('color-css');
    if (darkMode) {
        colorCSS.href = "css/dark.css";
    } else {
        colorCSS.href = "css/light.css";
    }
}

function buildDOMbody() {
    let DOM = document.getElementById('app');
    DOM.innerHTML = '';

    let header = document.createElement('header');
    DOM.appendChild(header);
    header.className = "flex between wrap";
    let headingTitle = document.createElement('h1');
    header.appendChild(headingTitle);
    headingTitle.innerText = details.title;
    let socialActions = document.createElement('div');
    header.appendChild(socialActions);
    socialActions.id = 'social-actions';

    let switcher = document.createElement('div');
    DOM.appendChild(switcher);
    switcher.id = 'switch-area';
    switcher.appendChild(buildColorToggle(filters));

    let nav = document.createElement('nav');
    DOM.appendChild(nav);
    nav.id = "filter-area";

    let lifeline = document.createElement('main');
    DOM.appendChild(lifeline);
    lifeline.id = "lifeline";
}

function buildFilterArea() {

    let filterArea = document.getElementById('filter-area');
    filterArea.innerHTML = '';
    let tagButtons = [];
    // Get All Tags
    // articles.forEach((data) => {
    //     data.tags.forEach((tag) => {
    //         let found = false;
    //         allTags.forEach((aTag) => {
    //             if (aTag.name === tag) {
    //                 aTag.count += 1;
    //                 found = true;
    //             }
    //         });
    //         if (!found) {
    //             let tagsCounter = {name: tag, count: 1};
    //             allTags.push(tagsCounter)
    //         }
    //     });
    // });

    allTags.forEach((tag) => {
        let name = tag.charAt(0).toUpperCase() + tag.slice(1);
        let button = document.createElement('div');
        filterArea.appendChild(button);
        button.className = "button-secondary filter-clip";
        if (filters.includes(tag)) {
            button.classList.add('active');
        }
        tagButtons.push(button);
        let buttonText = document.createElement('span');
        button.appendChild(buttonText);
        buttonText.innerText = name;
        button.style.marginBottom = "0.5rem";
        button.addEventListener('click', function () {
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                filters = arrayRemove(filters, tag);
                if (filters.length === 0) {
                    clearButton.classList.add('hidden');
                }
            } else {
                button.classList.add('active');
                filters.push(tag);
                clearButton.classList.remove('hidden');
            }
            setURL();
            buildArticles();
        });
    });

    clearButton = document.createElement('div');
    filterArea.appendChild(clearButton);
    clearButton.style.opacity = '0.7';
    clearButton.style.cursor = 'pointer';
    clearButton.innerHTML = '<i class="far fa-times-circle"></i> Clear all';
    clearButton.addEventListener('click', function () {
        tagButtons.forEach((button) => {
            button.classList.remove('active');
        });
        filters = [];
        clearButton.classList.add('hidden');
        setURL();
        initiate();
    });
    if (filters.length === 0) {
        clearButton.classList.add('hidden');
    } else {
        filters.forEach((filter) => {
            if (!allTags.includes(filter)) {
                console.log(filter)
            }
        });
    }
}

function buildColorToggle() {
    let colorCSS = document.getElementById('color-css');

    let modeSwitch = document.createElement('div');
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
            colorCSS.href = "css/dark.css";
            buildArticles();
            setUrlParameter('color', 'dark');
        } else {
            darkMode = false;
            colorCSS.href = "css/light.css";
            buildArticles();
            setUrlParameter('color', 'light');
        }
    });
    return modeSwitch;
}


function buildSocialActions() {
    let socialActionsButtons = document.getElementById('social-actions');
    socialActionsButtons.className = "flex wrap";
    details.socialActions.forEach((action) => {
        let button = document.createElement('a');
        socialActionsButtons.appendChild(button);
        button.className = "button-secondary";
        button.href = action.link;
        button.target = action.target ? action.target : "_blank";
        button.onmouseover = function () {
            button.classList.add('hover');
        };
        button.onmouseout = function () {
            button.classList.remove('hover');
        };
        let buttonIcon = document.createElement('i');
        button.appendChild(buttonIcon);
        buttonIcon.className = "fas fa-external-link-alt";
        if (action.icon && action.icon !== '') {
            buttonIcon.className = action.icon;
        }
        // let buttonText = document.createElement('span');
        // button.appendChild(buttonText);
        // buttonText.innerText = action.name;
    });
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