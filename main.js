
var spoonacularKey = ["c133c754558c4409918494b340a64248", "b3d8248260a64af4aa63ffb4b7c2b2e3", "81ddf4b7c36747c09538f797e584694b"]
var strapiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg4MzM4OTQ5LCJleHAiOjE2OTA5MzA5NDl9.rquKZ1LK5qIUQfci3-Uvi2qdCB5aDpia5W_rmPfeze8"


window.onload = async function() {
   await getStrapiKey()
};

class G5Recipe {
    constructor(recipeData) {
        this.id = recipeData.id;
        this.title = recipeData.title;
        this.image = recipeData.image;
        this.imageType = recipeData.imageType;
        this.type = recipeData.type;
      }
}  

const TypeFood = {
    vegan: "vegan",
    vegetarian: "vegetarian",
    other: "other",
}

async function getStrapiKey(){
    const elBody =new Object({
        identifier: "api-user@example.com",
        password: "123456"
    })
    var query = await fetch('https://gestionweb.frlp.utn.edu.ar/api/auth/local',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(elBody)
       
    }).then(response => response.json())
    strapiKey = query.jwt
}

function selectApiOperation(apiItem){
    hideSections()
    document.getElementById(apiItem + "-section").style.display = ""
    switch (apiItem){
        case "search":
            break
        case "graph":
            createGraph()
            break
    }
}

function hideSections(){
    const sections = document.getElementsByClassName("content-section")
    for (let section of sections){
        section.style.display = "none"
    }
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
      searchRecipesByQuery();
    }
  }

async function searchRecipesByQuery() {
    const loadingScreen = document.getElementById("search-loading");
    const noResultsScreen = document.getElementById("no-results");
    const noRequestsScreen = document.getElementById("no-requests");
    loadingScreen.className = "d-none";
    noResultsScreen.className = "d-none";
    noRequestsScreen.className = "d-none";

    const searchSection = document.getElementById("search-section")
    const previousSearchResults = searchSection.querySelectorAll(".search-result")
    previousSearchResults.forEach(element => {
        element.remove()
    })
    var query = document.getElementById('query-input').value;
    console.log(query)
    loadingScreen.className = "d-flex";
    var data = await fetch('https://api.spoonacular.com/recipes/complexSearch?query='+ query +'&apiKey='+ spoonacularKey.at(-1))
    .then(response => response.json())
    .catch(error => {
        console.error('Error al hacer la solicitud HTTP:', error);
    });
    loadingScreen.className = "d-none";
    if (data.code == 402) {
        if (spoonacularKey.length == 1) {
            noRequestsScreen.className = "d-flex";
            console.log("Se acabaron las requests a la API :(")
            return
        }
        spoonacularKey.pop()
        searchRecipesByQuery()
        return
    }
    for (let i = 0; i < data.results.length; i++){
        var recipe = data.results[i]
        const newData = await getRecipeInformation(recipe.id)
        recipe.type = newData
    } 
    const lRecipes = data.results.map(item => new G5Recipe(item));
    if (lRecipes.length == 0) {
        noResultsScreen.className = "d-flex";
        return
    }
    loadingScreen.className = "d-flex";
    for (let i = 0; i < lRecipes.length; i++){
        var container = document.createElement('div');
        container.style.display = 'flex';
        container.style.margin = '16px';
        container.style.gap = '8px';
        container.style.width = '800px';
        container.className = "search-result";

        var image = document.createElement('img');
        image.src = lRecipes[i].image;
        image.alt = 'Foto';
        image.width = '160';
        container.appendChild(image);

        var textContainer = document.createElement('div');
        textContainer.style.display = 'flex';
        textContainer.style.flexDirection = 'column';
        textContainer.style.justifyContent = 'space-between';
        textContainer.style.width = '100%';

        var paragraph = document.createElement('p');
        paragraph.style.fontSize = '1.5rem';
        paragraph.textContent = lRecipes[i].title;
        textContainer.appendChild(paragraph);

        var button = document.createElement('button');
        button.id = lRecipes[i].id;
        button.className = 'md-searchbox-button-text';
        button.style.alignSelf = 'end';
        button.innerHTML = '<span class="material-symbols-outlined" style="margin-right: 4px;">save</span><span>Guardar</span>';
        button.onclick = async function(){
            await saveData(lRecipes[i]);
            
            return false;
          };
        textContainer.appendChild(button);

        container.appendChild(textContainer);

        searchSection.appendChild(container);
    }
    loadingScreen.className = "d-none";
}

async function saveData(recipe){
   var query = await fetch('https://gestionweb.frlp.utn.edu.ar/api/g5-recipes/' + recipe.id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + strapiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        } 
    }).then(response => response.json()).catch(msg => msg.data.json())

    if(query.data){
    }
    else{
        recipe.type = await getRecipeInformation(recipe.id)
        const elBody ={
            "data" : recipe
        } 
        const bodyJson = JSON.stringify(elBody);
        fetch('https://gestionweb.frlp.utn.edu.ar/api/g5-recipes', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + strapiKey,
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
             body: bodyJson,     
        }).then(response => response.json())
    }
    button = document.getElementById(recipe.id);
    button.innerHTML = '<span class="material-symbols-outlined" style="margin-right: 4px;">done</span><span>Guardado</span>';
}

async function getRecipeInformation(id){
    var data = await fetch('https://api.spoonacular.com/recipes/'+ id +'/information?apiKey='+ spoonacularKey.at(-1))
    .then(response => response.json())
    .catch(error => {
        console.error('Error al hacer la solicitud HTTP:', error);
    });
    if (data.code == 402) {
        if (spoonacularKey.length == 1) {
            console.log("Se acabaron las requests a la API :(")
            return
        }
        spoonacularKey.pop()
        newData = getRecipeInformation(id)
        return newData
    }
    if(data.vegan)
    {
        return TypeFood.vegan
    } 
    if(data.vegetarian){
        return TypeFood.vegetarian
    }
    return TypeFood.other
}

async function getCountType(type){
    var data = await fetch('https://gestionweb.frlp.utn.edu.ar/api/g5-recipes?filters[type][$eq]='+type, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + strapiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }  
    }).then(response => response.json())
    var total = data.meta.pagination.total
    return total
}
async function createGraph() {
   
    var vegan = await getCountType("vegan")
    var vegetarian = await getCountType("vegetarian")
    var other = await getCountType("other")

    console.log("vegan: "+ vegan +"vegetarian:"+vegetarian+"other:"+other )
    new Chart("myChart", {
        type: "pie",
        data: {
            labels: [
                'Vegan',
                'Vegetarian',
                'Other'
              ],
              datasets: [{
                label: 'Recetas por tipo',
                data: [vegan, vegetarian, other],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
              }]
        },
      });
}