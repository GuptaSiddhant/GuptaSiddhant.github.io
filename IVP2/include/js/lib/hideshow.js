function hideshow(z) {
    var divParallel = document.getElementById("parallel");
    var divTextual = document.getElementById("textual");
    divParallel.style.display = "none";
    divTextual.style.display = "none";
    switch (z)
    {
        case 'textual': divTextual.style.display = "block"; break;
        case 'parallel': divParallel.style.display = "block"; break;
    }
}