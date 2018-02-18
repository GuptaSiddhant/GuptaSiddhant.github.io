function hideshow(z) {
    var divParallel = document.getElementById("parallel");
    var divTextual = document.getElementById("textual");
    var divMap = document.getElementById("worldmap");
    divParallel.style.display = "none";
    divTextual.style.display = "none";
    divMap.style.display = "none";
    switch (z)
    {
        case 'textual': divTextual.style.display = "block"; break;
        case 'parallel': divParallel.style.display = "block"; break;
        case 'worldmap': divMap.style.display = "block"; break;
    }
}

function showmap(z) {
    var div1993 = document.getElementById("viz1993");
    var div1998 = document.getElementById("viz1998");
    var div2004 = document.getElementById("viz2004");
    var div2009 = document.getElementById("viz2009");
    var div2014 = document.getElementById("viz2014");

    div1993.style.display = "none";
    div1998.style.display = "none";
    div2004.style.display = "none";
    div2009.style.display = "none";
    div2014.style.display = "none";

    switch (z)
    {
        case 'v1993': div1993.style.display = "block"; break;
        case 'v1998': div1998.style.display = "block"; break;
        case 'v2004': div2004.style.display = "block"; break;
        case 'v2009': div2009.style.display = "block"; break;
        case 'v2014': div2014.style.display = "block"; break;
    }
}


