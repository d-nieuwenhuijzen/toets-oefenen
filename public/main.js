const containerFluid = document.querySelector('.container-fluid');
const inputName = document.querySelector('.inputName');
const inputDescription = document.querySelector('.inputDescription');
const inputPice = document.querySelector('.inputPrice');

fetch("/icecreams")
    .then(myData => myData.json())
    .then(jsonData => icecreamShow(jsonData));

function icecreamShow(icecreams) {
    console.log(icecreams);
    let htmlCode = '';
    for (let i = 0; i < icecreams.length; i++) {
        const icecream = icecreams[i];
        htmlCode += icecreamCards(icecream);
    }
    containerFluid.innerHTML += htmlCode;
}

function icecreamCards(icecream) {
    const card = `
    <div class="card">
    <div class="card-body">
    <h4 class="card-title">${icecream.icecream}</h4>
    <p class="card-text">${icecream.description}</p>
    <p class="card-text">${icecream.price}</p>
    </div>
    </div>
    `;
    return card;
}

submitButton.addEventListener('click', function (e) {
    //met preventDefault stoppen we het default submitten van het HTML formulier (we voeren zelf de POST uit)
    e.preventDefault();

    //we lezen de waarden uit van het formulier
    const name = inputName.value;
    const description = inputDescription.value;
    const price = inputPrice.value;

    (async () => {
        //we voeren de fetch uit naar de url /user-add, gebruiken de POST methode en gaan json versturen in de body
        const rawResponse = await fetch('/user-add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ icecream: name, description: description, price: price })
        });
        //het antwoord wat we van de server terugkrijgen zetten we om naar een JavaScript object met json();
        const content = await rawResponse.json();

        //in het object wat we terugkrijgen verwachten we de property userAdded die ofwel true of false is
        if(content.userAdded){
            //als de waarde true is dan is de gebruiker toegevoegd
            alert('Gebruiker toegevoegd');
        } else{
            //als de waarde false is dan is er iets misgegaan met het toevoegen
            alert('Niet gelukt om de gebruiker toe te voegen');
        }

    })();

});