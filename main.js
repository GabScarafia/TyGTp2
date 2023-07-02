//import { G5Recipe, TypeFood } from "./classes"
var spoonacularKey = "c133c754558c4409918494b340a64248"
const strapiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg4MjUzMzQwLCJleHAiOjE2OTA4NDUzNDB9.oERsdIaePc2LU-c0Yv14Nr9ZZaVFjWbAnCjtGqaYWgY"

class G5Recipe {
    constructor(recipeData) {
        this.recipeId = recipeData.id;
        this.title = recipeData.title;
        this.image = recipeData.image;
        this.imageType = recipeData.imageType;
        this.type = recipeData.type;
      }
}  

const TypeFood = {
    vegan: "vegan",
    vegetarian: "vegetarian",
    //normal: "normal" ahre forro
    other: "other",
}


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

// class G5Recipe {
//     constructor(recipeData) {
//         this.recipeId = recipeData.id;
//         this.title = recipeData.title;
//         this.image = recipeData.image;
//         this.imageType = recipeData.imageType;
//         this.type = recipeData.type;
//       }
// } 
// const TypeFood = {
//     vegan: "vegan",
//     vegetarian: "vegetarian",
//     //normal: "normal" ahre forro
//     omnivore: "omnivore",
// }

async function searchRecipesByQuery(){
    const searchSection = document.getElementById("search-section")
    const previousSearchResults = searchSection.querySelectorAll(".search-result")
    previousSearchResults.forEach(element => {
        element.remove()
    })
    var query = document.getElementById('query-input').innerHTML;
    // var data = await fetch('https://api.spoonacular.com/recipes/complexSearch?query='+ query +'&apiKey='+ spoonacularKey)
    // .then(response => response.json())
    // .catch(error => {
    //     console.error('Error al hacer la solicitud HTTP:', error);
    // });
    // if (data.code == 402) {
    //     spoonacularKey = "b3d8248260a64af4aa63ffb4b7c2b2e3"
    //     searchRecipesByQuery()
    //     return
    // }
    // for (let i = 0; i < data.results.length; i++){
    //     var recipe = data.results[i]
    //     const newData = await getRecipeInformation(recipe.id)
    //     recipe.type = newData
    // } 
    //const lRecipes = data.results.map(item => new G5Recipe(item));
    const lRecipes = [{
                        "id":782585,
                        "title":"Cannellini Bean and Asparagus Salad with Mushrooms",
                        "image":"https://spoonacular.com/recipeImages/782585-312x231.jpg",
                        "imageType":"jpg"
                        },
                        {
                            "id":716426,
                            "title":"Cauliflower, Brown Rice, and Vegetable Fried Rice",
                            "image":"https://spoonacular.com/recipeImages/716426-312x231.jpg",
                            "imageType":"jpg"
                        }]
                        
    console.log(lRecipes);
    if (lRecipes.length == 0) {
        const message = document.createElement("h3")
        const messageText = document.createTextNode("No se encontraron resultados :(")
        message.appendChild(messageText)
        searchSection.appendChild(message)
        return
    }
    for (let i = 0; i < lRecipes.length; i++){
        //const itemContainer = document.createElement("div");
        
        //itemContainer.classList.add("result-item-container");
        //const itemImage = document.createElement('img');
        //const test = document.getElementById("test-imagen")

        //itemImage.setAttribute('src', lRecipes[i].image);
        //test.setAttribute('src', lRecipes[i].image);
        ////itemImage.setAttribute('alt', 'Recipe Image');

        //const itemDiv = document.createElement('div');
        //itemDiv.classList.add("result-item-div");
        ////title
        //const itemTitle = document.createElement('h2');
        //itemTitle.textContent = lRecipes[i].title;
        ////boton
        //const itemButton = document.createElement("button");
        //const itemButtonSpan = document.createElement("span");
        //itemButtonSpan.classList.add("material-symbols-outlined");
        //itemButtonSpan.innerHTML = "save";
        //itemButton.appendChild(itemButtonSpan);
        //itemContainer.appendChild(itemImage);
        //itemContainer.appendChild(itemDiv);
        //itemDiv.appendChild(itemTitle);
        //itemDiv.appendChild(itemButton);
        //searchSection.appendChild(itemContainer)

        // Crear el contenedor principal
        var container = document.createElement('div');
        container.style.display = 'flex';
        container.style.margin = '16px';
        container.style.gap = '8px';
        container.style.width = '800px';

        // Crear la imagen
        var image = document.createElement('img');
        image.src = lRecipes[i].image;
        image.alt = 'Foto';
        image.width = '160';
        container.appendChild(image);

        // Crear el contenedor de texto y botón
        var textContainer = document.createElement('div');
        textContainer.style.display = 'flex';
        textContainer.style.flexDirection = 'column';
        textContainer.style.justifyContent = 'space-between';
        textContainer.style.width = '100%';

        // Crear el párrafo
        var paragraph = document.createElement('p');
        paragraph.style.fontSize = '1.5rem';
        paragraph.textContent = lRecipes[i].title;
        textContainer.appendChild(paragraph);

        // Crear el botón
        var button = document.createElement('button');
        button.className = 'md-searchbox-button-text';
        button.style.alignSelf = 'end';
        button.innerHTML = '<span class="material-symbols-outlined" style="margin-right: 4px;">save</span><span>Guardar</span>';
        textContainer.appendChild(button);

        // Agregar el contenedor de texto y botón al contenedor principal
        container.appendChild(textContainer);

        // Agregar el contenedor principal al elemento padre
        searchSection.appendChild(container);
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
    newData.type = TypeFood.vegetarian
    return newData
}

//apiKey=c133c754558c4409918494b340a64248 apiKey=b3d8248260a64af4aa63ffb4b7c2b2e3