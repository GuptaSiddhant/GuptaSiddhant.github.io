// Edit Data to show on homepage
let typeColors = {
    about: "#7c26a9",
    project: "#27b304",
    education: "#0000dd",
    experience: "#b30000",
    blog: "#806a0b",
    fallback: "#222222"
};

let socialActions = [{
    name: "LinkedIn",
    icon: "fab fa-linkedin",
    link: "https://www.linkedin.com/in/guptasiddhant9/",
}, {
    name: "GitHub",
    icon: "fab fa-github",
    link: "https://www.github.com/guptasiddhant/",
}, {
    name: "Mail",
    icon: "fas fa-envelope",
    link: "mailto:me@guptasiddhant.com",
}, {
    name: "Resume (PDF)",
    icon: "fas fa-file-download",
    link: "assets/Siddhant_Gupta_Resume.pdf",
}];

let articles = [
    {
        title: "UX Designer • Full Stack Developer",
        static: true,
        icon: "fas fa-info",
        subtitle: "About Me",
        tags: ["about"],
        description: "Ever since I could first remember, I’ve been fascinated by how things work. While it took me some time to discover my passion for design, I haven’t stopped pursuing it since. I am incredibly detail orientated and believe that small thing can make the biggest impact. If I had to describe myself in one word, that’d be stalwart.",
        attachments: [{
            name: "Siddhant Gupta",
            image: "images/siddhantgupta.jpg",
        }],
        // actions: []
    },
    {
        title: "UX Designer at FA Solutions Oy",
        icon: "fas fa-briefcase",
        subtitle: "Helsinki, Finland",
        date: "January 2019 - Present",
        tags: ["experience"],
        description: "Designing the product features.\n" +
            "Supporting UI/UX development of core product and projects team \n" +
            "Generating graphic design for marketing team",
        actions: [{
            name: "FA Solutions",
            link: "https://fasolutions.com",
        }]
    },
    {
        title: "M.Sc. Human Computer Interaction & Design",
        icon: "fas fa-graduation-cap",
        subtitle: "Aalto University & KTH Royal Institute of Technology",
        date: "August 2017 - June 2019",
        tags: ["education", "masters"],
        description: "Dual degree program as a part of EIT Digital Master School.",
        actions: [{
            name: "Masters thesis",
            link: "https://aaltodoc.aalto.fi/handle/123456789/39028",
        }, {
            name: "Aalto University",
            link: "https://aalto.fi",
        }, {
            name: "KTH",
            link: "https://kth.se",
        }]
    },
    {
        title: "Business Espoo - Visual Identity",
        icon: "fas fa-bezier-curve",
        subtitle: "Stalwart Design",
        date: "April 2019",
        tags: ["project", "branding", "styling"],
        description: "Business Espoo supports the vitality of businesses by offering the best, continuously developing services in one place.",
        role: "Designed the Brand Identity and Style Guidelines",
        tech: ["Sketch", "InDesign"],
        attachments: [{
            name: "BE Logo",
            image: "images/BE.jpg",
        }],
        actions: [{
            name: "View case study",
            link: "#",
        }]
    },
    {
        title: "The Passport - Concept",
        icon: "far fa-lightbulb",
        date: "February 2017",
        tags: ["project", "concept"],
        description: "The elegant All-In-One Identity solution for every Citizen.",
        attachments: [{
            name: "Passport Concept",
            image: "images/passport1.jpg",
        }, {
            name: "Passport Concept",
            image: "images/passport2.jpg",
        }, {
            name: "Passport Concept",
            image: "images/passport3.jpg",
        }
        ],
        actions: [{
            name: "Read More",
            icon: "fas fa-align-left",
            link: "https://guptasiddhant.com/the-passport-concept-289733ba7963",
        }]
    },
    {
        title: "B.Eng. (Honors) Mechanical Engineering",
        icon: "fas fa-graduation-cap",
        subtitle: "Birla Institute of Technology and Science (BITS), Pilani",
        date: "September 2012 - July 2016",
        tags: ["education", "bachelors", 'engineering'],
        description: "Graduated in First Division with a focus on 3D modelling",
        actions: [{
            name: "BITS Pilani",
            link: "https://bits-pilani.ac.in",
        }]
    },
    {
        title: "High School",
        icon: "fas fa-graduation-cap",
        subtitle: "K. R. Mangalam World School, Vikaspuri",
        date: "April 2008 - May 2012",
        tags: ["education", "school", 'computers, C++'],
        description: "House Captain in the Senior Year. Scholar and Class In-charge throughout.",
        actions: [{
            name: "K. R. Mangalam",
            link: "https://krmangalam.com",
        }]
    },
    {
        title: "A baby is born",
        icon: "fas fa-baby",
        date: "September 1994",
        tags: ["about"],
        description: "This is the end of the line. Maybe you should drop me a mail.",
        // actions: [{
        //     name: "LinkedIn",
        //     icon: "fab fa-linkedin",
        //     link: "https://www.linkedin.com/in/guptasiddhant9/",
        // }, {
        //     name: "GitHub",
        //     icon: "fab fa-github",
        //     link: "https://www.github.com/guptasiddhant/",
        // }, {
        //     name: "Mail",
        //     icon: "fas fa-envelope",
        //     link: "mailto:me@guptasiddhant.com",
        // }, {
        //     name: "Resume (PDF)",
        //     icon: "fas fa-file-download",
        //     link: "assets/Siddhant_Gupta_Resume.pdf",
        // }]
    }
];
