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