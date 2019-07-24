// Edit Data to show on homepage
let slidesData = [{
    name: "Business Espoo",
    description: "Business Espoo supports the vitality of businesses by offering the best, continuously developing services in one place.",
    date: "2019",
    image: "images/BE.jpg",
    text_direction: "left",
    details: [
        {title: "role", desc: "Designed the Brand Identity and Style Guidelines"},
        {title: "tech", desc: "Sketch, InDesign"},
    ],
}, {
    name: "Passport Concept",
    description: "Business Espoo supports the vitality of businesses by offering the best, continuously developing services in one place.",
    date: "2019",
    image: "images/passport.jpg",
    text_direction: "left",
    details: [
        {title: "role", desc: "Designed the Brand Identity and Style Guidelines"},
        {title: "tech", desc: "Sketch, InDesign"},
    ],
}, {
    name: "DELTA",
    description: "Business Espoo supports the vitality of businesses by offering the best, continuously developing services in one place.",
    date: "2019",
    image: "images/delta.jpg",
    text_direction: "left",
    details: [
        {title: "role", desc: "Designed the Brand Identity and Style Guidelines"},
        {title: "tech", desc: "Sketch, InDesign"},
    ],
}];

function loadSlider() {
    let glideSlides = document.getElementsByClassName("glide__slides")[0];
    glideSlides.innerHTML = '';
    slidesData.forEach((slideData) => {

        let glideSlide = document.createElement('li');
        glideSlides.appendChild(glideSlide);
        glideSlide.className = "glide__slide";
        glideSlide.style.backgroundImage = `url(${slideData.image})`;

        let div1 = document.createElement('div');
        glideSlide.appendChild(div1);
        let slideInfo = document.createElement('div');
        div1.appendChild(slideInfo);
        slideInfo.className = "slide_info";
        slideInfo.classList.add(slideData.text_direction);

        let slideName = document.createElement('h1');
        slideInfo.appendChild(slideName);
        slideName.innerText = slideData.name;

        let slideDetails = document.createElement('div');
        slideInfo.appendChild(slideDetails);
        slideDetails.classList.add('slide_details');
        slideDetails.innerHTML = `<b>${slideData.date}</b> • `;
        slideDetails.innerHTML += slideData.description;
        let slideDetailsData = document.createElement('dl');
        slideDetails.appendChild(slideDetailsData);
        slideData.details.forEach((slideDetail) => {
            let DataTitle = document.createElement('dt');
            DataTitle.innerText = slideDetail.title;
            let DataDesc = document.createElement('dd');
            DataDesc.innerText = slideDetail.desc;
            slideDetailsData.appendChild(DataTitle);
            slideDetailsData.appendChild(DataDesc);
        });
    });

    new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        perView: 1,
        focusAt: 'center',
        gap: 20,
        peek: 120,
        autoplay: 5000,
        breakpoints: {
            800: {
                peek: 60,
                perView: 1,
            },
            500: {
                perView: 1,
                peek: 10
            }
        }
    }).mount();
}
