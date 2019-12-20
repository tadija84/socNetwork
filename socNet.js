
window.onload = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var podaci = xhttp.responseText;
            var korisnici = JSON.parse(podaci);
            console.log(korisnici);
        }
    };
    xhttp.open("GET", "data.json", true);
    xhttp.send();
}