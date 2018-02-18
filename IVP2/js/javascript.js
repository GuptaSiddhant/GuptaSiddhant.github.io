var color_na = d3.rgb("#d4d4d4");
// only works if array.length-1 is between 3 and 9 (d3 color scheme)
var quantiles = [0, 0.2, 0.4, 0.6, 0.8, 1];
var init_year = 1990;
var headline = "Number of deaths caused by storms in ";

/// main

// slider
d3.select("slider").insert("p", ":first-child").append("input")
    .attr("type", "range")
    .attr("min", "1990")
    .attr("max", "2016")
    .attr("value", init_year)
    .attr("id", "year");

d3.select("slider").insert("h2", ":first-child").text(headline + init_year);

//Data Load
d3.csv("data/Data.csv", function(data) {

    data.forEach(function(d) {
        d.Determination = +d.Determination;
        d.HardWork = +d.HardWork;
        d.Imagination = +d.Imagination;
        d.Independence = +d.Independence;
        d.Obedience = +d.Obedience;
        d.Religious = +d.Religious;
        d.Respect = +d.Respect;
        d.Saving = +d.Saving;
        d.Unselfishness = +d.Unselfishness;
        d.Year = +d.Year;
    });
    console.log(data[1]);

    return {
        Determination : +data.Determination,
        HardWork : +data.HardWork,
        Imagination : +data.Imagination,
        Independence : +data.Independence,
        Obedience : +data.Obedience,
        Religious : +data.Religious,
        Respect : +data.Respect,
        Saving : +data.Saving,
        Unselfishness : +data.Unselfishness,
        Year : +data.Year,
        Country : data.Country,
        CC : data.CC
    };
});

var basic_choropleth = new Datamap({
    element: document.getElementById("basic_choropleth"),
    projection: 'mercator',
    fills: {
        defaultFill: "#f2f2f2",
        authorHasTraveledTo: "#fa0fa0"
    },
    data: {
        USA: { fillKey: "authorHasTraveledTo" },
        JPN: { fillKey: "authorHasTraveledTo" },
        ITA: { fillKey: "authorHasTraveledTo" },
        CRI: { fillKey: "authorHasTraveledTo" },
        KOR: { fillKey: "authorHasTraveledTo" },
        DEU: { fillKey: "authorHasTraveledTo" },
        IND: { fillKey: "authorHasTraveledTo" }
    },
    scope: 'world', // Currently supports 'usa' and 'world', however with custom map data you can specify your own
    //setProjection: setProjection, // Returns a d3 path and projection functions
    //projection: 'equirectangular', // Style of projection to be used. try "mercator"
    //height: null, // If not null, datamaps will grab the height of 'element'
    //width: null, // If not null, datamaps will grab the width of 'element',
    responsive: false, // If true, call `resize()` on the map object when it should adjust it's size
    done: function() {}, // Callback when the map is done drawing
    dataType: 'csv', // For use with dataUrl, currently 'json' or 'csv'. CSV should have an `id` column
    //dataUrl: null, // If not null, datamaps will attempt to fetch this based on dataType ( default: json )
    geographyConfig: {
      //  dataUrl: null, // If not null, datamaps will fetch the map JSON (currently only supports topojson)
        hideAntarctica: true,
        hideHawaiiAndAlaska : false,
        borderWidth: 1,
        borderOpacity: 1,
        borderColor: '#FDFDFD',
     //   popupTemplate: function(geography, data) { // This function should just return a string
       //     return '&lt;div class="hoverinfo"&gt;&lt;strong&gt;' + geography.properties.name + '&lt;/strong&gt;&lt;/div&gt;';
        //},
        popupOnHover: true, // True to show the popup while hovering
        highlightOnHover: true,
        highlightFillColor: '#FC8D59',
        highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
        highlightBorderWidth: 2,
        highlightBorderOpacity: 1
    }
});

var colors = d3.scale.category10();
