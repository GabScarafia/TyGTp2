const spoonacularKey = "c133c754558c4409918494b340a64248"
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
    var query = document.getElementById('query-input').innerHTML;
    var data = await fetch('https://api.spoonacular.com/recipes/complexSearch?query='+ query +'&apiKey='+ spoonacularKey)
    .then(response => response.json())
    .catch(error => {
        console.error('Error al hacer la solicitud HTTP:', error);
    });
    for (let i = 0; i < data.results.length; i++){
        var recipe = data.results[i]
        const newData = await getRecipeInformation(recipe.id)
        recipe.vegetarian = newData.vegetarian
        recipe.vegan = newData.vegan
    } 
    const lRecipes = data.results.map(item => new G5Recipe(item));
    console.log(lRecipes);
}

async function getRecipeInformation(recipeID){
    /* NOTA PARA EL FUTURO: esta funcion tarda una banda porque tiene que esperar todos los datos, 
    asi que conviene buscar los datos despues de que el usuario decide guardar la receta. Por ahora
    lo dejo asi para no complicarme pero bueno vemos */
    var data = await fetch('https://api.spoonacular.com/recipes/'+ recipeID +'/information?apiKey='+ spoonacularKey)
    .then(response => response.json())
    .catch(error => {
        console.error('Error al hacer la solicitud HTTP:', error);
    });
    var newData = new Object()
    newData.vegetarian = data.vegetarian
    newData.vegan = data.vegan
    return newData
}

//apiKey=c133c754558c4409918494b340a64248 para probar