

//get input from text box
async function getSuper() {
    x = document.getElementById("SuperTxtbox").value;
    x = x.replace(/\s+/g,'_');
    console.log(x);
    getHero();
    
}
var x ='';

// template to display what was recieved from api display recent games played
function superTemplate(superinfo){
    return `
        <div class="gameTitles sameColor topcente totheleft gamespaces overvlow">
            <img class="superimg"  src ="${superinfo.image.url}">
            <h2 class="text-center" >${superinfo.biography["full-name"]}</h2>
        </div>
        `
}
//get the Json data from the steam api
async function getHero(){
    try {
        var super_url = 'https://www.superheroapi.com/api.php/1692486510917530/search/'+x;
        console.log(super_url);
        const response = await fetch(super_url);
        const data = await response.json();
        if(data.response == "error"){
            document.getElementById("SuperHeroApi").innerHTML = `
            <h1 class="sameColor text-center">No Character found called ${x}</h1>`
        }
        
        console.log(data);
        console.log(data.results[0].name);
        console.log(data.results[0].biography.publisher);
        document.getElementById("SuperHeroApi").innerHTML = `
        <h1 class="sameColor text-center">Search resaults for ${x}</h1>
        ${data.results.map(superTemplate).join('')}`

    } catch (error) {
        console.log("Hero no work");
        console.log(error);
    }
    
}