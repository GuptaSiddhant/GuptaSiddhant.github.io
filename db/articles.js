// Primary:     title, subtitle, icon, date, tags,
// Secondary:   summary, role, tech, attachments, actions
// Viewer:      url, file, filetype(md)

let articles = [
    {
        title: "Hi, I'm Siddhant Gupta",
        subtitle: "UX Designer • Full-Stack Developer • Entrepreneur",
        tags: ["about"],
        summary:
            "Ever since I could first remember, I’ve been fascinated by how things work. While it took me some time to discover my passion for design, I haven’t stopped pursuing it since. I am incredibly detail orientated and believe that small thing can make the biggest impact. If I had to describe myself in one word, that’d be STALWART.",
        attachments: [
            {
                name: "Siddhant Gupta",
                image: "assets/siddhantgupta.jpg",
                full: false
            }
        ],
        actions: [
            {
                name: "Resume (PDF)",
                icon: "fas fa-file-download",
                link: "assets/Siddhant_Gupta_Resume.pdf"
            },
            {
                name: "LinkedIn",
                icon: "fab fa-linkedin",
                link: "https://www.linkedin.com/in/guptasiddhant9/"
            },
            {
                name: "GitHub",
                icon: "fab fa-github",
                link: "https://www.github.com/guptasiddhant/"
            },
            {
                name: "Mail",
                icon: "fas fa-envelope",
                link: "mailto:me@guptasiddhant.com"
            }
        ]
    },
    {
        title: "Freelance Designer",
        subtitle: "KALPIK",
        tags: ["experience", "startup", "design"],
        summary: `Porjects: Business Espoo - Visual Identity`,
        role: `Started a freelance firm to do different and interesting projects in the field of of branding, UI design, and app/web development.`,
        actions: [
            {
                name: "Coming Soon",
                link: "#"
            }
        ]
    },
    {
        title: "UX Designer",
        subtitle: "FA Solutions Oy, Helsinki, Finland",
        date: "January 2019 - Present",
        tags: ["experience", "design"],
        summary:
            "- Designing the product features.<br>" +
            "- Supporting UI/UX development of core product and articles team <br>" +
            "- Generating graphic design for marketing team",
        actions: [
            {
                name: "FA Solutions",
                link: "https://fasolutions.com"
            }
        ]
    },
    {
        title: "M.Sc. Human Computer Interaction & Design",
        subtitle: `Aalto University, Finland
       KTH Royal Institute of Technology, Sweden`,
        date: "August 2017 - June 2019",
        tags: ["education", "masters"],
        summary: "Dual degree program as a part of EIT Digital Master School.",
        actions: [
            {
                name: "Masters thesis",
                link: "https://aaltodoc.aalto.fi/handle/123456789/39028"
            },
            {
                name: "Aalto University",
                link:
                    "https://www.aalto.fi/en/study-options/masters-programme-in-ict-innovation-eit-digital-master-school-human-computer"
            },
            {
                name: "KTH",
                link:
                    "https://www.kth.se/en/studies/master/ict-innovation/introduction-1.609472"
            }
        ]
    },
    {
        title: "Business Espoo - Visual Identity",
        subtitle: "KALPIK Design",
        date: "April 2019",
        tags: ["project", "branding", "styling"],
        summary:
            "Business Espoo supports the vitality of businesses by offering the best, continuously developing services in one place.",
        role: "Solely designed the Brand Identity and Style Guidelines",
        tech: ["Sketch", "InDesign"],
        attachments: [
            {
                name: "BE Logo",
                image: "articles/businessespoo/BE.jpg"
            },
            {
                name: "BE Guidelines Mockup",
                image: "articles/businessespoo/bebook.jpg"
            }
        ],
        actions: [
            {
                name: "Style Guidelines",
                link: "articles/businessespoo/BE_VIS_Guidelines_EN-2019-150dpi.pdf"
            }
        ]
    },
    {
        title: "Arcadia - Web Game Store",
        subtitle: "Aalto University",
        date: "April 2019",
        tags: ["project", "back-end", "front-end", "UI"],
        summary:
            "Arcadia is an online game store for JavaScript games. Developed as a project for the Web Software Development course CS-C3170 2018-2019 at Aalto University, Finland.",
        role:
            "Solely designed the UI and developed the majority the front-end and considerable back-end.",
        tech: ["Python", "Django", "JavaScript", "Sketch"],
        attachments: [
            {
                name: "Arcadia Website",
                image: "articles/arcadia/arcadia.jpg"
            }
        ],
        actions: [
            {
                name: "Visit Demo",
                link: "https://arcadiagames.herokuapp.com/"
            },
            {
                name: "GitHub",
                icon: "fab fa-github",
                link: "https://github.com/GuptaSiddhant/arcadia"
            }
        ]
    },
    {
        title: "DELTA - Help.Share.Earn.",
        subtitle: "KTH Royal Institute of Technology",
        date: "April 2017",
        tags: ["project", "UI", "research"],
        summary:
            "A mobile based platform where residents can engage with their community and can either benefit from it or help the other residents in their day-to-day work like renting them seldom used commodities, help them move, provide professional help with software help etc. The users can subscribe to the categories they can provide help and feedback for the same will be provided.",
        role: "Researched and Designed the UI in a team of 3 people.",
        tech: ["Sketch", "InVision"],
        attachments: [
            {
                name: "DELTA",
                image: "articles/delta/delta.jpg"
            }
        ],
        actions: [
            {
                name: "Case Study",
                link: "https://bhutani.design/delta.html"
            }
        ]
    },
    {
        title: "The Passport - Concept",
        subtitle: "The Startup - Medium",
        date: "8 May 2017",
        tags: ["blog", "concept"],
        summary: "The elegant All-In-One Identity solution for every Citizen.",
        role:
            "Conceptualised and designed a mock representation of possible Passport Card.",
        tech: ["Sketch"],
        attachments: [
            {
                name: "Passport Concept",
                image: "articles/passport/passport1.jpg"
            },
            {
                name: "Passport Concept",
                image: "articles/passport/passport2.jpg"
            }
        ],
        actions: [
            {
                name: "Read More",
                link: "#blog/passport",
                target: "_self"
            }
        ],
        url: "passport",
        file: "articles/passport/passport.md",
        filetype: "md"
    },
    {
        title: "Co-Founder & Product Designer",
        subtitle: "QB Middle East FZ-LLC, Dubai, U.A.E.",
        date: "August 2016 - August 2017",
        tags: ["experience", "startup", "entrepreneur", "design", "management"],
        summary: `- Designing UI for web and mobile app. <br>
             - Service Design and customer journey design. <br>
             - Managing team of developers and designer.`,
        actions: [
            {
                name: "QuickBytz",
                link: "https://quickbytz.com"
            }
        ]
    },
    {
        title: "Design Executive",
        subtitle: "Sprint Middle East LLC, Dubai, U.A.E.",
        date: "February 2016 - April 2017",
        tags: ["experience", "design", "marketing"],
        summary: `- Designing UI for web and mobile apps. <br>
        - Communicating with target audiences, presenting the demo. <br>
        - Managing customer relationships and Conducting market research`,
        actions: [
            {
                name: "Sprint ME",
                link: "https://sprintonweb.com"
            }
        ]
    },
    {
        title: "B.Eng. (Honors) Mechanical Engineering",
        subtitle: "Birla Institute of Technology and Science (BITS), Pilani",
        date: "September 2012 - July 2016",
        tags: ["education", "bachelors", "engineering"],
        summary: "Graduated in First Division with a focus on 3D modelling",
        actions: [
            {
                name: "Degree Certificate",
                link: "assets/BITSDegree.jpg",
                icon: "fas fa-image"
            },
            {
                name: "BITS Pilani",
                link: "https://bits-pilani.ac.in"
            }
        ],
        attachments: [
            {
                name: "Degree",
                image: "assets/BITSDegree.jpg"
            }
        ]
    },
    {
        title: "Graphic Designer",
        subtitle: "Birla Institute of Technology and Science, Pilani",
        date: "September 2014 - December 2015",
        tags: ["experience", "design", "assistant"],
        summary: `Graphic Designer & Professional Assistant to the Dean of Student Welfare Division. Designed banners, advertisements, posters and other materials for Admissions Department.`,
        attachments: [
            {
                name: "Achieve@BITS",
                image: "articles/bitspilani/bits1.jpg"
            },
            {
                name: "Lead@BITS",
                image: "articles/bitspilani/bits2.jpg"
            }
        ],
        actions: [
            {
                name: "BITS Pilani",
                link: "https://bits-pilani.ac.in"
            }
        ]
    },
    {
        title:
            "I have worked with Siddhant and he is a great person. He has a great passion for Design and I personally liked his work. He is very dedicated and hard working.",
        subtitle: "Manish K.",
        date: "14 August 2015",
        tags: ["testemonial"],
        summary: "Manish and I worked together over a website design.",
        actions: [
            {
                name: "LinkedIn",
                link: "https://www.linkedin.com/in/guptasiddhant9/"
            }
        ]
    },
    {
        title: "Graphic Design Intern",
        subtitle: "Zikr Studio, Delhi, India",
        date: "July 2015 - August 2015",
        tags: ["experience", "design", "intern"],
        summary: `I catered to all design needs of Zikr Studio. From designing website pages, logos, App UI/UX and more.`,
        actions: [
            {
                name: "Zikr Studio",
                link: "http://www.zikrstudio.com/"
            }
        ]
    },
    {
        title: "High School",
        subtitle: "K. R. Mangalam World School, Vikaspuri, India",
        date: "April 2008 - May 2012",
        tags: ["education", "school", "computers", "C++"],
        summary:
            "House Captain in the Senior Year. Scholar and Class In-charge throughout.",
        actions: [
            {
                name: "K. R. Mangalam",
                link: "https://krmangalam.com"
            }
        ]
    },
    {
        title: "SyburyOS in C++",
        subtitle: "High School Project",
        date: "April 2008 - May 2012",
        tags: ["project", "school", "C++"],
        summary:
            "DOS-based Operating System UI bundled with a desktop, text-editor, game and voting software.",
        tech: ["C++"],
        actions: [
            {
                name: "GitHub",
                icon: "fab fa-github",
                link: "https://github.com/GuptaSiddhant/SyburyOS"
            }
        ]
    },
    {
        title: "When it all began",
        icon: "fas fa-baby",
        date: "September 1994",
        tags: ["about"],
        summary:
            "This is the end of the line. Maybe we should continue over e-mail.",
        actions: [
            {
                name: "Mail Me",
                icon: "fas fa-envelope",
                link: "mailto:me@guptasiddhant.com"
            },
            {
                name: "Back to Top",
                icon: "fas fa-chevron-up",
                type: "top"
            }
        ]
    }
];
