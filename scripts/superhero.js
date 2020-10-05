

//get input from text box
async function getSuper() {
    Hname = document.getElementById("SuperTxtbox").value;
    // replace space with underscore for search purpose 
    x = Hname.replace(/\s+/g,'_');
    console.log(x);
    getHero();
    
}


// 
function doesHaveName(bioName){
    var k = bioName.biography["full-name"];
    // get full name but if no full name only name will be used instead
    if (k =="") {
        k = bioName.name;
    } 
    return k
}


var x ='';
var Hname ='';
// template to display what was recieved from api display searched super hero / villain
function superTemplate(superinfo){
    return `
        <div class="gameTitles sameColor topcente totheleft gamespaces overvlow">
            <img class="superimg"  src ="${superinfo.image.url}">
            <h2 class="text-center superimg" >${doesHaveName(superinfo)}</h2>
        </div>
        `
}
//async is used to let the html web page still continue and not wait for the api to loud
//get the Json data from the steam api
async function getHero(){
    try {
        // search
        var super_url = 'https://www.superheroapi.com/api.php/1692486510917530/search/'+x;
        console.log(super_url);
        const response = await fetch(super_url);
        const data = await response.json();
        // if lets you know if nothing was found in your search 
        if(data.response == "error"){
            document.getElementById("SuperHeroApi").innerHTML = `
            <h1 class="sameColor text-center">No Character found called ${x}</h1>`
        }
        // console logs are for testing purpose 
        console.log(data);
        console.log(data.results[0].name);
        console.log(data.results[0].biography.publisher);
        document.getElementById("SuperHeroApi").innerHTML = `
        <h1 class="sameColor text-center">Search results for ${Hname}</h1>
        ${data.results.map(superTemplate).join('')}`

    } catch (error) {
        console.log("Hero no work");
        console.log(error);
    }
    
}