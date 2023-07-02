var spoonacularKey = "c133c754558c4409918494b340a64248"
const strapiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg4MjUzMzQwLCJleHAiOjE2OTA4NDUzNDB9.oERsdIaePc2LU-c0Yv14Nr9ZZaVFjWbAnCjtGqaYWgY"
function selectApiOperation(apiItem){
    hideSections()
    document.getElementById(apiItem + "-section").style.display = ""
    switch (apiItem){
        case "search":
            break
        case "recipes":
            break
    }
}

function hideSections(){
    const sections = document.getElementsByClassName("content-section")
    for (let section of sections){
        section.style.display = "none"
    }
}

class G5Recipe {
    constructor(recipeData) {
        this.recipeId = recipeData.id;
        this.title = recipeData.title;
        this.image = recipeData.image;
        this.imageType = recipeData.imageType;
        this.vegetarian = recipeData.vegetarian;
        this.vegan = recipeData.vegan;
      }
} 

async function searchRecipesByQuery(){
    const searchSection = document.getElementById("search-section")
    const previousSearchResults = searchSection.querySelectorAll(".search-result")
    previousSearchResults.forEach(element => {
        element.remove()
    })
    var query = document.getElementById('query-input').innerHTML;
    var data = await fetch('https://api.spoonacular.com/recipes/complexSearch?query='+ query +'&apiKey='+ spoonacularKey)
    .then(response => response.json())
    .catch(error => {
        console.error('Error al hacer la solicitud HTTP:', error);
    });
    if (data.code == 402) {
        spoonacularKey = "b3d8248260a64af4aa63ffb4b7c2b2e3"
        searchRecipesByQuery()
        return
    }
    for (let i = 0; i < data.results.length; i++){
        var recipe = data.results[i]
        const newData = await getRecipeInformation(recipe.id)
        recipe.vegetarian = newData.vegetarian
        recipe.vegan = newData.vegan
    } 
    const lRecipes = data.results.map(item => new G5Recipe(item));
    console.log(lRecipes);
    if (lRecipes.length == 0) {
        const message = document.createElement("h3")
        const messageText = document.createTextNode("No se encontraron resultados :(")
        message.appendChild(messageText)
        searchSection.appendChild(message)
        return
    }
    for (let i = 0; i < lRecipes.length; i++){
        const title = document.createElement("h3")
        const titleText = document.createTextNode(lRecipes[i].title)
        title.appendChild(titleText)
        title.classList.add("search-result")
        searchSection.appendChild(title)
    }
}

async function getRecipeInformation(recipeID){
    /* NOTA PARA EL FUTURO: esta funcion tarda una banda porque tiene que esperar todos los datos, 
    asi que conviene buscar los datos despues de que el usuario decide guardar la receta. Por ahora
    lo dejo asi para no complicarme pero bueno vemos */
    /* var data = await fetch('https://api.spoonacular.com/recipes/'+ recipeID +'/information?apiKey='+ spoonacularKey)
    .then(response => response.json())
    .catch(error => {
        console.error('Error al hacer la solicitud HTTP:', error);
    });
        if (data.code == 402) {
        spoonacularKey = "b3d8248260a64af4aa63ffb4b7c2b2e3"
        newData = getRecipeInformation(recipeID)
        return newData
    }
    var newData = new Object()
    newData.vegetarian = data.vegetarian
    newData.vegan = data.vegan */
    // COMENTO TODO PARA NO LLAMAR A LA API MIL VECES MIENTRAS PROBAMOS
    var newData = new Object()
    newData.vegetarian = true
    newData.vegan = false
    return newData
}

//apiKey=c133c754558c4409918494b340a64248 apiKey=b3d8248260a64af4aa63ffb4b7c2b2e3