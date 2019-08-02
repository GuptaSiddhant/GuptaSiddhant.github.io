$(document).ready(function () {

    let filters = [];
    let allTags = [];

    buildArticles(filters);

    let filterArea = document.getElementById('filter-area');
    filterArea.innerHTML = '';

    articles.forEach((data) => {
        data.tags.forEach((tag) => {
            let found = false;
            allTags.forEach((aTag) => {
                if (aTag.name === tag) {
                    aTag.count += 1;
                    found = true;
                }
            });
            if (!found) {
                let tagsCounter = {name: tag, count: 1};
                allTags.push(tagsCounter)
            }
        });
    });

    allTags.forEach((tag) => {
        let button = document.createElement('a');
        filterArea.appendChild(button);
        button.className = "button-secondary";
        let buttonText = document.createElement('span');
        button.appendChild(buttonText);
        buttonText.innerText = tag.name;
        buttonText.style.textTransform = "Capitalize";
        button.style.marginBottom = "0.5rem";
        button.addEventListener('click', function (e) {
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                buttonText.innerText = tag.name;
                filters = arrayRemove(filters, tag.name);
            } else {
                button.classList.add('active');
                buttonText.innerText = tag.name + ' (' + tag.count.toString() + ')';
                filters.push(tag.name);
            }
            console.log(filters);
            buildArticles(filters);
        });
    });


});

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele !== value;
    });
}

let dot = document.createElement('span');
dot.className = "dot";

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
            if (data.color !== '') {
                articleIcon.style.backgroundColor = data.color;
            }
            let iconTag = document.createElement('i');
            articleIcon.appendChild(iconTag);
            iconTag.className = data.icon;

            let articleTitle = document.createElement('h2');
            article.appendChild(articleTitle);
            articleTitle.className = "article-title";
            articleTitle.innerText = data.title;

            if (!data.static) {
                if (data.subtitle !== '') {
                    let articleSubTitle = document.createElement('h4');
                    article.appendChild(articleSubTitle);
                    articleSubTitle.className = "article-subtitle";
                    articleSubTitle.innerText = data.subtitle;
                }
                let articleTags = document.createElement('h5');
                article.appendChild(articleTags);
                articleTags.className = "article-tags";
                if (data.date !== '') {
                    articleTags.innerHTML = data.date;
                    articleTags.appendChild(dot);
                }
                data.tags.forEach((tag, index) => {
                    articleTags.innerHTML += tag;
                    if (index + 1 !== data.tags.length) {
                        articleTags.innerHTML += ", ";
                    }
                });
            }

            if (data.description !== '') {
                let articleDesc = document.createElement('p');
                article.appendChild(articleDesc);
                articleDesc.className = "article-description";
                articleDesc.innerText = data.description;
            }

            if (data.attachments !== []) {
                let articleAttachments = document.createElement('div');
                article.appendChild(articleAttachments);
                articleAttachments.className = "article-attachments flex wrap";
                data.attachments.forEach((attachment) => {
                    let imageCard = document.createElement('a');
                    articleAttachments.appendChild(imageCard);
                    imageCard.className = "image-card";
                    if (attachment.link !== '') {
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

            if (data.actions !== []) {
                let articleActions = document.createElement('div');
                article.appendChild(articleActions);
                articleActions.className = "article-actions flex wrap";
                data.actions.forEach((action) => {
                    let button = document.createElement('a');
                    articleActions.appendChild(button);
                    button.className = "button-secondary";
                    button.href = action.link;
                    button.target = action.target ? action.target : "_blank";
                    let buttonIcon = document.createElement('i');
                    button.appendChild(buttonIcon);
                    buttonIcon.className = action.icon;
                    let buttonText = document.createElement('span');
                    button.appendChild(buttonText);
                    buttonText.innerText = action.name;
                });
            }
        }
    });
}