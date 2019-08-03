document.addEventListener("DOMContentLoaded", function (query) {

    let filters = [];
    let allTags = ['about', 'project', 'experience', 'education', 'blog'];

    buildArticles(filters);
    buildFilterArea(allTags, filters);
    buildSocialActions();
});

function buildFilterArea(allTags, filters) {

    let filterArea = document.getElementById('filter-area');
    filterArea.innerHTML = ``;

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
        tagButtons.push(button);
        let buttonText = document.createElement('span');
        button.appendChild(buttonText);
        buttonText.innerText = name;
        button.style.marginBottom = "0.5rem";
        button.addEventListener('click', function (e) {
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
            console.log(filters);
            buildArticles(filters);
        });
    });

    let clearButton = document.createElement('div');
    filterArea.appendChild(clearButton);
    clearButton.classList.add('hidden');
    clearButton.style.opacity = '0.7';
    clearButton.style.cursor = 'pointer';
    clearButton.innerHTML = '<i class="far fa-times-circle"></i> Clear all';
    clearButton.addEventListener('click', function (e) {
        tagButtons.forEach((button) => {
            button.classList.remove('active');
        });
        filters = [];
        clearButton.classList.add('hidden');
        buildArticles(filters);
    });
}

function buildArticles(filters) {
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
                let articleTags = document.createElement('h5');
                article.appendChild(articleTags);
                articleTags.className = "article-tags";
                if (data.date && data.date !== '') {
                    articleTags.innerHTML = data.date;
                    articleTags.appendChild(dot);

                }
                if (data.tags && data.tags.length !== 0) {
                    data.tags.forEach((tag, index) => {
                        articleTags.innerHTML += tag;
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
                let articleRole = document.createElement('div');
                article.appendChild(articleRole);
                // articleRole.className = "article-desc2";
                articleRole.innerHTML = `<b>Role</b>: ` + data.role;
            }

            if (data.tech && data.tech !== '') {
                let articleTech = document.createElement('div');
                article.appendChild(articleTech);
                // articleTech.className = "article-desc2";
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
                    };
                    image1.onmouseout = function () {
                        image2.style.display = "none";
                    };
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
                        button.style.backgroundColor = matchColor(data.tags);
                        button.style.border = "1px solid " + matchColor(data.tags);
                        button.style.color = symanticColors.buttonTextHover;
                    };
                    button.onmouseout = function () {
                        button.style.border = "1px solid " + symanticColors.border;
                        button.style.backgroundColor = "transparent";
                        button.style.color = symanticColors.buttonText;
                    };
                    let buttonIcon = document.createElement('i');
                    button.appendChild(buttonIcon);
                    buttonIcon.className = "fas fa-external-link-alt";
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
    socialActionsButtons.className = "article-actions flex wrap";
    socialActions.forEach((action) => {
        let button = document.createElement('a');
        socialActionsButtons.appendChild(button);
        button.className = "button-secondary";
        button.href = action.link;
        button.target = action.target ? action.target : "_blank";
        button.onmouseover = function () {
            // button.style.backgroundColor = matchColor('');
            button.style.border = "1px solid " + matchColor('');
            button.style.color = symanticColors.buttonTextHover;
        };
        button.onmouseout = function () {
            button.style.border = "1px solid " + symanticColors.border;
            button.style.backgroundColor = "transparent";
            button.style.color = symanticColors.buttonText;
        };
        let buttonIcon = document.createElement('i');
        button.appendChild(buttonIcon);
        buttonIcon.className = "fas fa-external-link-alt";
        if (action.icon && action.icon !== '') {
            buttonIcon.className = action.icon;
        }
        let buttonText = document.createElement('span');
        button.appendChild(buttonText);
        buttonText.innerText = action.name;
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
        return typeColors.about;
    } else if (tags.includes('project')) {
        return typeColors.project;
    } else if (tags.includes('experience')) {
        return typeColors.experience;
    } else if (tags.includes('education')) {
        return typeColors.education;
    } else if (tags.includes('blog')) {
        return typeColors.blog;
    } else return typeColors.fallback;
}

let dot = document.createElement('span');
dot.className = "dot";