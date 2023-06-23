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