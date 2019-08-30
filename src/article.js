class Article {
    constructor(article) {
        // title, static, subtitle, icon, date, tags, description, role, tech, attachments, actions
        this.title = article.title;
        this.subtitle = article.subtitle;
        this.icon = article.icon;
        this.logo = article.logo;
        this.date = article.date;
        this.tags = article.tags;
        this.summary = article.summary;
        this.role = article.role;
        this.tech = article.tech;
        this.attachments = article.attachments;
        this.actions = article.actions;
        this.starred = article.tags.some(r => 'favourite' === r);
        this.spacing = size.spacing;
        this.size = size.widthMain - 4 * size.spacing;
        this.radius = size.radius;
        this.isMobile = size.isMobile;
        this.colorAccent = matchColor(article.tags);
        this.colorPrimary = color.primary;
        this.colorSecondary = color.secondary;
        this.colorInverse = color.inverse;
        this.colorCard = color.card;
        this.file = article.file; //Viewer
        this.filetype = article.filetype; //Viewer

        this.quotation =
            this.tags.includes("testimonial") || this.tags.includes("recommendation") || this.tags.includes("quote");
    }

    buildFullArticle() {
        let title = document.getElementById("app-title");
        let titleOG = document.getElementById("og-title");
        let titleTwitter = document.getElementById("twitter-title");
        title.innerText += " / " + this.title;
        titleOG.content += " / " + this.title;
        titleTwitter.content += " / " + this.title;

        let descOG = document.getElementById("og-desc");
        let descTwitter = document.getElementById("twitter-desc");
        descOG.content = this.summary;
        descTwitter.content = this.summary;

        let imageOG = document.getElementById("og-image");
        let imageTwitter = document.getElementById("twitter-image");
        imageOG.content = this.attachments[0].image;
        imageTwitter.content = this.attachments[0].image;

        let fullArticle = document.createElement("div");
        fullArticle.style.position = "relative";
        if (this.isMobile) {
            fullArticle.style.position = "fixed";
            fullArticle.style.top = "0";
            fullArticle.style.right = "0";
            fullArticle.style.bottom = "0";
            fullArticle.style.left = "0";
            fullArticle.style.zIndex = "70";
            fullArticle.style.backgroundColor = "rgba(0,0,0,0.75)";
            fullArticle.style.setProperty("-webkit-transform", "translateZ(0);");
        }

        let card = document.createElement("div");
        fullArticle.appendChild(card);
        card.style.position = "absolute";
        card.style.backgroundColor = this.colorCard;
        card.style.margin = this.isMobile ? "60px 0 0 0" : this.spacing / 2 + "px";
        card.style.borderRadius = this.isMobile ? "0" : 2 * this.radius + "px";
        card.style.boxShadow = `0 0 ${this.spacing}px 0 rgba(0,0,0,0.1)`;
        card.style.width = this.isMobile
            ? "auto"
            : this.size + 2 * this.spacing + "px";
        card.style.zIndex = "75";
        card.style.height = this.isMobile
            ? "auto"
            : `calc(100vh - ${size.spacing * 3}px)`;

        if (size.isMobile) {
            card.style.top = "0px";
            card.style.left = "0px";
            card.style.right = "0px";
            card.style.bottom = "0px";
        }

        // CSS Start
        const root = document.documentElement;
        root.style.setProperty("--colorAccent", this.colorAccent);
        root.style.setProperty("--colorPrimary", this.colorPrimary);
        root.style.setProperty("--colorSecondary", this.colorSecondary);
        root.style.setProperty("--colorCard", this.colorCard);
        root.style.setProperty("--colorInverse", this.colorInverse);
        // CSS End

        let closeButton = document.createElement("i");
        card.appendChild(closeButton);
        closeButton.style.position = "absolute";
        closeButton.style.top = "-10px";
        closeButton.style.right = this.isMobile ? "10px" : "-10px";
        closeButton.style.color = this.isMobile ? "#f2f2f2" : this.colorSecondary;
        closeButton.style.zIndex = "80";
        closeButton.style.cursor = "pointer";
        closeButton.style.fontSize = "20px";
        closeButton.style.textShadow = `0 0 ${this.spacing / 2}px rgba(0,0,0,0.5)`;
        // noinspection JSValidateTypes
        closeButton.classList = `fas fa-times-circle`;
        closeButton.onclick = function () {
            navigation.subNav = false;
            setURL();
            buildDOM();
        };

        card.appendChild(this.buildCardIcon());
        card.appendChild(this.buildViewer());

        return fullArticle;
    }

    buildViewer() {
        let viewer = document.createElement("div");
        viewer.id = "article-showdown";
        viewer.style.position = "absolute";
        viewer.style.backgroundColor = this.colorCard;
        viewer.style.right = `${this.radius}px`;
        viewer.style.top = `${this.radius}px`;
        viewer.style.bottom = `${this.radius}px`;
        viewer.style.left = `${this.radius}px`;
        viewer.style.opacity = "1";
        viewer.style.padding = "16px";
        viewer.style.setProperty("-webkit-overflow-scrolling", "touch");

        if (this.filetype === "html") {
            let frame = document.createElement("iframe");
            viewer.appendChild(frame);
            viewer.style.overflow = "hidden";
            viewer.style.padding = "0px";

            frame.src = this.file;
            frame.style.width = "100%";
            frame.style.height = "100%";
            frame.style.backgroundColor = "transparent";
            frame.style.border = "none";
        } else {
            viewer.style.overflow = "scroll";

            let converter = new showdown.Converter({extensions: ["youtube"]});
            converter.setOption("parseImgDimensions", true);
            converter.setOption("simplifiedAutoLink", true);
            converter.setOption("tables", true);
            converter.setOption("openLinksInNewWindow", true);
            converter.setOption("emoji", true);

            let request = new XMLHttpRequest();
            request.addEventListener("load", function () {
                viewer.innerHTML = converter.makeHtml(this.responseText);
            });
            request.open("GET", this.file);
            request.send();
        }
        return viewer;
    }

    buildSummaryCard() {
        let fullImg = document.createElement("div");
        let closeButton = document.createElement("i");

        let card = document.createElement("article");
        card.id = "article-card";
        card.style.fontSize = '1rem';
        card.style.backgroundColor = this.colorCard;
        card.style.margin = this.spacing + "px";
        card.style.borderRadius = 2 * this.radius + "px";
        card.style.padding = this.spacing + "px";
        card.style.boxShadow = `0 0 ${this.spacing}px 0 rgba(0,0,0,0.1)`;
        card.style.width = this.size + "px";
        card.style.height = "auto";
        card.style.position = "relative";
        card.style.zIndex = "2";
        card.style.height = navigation.subNav
            ? `calc(100vh - ${size.spacing * 6}px)`
            : "auto";
        card.style.marginBottom = this.isMobile
            ? `${this.spacing * 2}px`
            : this.spacing + "px";
        if (this.attachments && this.attachments.length > 0 && this.isMobile) {
            card.style.paddingBottom = `${this.spacing + 120}px`;
        }
        if (this.attachments && this.attachments.length > 0 && !this.isMobile) {
            card.style.paddingRight = this.spacing + 80 + "px";
            card.style.width = this.size - 80 + "px";
        }

        card.appendChild(this.buildCardIcon());
        if (this.starred) {
            card.appendChild(this.buildCardStarIcon());
        }
        card.appendChild(this.buildHeading());
        card.appendChild(this.buildDescription());
        card.appendChild(this.buildActions());
        card.appendChild(fullImg);
        card.appendChild(closeButton);
        card.appendChild(this.buildAttachments(card, fullImg, closeButton));
        return card;
    }

    buildCardIcon() {
        let iconSize = 20;
        let cardIcon = document.createElement("icon");
        cardIcon.id = "article-icon";

        cardIcon.style.position = "absolute";
        cardIcon.style.left = this.isMobile ? this.spacing + "px" : "-20px";
        cardIcon.style.top = this.isMobile ? "-20px" : "34px";
        cardIcon.style.width = iconSize * 2 + "px";
        cardIcon.style.height = iconSize * 2 + "px";
        cardIcon.style.borderRadius = this.radius + "px";
        cardIcon.style.boxShadow = "0 0 20px 0 rgba(0,0,0,0.2)";
        cardIcon.style.color = "#FFFFFF";
        cardIcon.style.textAlign = "center";
        cardIcon.style.lineHeight = iconSize * 2 + "px";
        cardIcon.style.fontSize = iconSize + "px";
        cardIcon.style.zIndex = "10";

        cardIcon.style.backgroundColor = this.colorAccent;
        if (this.logo && this.logo !== "") {
            let logoImage = document.createElement("img");
            cardIcon.appendChild(logoImage);
            logoImage.style.margin = "5px 0";
            logoImage.src = this.logo;
            logoImage.style.height = iconSize * 1.5 + "px";
            logoImage.style.width = iconSize * 1.5 + "px";
        } else if (this.icon && this.icon !== "") {
            cardIcon.className = this.icon;
        } else if (this.quotation) {
            cardIcon.className = "fas fa-quote-left";
        } else {
            cardIcon.className = matchIcon(this.tags);
        }

        return cardIcon;
    }

    buildCardStarIcon() {
        let iconSize = 20;
        let cardIcon = document.createElement("icon");
        cardIcon.id = "article-star-icon";

        cardIcon.style.position = "absolute";
        cardIcon.style.left = this.isMobile ? this.spacing + 3 * iconSize + "px" : "-20px";
        cardIcon.style.top = this.isMobile ? "-20px" : 34 + 3 * iconSize + "px";
        cardIcon.style.width = iconSize * 2 + "px";
        cardIcon.style.height = iconSize * 2 + "px";
        cardIcon.style.borderRadius = this.radius + "px";
        cardIcon.style.boxShadow = "0 0 20px 0 rgba(0,0,0,0.2)";
        cardIcon.style.color = "#FFFFFF";
        cardIcon.style.textAlign = "center";
        cardIcon.style.lineHeight = iconSize * 2 + "px";
        cardIcon.style.fontSize = iconSize + "px";
        cardIcon.style.zIndex = "10";
        cardIcon.style.backgroundColor = "#F74F9E";
        cardIcon.className = "fas fa-heart";
        cardIcon.alt = 'Favourite';
        cardIcon.title = 'Favourite';
        return cardIcon;
    }

    buildHeading() {
        let heading = document.createElement("div");
        heading.id = "article-heading";

        let title = document.createElement("div");
        title.id = "article-title";
        heading.appendChild(title);

        title.style.fontFamily = "Kameron, serif";
        title.style.fontWeight = this.quotation ? "normal" : "bold";
        title.style.fontSize = this.quotation ? "20px" : "24px";
        title.style.color = this.colorPrimary;
        title.style.lineHeight = this.quotation ? "26px" : "30px";
        title.style.marginBottom = "4px";
        title.innerText = this.title;

        if (this.subtitle) {
            let subtitle = document.createElement("div");
            subtitle.id = "article-subtitle";
            heading.appendChild(subtitle);

            subtitle.style.fontWeight = "500";
            subtitle.style.fontSize = "16px";
            subtitle.style.color = this.colorAccent;
            subtitle.style.letterSpacing = "0.5px";
            subtitle.style.lineHeight = "20px";
            subtitle.style.textTransform = "uppercase";
            subtitle.style.marginBottom = "8px";
            subtitle.innerText = this.subtitle;
        }

        if (this.tags && this.tags.length > 0) {
            let subtitle2 = document.createElement("div");
            subtitle2.id = "article-subtitle2";
            heading.appendChild(subtitle2);

            subtitle2.style.fontSize = "16px";
            subtitle2.style.color = this.colorSecondary;
            subtitle2.style.lineHeight = "20px";
            subtitle2.style.textTransform = "capitalize";
            subtitle2.style.marginBottom = "8px";
            subtitle2.innerText = "";

            if (this.date) {
                subtitle2.innerText += this.date;
            }
            if (this.date && this.tags) {
                subtitle2.innerText += " • ";
            }
            if (this.tags) {
                this.tags.forEach((tag, index) => {
                    let tagSpan = document.createElement('span');
                    subtitle2.appendChild(tagSpan);
                    tagSpan.innerText = tag.toString();
                    tagSpan.style.cursor = 'pointer';
                    if (index + 1 !== this.tags.length) {
                        let commaSpace = document.createElement('span');
                        commaSpace.innerText = `, `;
                        subtitle2.appendChild(commaSpace);
                    }
                    tagSpan.onclick = function () {
                        submitSearch(tag.toString());
                    };
                    tagSpan.onmouseover = () => {
                        tagSpan.style.color = color.primary;
                    };
                    tagSpan.onmouseleave = () => {
                        tagSpan.style.color = color.secondary;
                    };
                });
            }
        }
        return heading;
    }

    buildDescription() {
        let description = document.createElement("div");
        description.id = "article-description";

        description.style.fontSize = "14px";
        description.style.color = this.colorSecondary;
        description.style.lineHeight = "20px";
        description.style.marginBottom = "4px";

        if (this.summary) {
            let summary = document.createElement("div");
            summary.id = "article-summary";
            description.appendChild(summary);

            summary.style.marginBottom = "8px";
            summary.innerHTML = this.summary;
        }

        if (this.role) {
            let role = document.createElement("div");
            role.id = "article-role";
            description.appendChild(role);
            role.style.marginBottom = "4px";

            let field = document.createElement("span");
            role.appendChild(field);
            field.style.fontWeight = "500";
            field.innerText = "Role: ";

            let value = document.createElement("span");
            role.appendChild(value);
            value.innerText = this.role;
        }

        if (this.tech) {
            let tech = document.createElement("div");
            tech.id = "article-tech";
            description.appendChild(tech);
            tech.style.marginBottom = "4px";
            tech.style.textTransform = "capitalize";

            let field = document.createElement("span");
            tech.appendChild(field);
            field.style.fontWeight = "500";
            field.innerText = "Tech: ";

            let value = document.createElement("span");
            tech.appendChild(value);

            this.tech.forEach((item, index) => {
                let itemSpan = document.createElement('span');
                value.appendChild(itemSpan);
                itemSpan.innerText = item.toString();
                itemSpan.style.cursor = 'pointer';
                if (index + 1 !== this.tech.length) {
                    let commaSpace = document.createElement('span');
                    commaSpace.innerText = `, `;
                    value.appendChild(commaSpace);
                }
                itemSpan.onclick = function () {
                    submitSearch(item.toString());
                };
                itemSpan.onmouseover = () => {
                    itemSpan.style.color = color.primary;
                };
                itemSpan.onmouseleave = () => {
                    itemSpan.style.color = color.secondary;
                };
            });
        }

        return description;
    }

    buildActions() {
        let actionButtons = document.createElement("div");
        actionButtons.id = "article-actions";

        if (this.actions && this.actions.length !== 0) {
            actionButtons.style.display = "flex";
            actionButtons.style.flexWrap = "wrap";
            actionButtons.style.color = this.colorPrimary;
            actionButtons.style.cursor = "pointer";

            this.actions.forEach(action => {
                let button = document.createElement("div");
                button.id = "article-actionButton";

                actionButtons.appendChild(button);
                button.style.marginTop = `${this.radius}px`;
                button.style.marginRight = `${this.radius}px`;
                button.style.padding = `${this.radius / 2}px ${this.radius}px`;
                button.style.borderRadius = `${this.radius / 2}px`;
                button.style.border = "1px solid " + this.colorPrimary;
                button.style.transition = "background-color 0.2s ease";
                button.title = action.link;

                let buttonIcon = document.createElement("i");
                button.appendChild(buttonIcon);
                buttonIcon.alt = action.name;
                buttonIcon.title = action.name;
                buttonIcon.className =
                    action.target === "_self"
                        ? "fas fa-align-left fa-flip-vertical"
                        : "fas fa-external-link-square-alt";
                if (action.icon && action.icon !== "") {
                    buttonIcon.className = action.icon;
                }
                if (action.name && action.name !== "") {
                    buttonIcon.style.marginRight = "0.5rem";
                    let buttonText = document.createElement("span");
                    button.appendChild(buttonText);
                    buttonText.innerText = action.name;
                }

                let article = this;
                button.onmouseover = function () {
                    button.classList.add("hover");
                    button.style.backgroundColor = article.colorAccent;
                    button.style.border = "1px solid " + article.colorAccent;
                    button.style.color = "#FFFFFF";
                };
                button.onmouseleave = function () {
                    button.classList.remove("hover");
                    button.style.backgroundColor = "transparent";
                    button.style.border = "1px solid " + article.colorPrimary;
                    button.style.color = article.colorPrimary;
                };

                button.onclick = function () {
                    if (action.type === "top") {
                        window.scrollTo(0, 0);
                    } else {
                        if (action.link.includes("mailto")) {
                            location.href = action.link;
                        } else {
                            window.open(action.link, action.target || "_blank");
                        }
                    }
                };
            });
        }
        return actionButtons;
    }

    buildAttachments(card, fullImg, closeButton) {
        let imageSize = 100;
        let attachImages = document.createElement("div");
        attachImages.id = "article-attachments";

        if (this.attachments && this.attachments.length > 0) {
            attachImages.style.position = "absolute";

            if (this.isMobile) {
                attachImages.style.left = this.spacing + "px";
                attachImages.style.bottom = "20px";
            } else {
                attachImages.style.right = "-20px";
                attachImages.style.top = "20px";
                attachImages.style.bottom = "20px";
            }
            attachImages.style.display = "flex";
            attachImages.style.flexDirection = this.isMobile ? "row" : "column";
            attachImages.style.justifyContent = "space-around";
            attachImages.style.zIndex = "10";

            this.attachments.forEach(item => {
                let thumbnail = document.createElement("div");
                thumbnail.id = "article-thumbnail";

                attachImages.appendChild(thumbnail);
                thumbnail.style.backgroundColor = this.colorCard;
                thumbnail.style.margin = this.isMobile
                    ? `0 ${this.radius}px 0 0`
                    : this.radius + "px 0";
                thumbnail.style.width = imageSize + "px";
                thumbnail.style.height = imageSize + "px";
                thumbnail.style.borderRadius = this.radius + "px";
                thumbnail.style.border = "none";
                thumbnail.style.objectFit = "cover";
                thumbnail.style.boxShadow = `0 0 ${this.spacing}px 0 rgba(0,0,0,0.25)`;
                thumbnail.style.transition =
                    "width 0.2s ease, height 0.2s ease, box-shadow 0.2s ease-in";
                // thumbnail.src = item.image;
                thumbnail.alt = item.name;
                thumbnail.title = item.name;
                thumbnail.style.backgroundImage = `url(${item.image})`;
                thumbnail.style.backgroundSize = `cover`;
                thumbnail.style.backgroundPosition = `center`;

                thumbnail.style.position = 'relative';

                if (item.full !== false) {

                    let thumbOverlay = document.createElement('div');
                    thumbnail.appendChild(thumbOverlay);
                    thumbOverlay.style.position = 'absolute';
                    thumbOverlay.style.top = '0px';
                    thumbOverlay.style.left = '0px';
                    thumbOverlay.style.right = '0px';
                    thumbOverlay.style.bottom = '0px';
                    thumbOverlay.style.borderRadius = thumbnail.style.borderRadius;
                    thumbOverlay.style.backgroundColor = 'rgba(0,0,0,0.4)';
                    thumbOverlay.style.opacity = '0';
                    thumbOverlay.style.color = '#FFFFFF';
                    thumbOverlay.style.fontSize = '20px';
                    thumbOverlay.style.textAlign = 'right';
                    thumbOverlay.style.padding = '10px';
                    thumbOverlay.style.lineHeight = '20px';
                    thumbOverlay.onclick = function () {
                        window.open(item.image, "_blank");
                    };
                    let thumbOverlayIcon = document.createElement('i');
                    thumbOverlay.appendChild(thumbOverlayIcon);
                    thumbOverlayIcon.className = 'fas fa-external-link-square-alt';
                    thumbOverlayIcon.title = 'Open in New Tab';

                    fullImg.id = "article-fullImg";
                    fullImg.style.backgroundColor = this.colorCard;
                    fullImg.style.backgroundPosition = "center";
                    fullImg.style.backgroundRepeat = "no-repeat";
                    fullImg.style.backgroundSize = "cover";
                    fullImg.style.position = "absolute";
                    fullImg.style.borderRadius = `${this.radius}px`;
                    fullImg.style.right = `${this.radius}px`;
                    fullImg.style.width = "0";
                    fullImg.style.bottom = `${this.radius}px`;
                    fullImg.style.height = "0";
                    fullImg.style.opacity = "0";
                    fullImg.style.transition = "opacity 0.2s ease";

                    let a = this;
                    const closeImg = function () {
                        fullImg.style.backgroundImage = `none`;
                        fullImg.style.zIndex = "1";
                        fullImg.style.right = `${a.radius}px`;
                        fullImg.style.width = "0";
                        fullImg.style.bottom = `${a.radius}px`;
                        fullImg.style.height = "0";
                        fullImg.style.opacity = "0";

                        closeButton.style.fontSize = "1px";
                        closeButton.style.opacity = "0";
                        closeButton.style.boxShadow = `0 0 0 0 rgba(0,0,0,0.25)`;

                        thumbOverlay.style.opacity = '0';
                    };

                    fullImg.onclick = closeImg;

                    if (this.isMobile) {
                        closeButton.style.position = "absolute";
                        closeButton.style.top = this.spacing + "px";
                        closeButton.style.right = this.spacing + "px";
                        closeButton.style.color = "#FFFFFF";
                        closeButton.style.zIndex = "10";
                        closeButton.style.fontSize = "1px";
                        closeButton.style.opacity = "0";
                        closeButton.style.textShadow = `0 0 ${this.spacing /
                        2}px rgba(0,0,0,0.5)`;
                        closeButton.classList = "fas fa-times-circle";
                        closeButton.onclick = closeImg;
                    }

                    thumbnail.onmouseover = function () {
                        fullImg.style.backgroundImage = `url(${item.image})`;
                        fullImg.style.zIndex = "5";
                        fullImg.style.right = `${a.radius}px`;
                        fullImg.style.top = `${a.radius}px`;
                        fullImg.style.bottom = `${a.radius}px`;
                        fullImg.style.left = `${a.radius}px`;
                        fullImg.style.width = "calc(100% - 16px)";
                        fullImg.style.height = "calc(100% - 16px)";
                        fullImg.style.opacity = "1";
                        closeButton.style.fontSize = "20px";
                        closeButton.style.opacity = "1";
                        closeButton.style.boxShadow = `0 0 ${
                            a.spacing
                            }px 0 rgba(0,0,0,0.25)`;
                        thumbOverlay.style.opacity = '1';
                    };
                    if (!this.isMobile) {
                        thumbnail.onmousemove = function (evt) {
                            let IMG = new Image();
                            IMG.src = item.image;
                            let ratio = IMG.height / IMG.width;
                            let renderWidth = a.size; //a
                            let renderHeight = ratio * renderWidth; //b
                            let clientHeight = card.clientHeight - 16; //c
                            let clientWidth = card.clientWidth;
                            if (renderHeight > clientHeight) {
                                let hiddenHeight = renderHeight - clientHeight;
                                let offsetHeight = hiddenHeight / 2;
                                let moveRatio = offsetHeight / 40;
                                fullImg.style.backgroundPositionY =
                                    -1 * moveRatio * evt.offsetY + "px";
                            }
                        };
                    }

                    thumbnail.onmouseleave = closeImg;
                } else {
                    thumbnail.onmouseover = function () {
                        thumbnail.style.width = "110px";
                        thumbnail.style.height = "110px";
                        thumbnail.style.boxShadow = "0 0 40px 0 rgba(0,0,0,0.5)";
                    };
                    thumbnail.onmouseleave = function () {
                        thumbnail.style.width = "100px";
                        thumbnail.style.height = "100px";
                        thumbnail.style.boxShadow = "0 0 40px 0 rgba(0,0,0,0.25)";
                    };
                }
            });
        }
        return attachImages;
    }
}
