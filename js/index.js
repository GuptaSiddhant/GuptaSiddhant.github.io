let darkMode = matchMedia('(prefers-color-scheme: dark)').matches;
let allTags = ['about', 'project', 'experience', 'education', 'blog'];
let filters = [];
let clearButton;

document.addEventListener("DOMContentLoaded", initiate);

function initiate() {

    const root = document.documentElement;

    document.addEventListener('mousemove', evt => {
        let x = evt.clientX;
        let y = evt.clientY;
        root.style.setProperty('--mouse-x', x + 'px');
        root.style.setProperty('--mouse-y', y + 'px');
        root.style.setProperty('--mouse-xp', x / innerWidth);
        root.style.setProperty('--mouse-yp', y / innerHeight);
    });

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

    buildDOMhead();
    buildDOMbody();
    buildSocialActions();
    buildFilterArea();
    buildArticles();
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
        filters.forEach((filter)=> {
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

function buildArticles() {
    let lifeline = document.getElementById('lifeline');
    lifeline.innerHTML = '';

    articles.forEach((data) => {
        let matched = data.tags.some(r => filters.includes(r));

        if (matched || filters.length === 0) {

            let article = document.createElement('article');
            lifeline.appendChild(article);

            let articleIcon = document.createElement('div');
            article.appendChild(articleIcon);
            articleIcon.className = "article-icon";
            articleIcon.style.backgroundColor = matchColor(data.tags);
            let iconTag = document.createElement('i');
            articleIcon.appendChild(iconTag);
            iconTag.className = "fas fa-history";
            if (data.icon && data.icon !== '') {
                iconTag.className = data.icon;
            }

            let articleTitle = document.createElement('h2');
            article.appendChild(articleTitle);
            articleTitle.className = "article-title";
            articleTitle.innerText = data.title;

            if (data.subtitle && data.subtitle !== '') {
                let articleSubTitle = document.createElement('h4');
                article.appendChild(articleSubTitle);
                articleSubTitle.className = "article-subtitle";
                articleSubTitle.innerText = data.subtitle;
            }

            if (!data.static) {
                let articleTags = document.createElement('h6');
                article.appendChild(articleTags);
                articleTags.className = "article-tags";
                if (data.date && data.date !== '') {
                    articleTags.innerHTML = `<span class="article-date">${data.date}</span>`;
                }
                if (data.date && data.tags) {
                    articleTags.appendChild(dot);
                }

                if (data.tags && data.tags.length !== 0) {
                    data.tags.forEach((tag, index) => {

                        let tagButton = document.createElement('a');
                        tagButton.innerText = tag.toString();
                        tagButton.addEventListener('click', function () {
                            if (!filters.includes(tag)) {
                                filters.push(tag);
                            }
                            setURL();
                            buildArticles();
                            clearButton.classList.remove('hidden');
                        });
                        articleTags.appendChild(tagButton);
                        if (index + 1 !== data.tags.length) {
                            articleTags.innerHTML += ", ";
                        }
                    });
                }
            }

            if (data.description && data.description !== '') {
                let articleDesc = document.createElement('p');
                article.appendChild(articleDesc);
                articleDesc.className = "article-description";
                articleDesc.innerText = data.description;
            }

            if (data.role && data.role !== '') {
                let articleRole = document.createElement('p');
                article.appendChild(articleRole);
                articleRole.className = "article-desc2";
                articleRole.innerHTML = `<b>Role</b>: ` + data.role;
            }

            if (data.tech && data.tech !== '') {
                let articleTech = document.createElement('p');
                article.appendChild(articleTech);
                articleTech.className = "article-desc2";
                articleTech.innerHTML = `<b>Tools</b>: `;
                data.tech.forEach((tag, index) => {
                    articleTech.innerHTML += tag;
                    if (index + 1 !== data.tech.length) {
                        articleTech.innerHTML += ", ";
                    }
                });
            }

            if (data.attachments && data.attachments.length !== 0) {
                let articleAttachments = document.createElement('div');
                article.appendChild(articleAttachments);
                articleAttachments.className = "article-attachments flex wrap";
                data.attachments.forEach((attachment) => {
                    let imageCard = document.createElement('a');
                    articleAttachments.appendChild(imageCard);
                    imageCard.className = "image-card";
                    imageCard.href = attachment.image;
                    imageCard.target = '_blank';
                    if (attachment.link && attachment.link !== '') {
                        imageCard.href = attachment.link;
                    }
                    let image1 = document.createElement('img');
                    imageCard.appendChild(image1);
                    image1.src = attachment.image;
                    image1.alt = attachment.name;
                    image1.title = attachment.name;
                    let image2 = document.createElement('img');
                    imageCard.appendChild(image2);
                    image2.src = attachment.image;
                    image2.alt = attachment.name;
                    image2.title = attachment.name;
                    image1.onmouseover = function () {
                        image2.style.display = "block";
                        warningText.style.display = "block";
                    };
                    image1.onmouseout = hideImage;

                    function hideImage() {
                        image2.style.display = "none";
                        warningText.style.display = "none";
                    }

                    let warningText = document.createElement('i');
                    imageCard.appendChild(warningText);
                    warningText.className = "far fa-times-circle";
                    warningText.style.display = 'none';
                });
            }

            if (data.actions && data.actions.length !== 0) {
                let articleActions = document.createElement('div');
                article.appendChild(articleActions);
                articleActions.className = "article-actions flex wrap";
                data.actions.forEach((action) => {
                    let button = document.createElement('a');
                    articleActions.appendChild(button);
                    button.className = "button-secondary";
                    button.href = action.link;
                    button.target = action.target ? action.target : "_blank";
                    button.onmouseover = function () {
                        button.classList.add('hover');
                        button.style.backgroundColor = matchColor(data.tags);
                        button.style.border = "1px solid " + matchColor(data.tags);
                        button.style.color = darkMode ? details.semanticColorsDark.buttonTextHover : details.semanticColorsLight.buttonTextHover;
                    };
                    button.onmouseout = function () {
                        button.classList.remove('hover');
                        button.style.backgroundColor = 'transparent';
                        button.style.border = darkMode ? "1px solid " + details.semanticColorsDark.buttonText : "1px solid " + details.semanticColorsLight.buttonText;
                        button.style.color = darkMode ? details.semanticColorsDark.buttonText : details.semanticColorsLight.buttonText;
                    };
                    let buttonIcon = document.createElement('i');
                    button.appendChild(buttonIcon);
                    buttonIcon.className = "fas fa-external-link-alt";
                    buttonIcon.style.marginRight = '0.5rem';
                    if (action.icon && action.icon !== '') {
                        buttonIcon.className = action.icon;
                    }
                    let buttonText = document.createElement('span');
                    button.appendChild(buttonText);
                    buttonText.innerText = action.name;
                });
            }
        }
    });
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