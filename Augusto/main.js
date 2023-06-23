const spoonacularKey = "c133c754558c4409918494b340a64248"

function selectRandomPhrase(){
    var changed = false
    while(!changed){
        const numero = Math.floor(Math.random() * 3)
        const nuevoID = "frase-" + numero
        const fraseActual = document.getElementsByClassName("frase")[0]
        if (fraseActual.id != nuevoID){
            const fraseNueva = document.getElementById(nuevoID)
            fraseActual.classList.remove("frase")
            fraseActual.classList.add("frase-dn")
            fraseNueva.classList.remove("frase-dn")
            fraseNueva.classList.add("frase")
            changed = true
        }
    }
}
function selectApi(apiId){
    const apiSublist = document.getElementById(apiId + "-sublist")
    if (apiSublist.classList.contains("sublist-hidden")){
        apiSublist.classList.remove("sublist-hidden")
        apiSublist.classList.add("sublist-shown")
    } else {
        apiSublist.classList.remove("sublist-shown")
        apiSublist.classList.add("sublist-hidden")
    }
}
function selectApiOperation(apiItem){
    hideSections()
    document.getElementById(apiItem + "-section").style.display = ""
    switch (apiItem){
        case "api1a":
            getRandomRecipe()
            break
        case "api1b":
            const form = document.getElementsByClassName("form-i")[0];
            form.addEventListener("submit", searchIngredient)
            break
        case "api2a":
            getRandomUser()
            break
        case "api3a":
            getRandomCatFact()
            break
    }
}
function showWelcomeSection(){
    hideSections()
    document.getElementById("welcome").style.display = ""
    selectRandomPhrase()
}
function hideSections(){
    const sections = document.getElementsByClassName("content-section")
    for (let section of sections){
        section.style.display = "none"
    }
}
async function getRandomRecipe(){
    const image = document.getElementsByClassName("img-rr")[0]
    const title = document.getElementsByClassName("title-rr")[0]
    const summary = document.getElementById("summary-rr")
    const source = document.getElementsByClassName("source-rr")[0]
    image.src = ""
    const response = await fetch("https://api.spoonacular.com/recipes/random?apiKey=" + spoonacularKey)
    const json = await response.json()
    const recipe = json["recipes"][0]
    image.src = recipe["image"]
    title.innerHTML = recipe["title"]
    summary.innerHTML = recipe["summary"]
    source.innerHTML = "Source: " + recipe["sourceName"]
    source.href = recipe["sourceUrl"]
}
async function searchIngredient(event){
    event.preventDefault()
    const image = document.getElementsByClassName("img-i")[0]
    const query = document.getElementById("ingredient-query").value
    const response = await fetch("https://api.spoonacular.com/food/ingredients/search?query=" + query + "&number=1&apiKey=" + spoonacularKey)
    const json = await response.json()
    if (json["totalResults"] != 0){
    const ingredient = json["results"][0]
    image.src = "https://spoonacular.com/cdn/ingredients_250x250/" + ingredient["image"]
    image.style.display = "flex"
    } else {
        image.style.display = "none"
        image.src = ""
    }
}
async function getRandomUser(){
    const avatar = document.getElementsByClassName("avatar")[0]
    const firstName = document.getElementById("first-name")
    const lastName = document.getElementById("last-name")
    const email = document.getElementById("email")
    const response = await fetch("https://random-data-api.com/api/v2/users")
    const json = await response.json()
    avatar.src = await json["avatar"]
    firstName.innerHTML = json["first_name"] + "&nbsp"
    lastName.innerHTML = json["last_name"]
    email.innerHTML = json["email"]
}
async function getRandomCatFact(){
    const catfact = document.getElementById("cat-fact")
    const response = await fetch("https://catfact.ninja/fact")
    const json = await response.json()
    catfact.innerHTML = json["fact"]
}