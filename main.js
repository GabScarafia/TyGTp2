const spoonacularKey = "c133c754558c4409918494b340a64248"

function selectApiOperation(apiItem){
    hideSections()
    document.getElementById(apiItem + "-section").style.display = ""
    switch (apiItem){
        case "search":
            getRandomRecipe()
            break
        case "recipes":
            getRandomUser()
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
    constructor(id, title, image, imageType) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.imageType = imageType;
      }
} 

async function searchRecipesByQuery(){
    var query = document.getElementById('query-input').innerHTML;
    var data = await fetch('https://api.spoonacular.com/recipes/complexSearch?query='+ query +'&apiKey='+ spoonacularKey)
    .then(response => response.json())
    .catch(error => {
        console.error('Error al hacer la solicitud HTTP:', error);
    });
    const lRecipes = data.results.map(item => new G5Recipe(item));
    console.log(lRecipes);
}


async function getRecipeCard(recipeID){
    const data = await fetch('https://api.spoonacular.com/recipes/' + recipeID + '/card&apiKey='+ spoonacularKey)
    .then(response => response.json())
    .catch(error => {
        console.error('Error al hacer la solicitud HTTP:', error);
    });
    const card = data.url
}