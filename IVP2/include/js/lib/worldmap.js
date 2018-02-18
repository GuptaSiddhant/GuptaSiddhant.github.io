
// sample data array
var sample_data = [
    {"value": 2315987123, "country": "nausa", "name": "United States"},
    {"value": 38157121349, "country": "aschn", "name": "China"},
    {"value": 21891735098, "country": "euesp", "name": "Spain"},
    {"value": 9807134982, "country": "sabra", "name": "Brazil"}
]
// instantiate d3plus
var visualization = d3plus.viz()
        .container("#viz")        // container DIV to hold the visualization
        .data(sample_data)        // data to use with the visualization
        .coords("http://d3plus.org/topojson/countries.json") // pass topojson coordinates
        .type("geo_map")          // visualization type
        .id("country")            // key for which our data is unique on
        .text("name")             // key to use for display text
        .color("value")           // key for coloring countries
        .tooltip("value")         // keys to place in tooltip
        .draw()                   // finally, draw the visualization!
