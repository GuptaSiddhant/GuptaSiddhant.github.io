class Article {
    constructor(article) {
        // title, static, subtitle, icon, date, tags, description, role, tech, attachments, actions
        this.title = article.title;
        this.subtitle = article.subtitle;
        this.static = article.static;
        this.icon = article.icon;
        this.date = article.date;
        this.tags = article.tags;
        this.summary = article.summary;
        this.role = article.role;
        this.tech = article.tech;
        this.attachments = article.attachments;
        this.actions = article.actions;
        this.color = matchColor(article.tags);
    }

    buildArticle() {
        let fullImg = document.createElement('div');
        let cardSize = 520;
        let cardPadding = 40;

        let card = document.createElement('article');
        card.style.backgroundColor = '#FFFFFF';
        card.style.margin = '20px';
        card.style.marginBottom = 60 + 'px';
        card.style.borderRadius = '16px';
        card.style.padding = cardPadding + 'px';
        card.style.boxShadow = '0 0 40px 0 rgba(0,0,0,0.1)';
        card.style.width = cardSize + 'px';
        card.style.position = 'relative';
        card.style.zIndex = '2';
        if (this.attachments && this.attachments.length > 0) {
            card.style.paddingRight = cardPadding + 80 + 'px';
            card.style.width = cardSize - 80 + 'px';
        }

        card.appendChild(this.buildCardIcon());
        card.appendChild(this.buildHeading());
        card.appendChild(this.buildDescription());
        card.appendChild(this.buildActions());
        card.appendChild(fullImg);
        card.appendChild(this.buildAttachments(fullImg));
        return card;
    }

    buildCardIcon() {
        let iconSize = 20;
        let cardIcon = document.createElement('icon');
        cardIcon.style.position = 'absolute';
        cardIcon.style.left = '-20px';
        cardIcon.style.top = '35px';
        cardIcon.style.width = iconSize * 2 + 'px';
        cardIcon.style.height = iconSize * 2 + 'px';
        cardIcon.style.borderRadius = '8px';
        cardIcon.style.boxShadow = '0 0 20px 0 rgba(0,0,0,0.2)';
        cardIcon.style.color = '#FFFFFF';
        cardIcon.style.textAlign = 'center';
        cardIcon.style.lineHeight = iconSize * 2 + 'px';
        cardIcon.style.fontSize = iconSize + 'px';
        cardIcon.style.zIndex = '10';

        cardIcon.style.backgroundColor = this.color;
        cardIcon.className = this.icon;
        return cardIcon;
    }

    buildHeading() {
        let heading = document.createElement('div');

        let title = document.createElement('div');
        heading.appendChild(title);
        title.style.fontFamily = 'Kameron, serif';
        title.style.fontWeight = 'bold';
        title.style.fontSize = '24px';
        title.style.color = '#1A1A1A';
        title.style.lineHeight = '30px';
        title.style.marginBottom = '4px';
        title.innerText = this.title;

        if (this.subtitle) {
            let subtitle = document.createElement('div');
            heading.appendChild(subtitle);
            subtitle.style.fontWeight = '500';
            subtitle.style.fontSize = '16px';
            subtitle.style.color = this.color;
            subtitle.style.letterSpacing = '0.5px';
            subtitle.style.lineHeight = '20px';
            subtitle.style.textTransform = 'uppercase';
            subtitle.style.marginBottom = '8px';
            subtitle.innerText = this.subtitle;
        }

        if (this.tags) {
            let subtitle2 = document.createElement('div');
            heading.appendChild(subtitle2);
            subtitle2.style.fontSize = '16px';
            subtitle2.style.color = '#4D4D4D';
            subtitle2.style.lineHeight = '20px';
            subtitle2.style.textTransform = 'capitalize';
            subtitle2.style.marginBottom = '8px';
            subtitle2.innerText = '';

            if (this.date) {
                subtitle2.innerText += this.date;
            }
            if (this.date && this.tags) {
                subtitle2.innerText += ' • ';
            }
            if (this.tags) {
                this.tags.forEach((tag, index) => {
                    subtitle2.innerText += tag.toString();
                    if (index + 1 !== this.tags.length) {
                        subtitle2.innerHTML += ", ";
                    }
                    // let tagButton = document.createElement('a');
                    //             tagButton.innerText = tag.toString();
                    //             tagButton.addEventListener('click', function () {
                    //                 if (!filters.includes(tag)) {
                    //                     filters.push(tag);
                    //                 }
                    //                 setURL();
                    //                 buildArticles();
                    //                 clearButton.classList.remove('hidden');
                    //             });
                    //             articleTags.appendChild(tagButton);
                });
            }
        }
        return heading;
    }

    buildDescription() {
        let description = document.createElement('div');
        description.style.fontSize = '14px';
        description.style.color = '#4D4D4D';
        description.style.lineHeight = '20px';
        description.style.marginBottom = '4px';

        if (this.summary) {
            let summary = document.createElement('div');
            description.appendChild(summary);
            summary.style.textAlign = 'justify';
            summary.style.marginBottom = '8px';
            summary.innerText = this.summary;
        }

        if (this.role) {
            let role = document.createElement('div');
            description.appendChild(role);
            role.style.marginBottom = '4px';

            let field = document.createElement('span');
            role.appendChild(field);
            field.style.fontWeight = '500';
            field.innerText = 'Role: ';

            let value = document.createElement('span');
            role.appendChild(value);
            value.innerText = this.role;
        }

        if (this.tech) {
            let tech = document.createElement('div');
            description.appendChild(tech);
            tech.style.marginBottom = '4px';
            tech.style.textTransform = 'capitalize';

            let field = document.createElement('span');
            tech.appendChild(field);
            field.style.fontWeight = '500';
            field.innerText = 'Tech: ';

            let value = document.createElement('span');
            tech.appendChild(value);

            this.tech.forEach((item, index) => {
                value.innerHTML += item;
                if (index + 1 !== this.tech.length) {
                    value.innerHTML += ", ";
                }
            });
        }


        return description;
        // if (this.description && this.description !== '') {
        //     let articleDesc = document.createElement('p');
        //     article.appendChild(articleDesc);
        //     articleDesc.className = "article-description";
        //     articleDesc.innerText = this.description;
        // }
        //
        // if (this.role && this.role !== '') {
        //     let articleRole = document.createElement('p');
        //     article.appendChild(articleRole);
        //     articleRole.className = "article-desc2";
        //     articleRole.innerHTML = `<b>Role</b>: ` + this.role;
        // }
        //
        // if (this.tech && this.tech !== '') {
        //     let articleTech = document.createElement('p');
        //     article.appendChild(articleTech);
        //     articleTech.className = "article-desc2";
        //     articleTech.innerHTML = `<b>Tools</b>: `;
        //     this.tech.forEach((tag, index) => {
        //         articleTech.innerHTML += tag;
        //         if (index + 1 !== this.tech.length) {
        //             articleTech.innerHTML += ", ";
        //         }
        //     });
        // }
    }

    buildActions() {
        let actionButtons = document.createElement('div');
        if (this.actions && this.actions.length !== 0) {
            actionButtons.style.marginTop = '16px';
            actionButtons.style.display = 'flex';
            actionButtons.style.flexWrap = 'wrap';
            actionButtons.style.color = '#1A1A1A';
            actionButtons.style.cursor = 'pointer';

            this.actions.forEach((action) => {
                let button = document.createElement('div');
                actionButtons.appendChild(button);
                button.style.marginRight = '8px';
                button.style.padding = '4px 8px';
                button.style.borderRadius = '4px';
                button.style.border = '1px solid #1A1A1A';

                let buttonIcon = document.createElement('i');
                button.appendChild(buttonIcon);
                buttonIcon.className = "fas fa-external-link-alt";
                if (action.icon && action.icon !== '') {
                    buttonIcon.className = action.icon;
                }
                if (action.name !== '') {
                    buttonIcon.style.marginRight = '0.5rem';
                    let buttonText = document.createElement('span');
                    button.appendChild(buttonText);
                    buttonText.innerText = action.name;
                }

                let article = this;
                button.onmouseover = function () {
                    button.classList.add('hover');
                    button.style.backgroundColor = article.color;
                    button.style.border = "1px solid " + article.color;
                    button.style.color = '#FFFFFF';
                };
                button.onmouseleave = function () {
                    button.classList.remove('hover');
                    button.style.backgroundColor = 'transparent';
                    button.style.border = "1px solid " + '#1A1A1A';
                    button.style.color = '#1A1A1A';
                };

                button.onclick = function () {
                    window.open(action.link, action.target || '_blank');
                };
            });
        }
        return actionButtons;
    }

    buildAttachments(fullImg) {
        let imageSize = 100;
        let attachImages = document.createElement('div');
        if (this.attachments && this.attachments.length > 0) {
            attachImages.style.position = 'absolute';
            attachImages.style.right = '-20px';
            attachImages.style.top = '20px';
            attachImages.style.bottom = '20px';
            attachImages.style.display = 'flex';
            attachImages.style.flexDirection = 'column';
            attachImages.style.justifyContent = 'space-around';
            attachImages.style.zIndex = '10';

            this.attachments.forEach((item) => {
                let thumbnail = document.createElement('img');
                attachImages.appendChild(thumbnail);
                thumbnail.style.margin = '4px 0';
                thumbnail.style.width = imageSize + 'px';
                thumbnail.style.height = imageSize + 'px';
                thumbnail.style.borderRadius = '8px';
                thumbnail.style.border = 'none';
                thumbnail.style.objectFit = 'cover';
                thumbnail.style.boxShadow = '0 0 40px 0 rgba(0,0,0,0.25)';
                thumbnail.src = item.image;
                thumbnail.alt = item.name;
                thumbnail.title = item.name;

                fullImg.style.backgroundPosition = 'center';
                fullImg.style.backgroundRepeat = 'no-repeat';
                fullImg.style.backgroundSize = 'cover';
                fullImg.style.position = 'absolute';
                fullImg.style.borderRadius = '8px';
                fullImg.style.right = '8px';
                fullImg.style.width = '0';
                fullImg.style.bottom = '8px';
                fullImg.style.height = '0';

                thumbnail.onmouseover = function () {
                    fullImg.style.backgroundImage = `url(${item.image})`;
                    fullImg.style.zIndex = '5';
                    fullImg.style.right = '8px';
                    fullImg.style.top = '8px';
                    fullImg.style.bottom = '8px';
                    fullImg.style.left = '8px';
                    fullImg.style.width = 'calc(100% - 16px)';
                    fullImg.style.height = 'calc(100% - 16px)';
                };
                thumbnail.onmouseleave = function () {
                    fullImg.style.backgroundImage = `none`;
                    fullImg.style.zIndex = '1';
                    fullImg.style.right = '8px';
                    fullImg.style.width = '0';
                    fullImg.style.bottom = '8px';
                    fullImg.style.height = '0';
                };
            });
        }
        return attachImages;
    }
}


function buildArticles() {


    let lifeline = document.getElementById('lifeline');
    lifeline.innerHTML = '';

    articles.forEach((data) => {
        let matched = data.tags.some(r => filters.includes(r));

        if (matched || filters.length === 0) {


            let article = new Article(data);
            lifeline.appendChild(article.buildArticle());
        }
    });
}