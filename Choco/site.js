function setPhraseAndColor() {
    const randInt = Math.floor(Math.random() * 3);
    const phrases = [
        "El que no corre vuela",
        "Y viste como es la cosa, es todo un tema",
        "Pero vos sos yo!? Eh!?"
    ];
    document.getElementById("phrase").innerHTML = phrases[randInt];
    document.getElementById("phrase").className = "body1 phrase" + randInt.toString();
}

function managePage(page) {
    const home = document.getElementById("home");
    const api1 = document.getElementById("api1");
    const api2 = document.getElementById("api2");

    home.style.display = "none";
    api1.style.display = "none";
    api2.style.display = "none";

    if (page == 0) {
        home.style.display = "initial";
        setPhraseAndColor();
    }
    else if (page == 1) {
        api1.style.display = "initial";
        getCat();
    }
    else {
        api2.style.display = "initial";
    }
}

async function getCat() {
    const textValue = document.getElementById("api1Field").value;
    const catImage = document.getElementById("api1Img");

    if (textValue == "")
        textValue = "Gatito";

    fetch("https://cataas.com/cat/says/" + textValue)
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Error al obtener la imagen de Cataas.');
        })
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            catImage.src = imageUrl
        })
        .catch(error => {
            console.error(error);
        });
}

function getDog() {
    const dogImage = document.getElementById("api2Img");

    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.message;
            dogImage.src = imageUrl;
        })
        .catch(error => {
            console.log('Error al obtener la imagen de Dog CEO', error);
        });
}