// get item picture http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{img_logo_url}.jpg remove {}
// get api info /Json file http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=74154A491CFC2034F06B54580A5A52E2&steamid=76561198242197926&format=json
// document.getElementById("output").innerHTML = `<h1>`;




const api_url = 'https://cors-anywhere.herokuapp.com/http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=74154A491CFC2034F06B54580A5A52E2&steamid=76561198242197926&format=json'
// change Counter-Strike: Global Offensive into CS:GO name is very big to display
function displayname(gametype){
    let x = gametype.name;
    if (x=="Counter-Strike: Global Offensive") {
        x = "CS:GO" ;
    }
    return x;
}

// change how time looks and the amount of decimals 
//1 decimal or 0 dependant on the time
function timeplayed(playtime_forever) {
    let timecalc =  (playtime_forever/60).toFixed(1);
    let timeINt = parseInt(timecalc)
    let r = "";
    if (timecalc%timeINt==0){
        r = timeINt
    }
    else {
        r = timecalc
    }
    return r
}
// template to display what was recieved from api display recent games played
// template displays image of game played in last 2 weeks aswell the amount of time on record
function gamelogoTemplate(playedgame){
    return `
        <div class="gameTitles sameColor topcente totheleft gamespaces overvlow">
            <a href="https://store.steampowered.com/app/${playedgame.appid}/">
            <img class="gamelogo"  src ="http://media.steampowered.com/steamcommunity/public/images/apps/${playedgame.appid}/${playedgame.img_logo_url}.jpg">
            </a>
            <h2 class="text-center" >${displayname(playedgame)}</h2>
            <p class="text-center">${timeplayed(playedgame.playtime_forever)} hrs on record</p>
        </div>
        `
}

//async is used to let the html web page still continue and not wait for the api to loud
async function getSteam(){
    try {
        //get the Json data from the steam api
        const response = await fetch(api_url);
        const data = await response.json();
        console.log(data);
        // aswell as casting it into html on the page
        document.getElementById("imaginedude").innerHTML = `
        <h1 class="sameColor text-center"> Recent games played</h1>
        ${data.response.games.map(gamelogoTemplate).join('')}`

    } catch (error) {
        document.getElementById("imaginedude").innerHTML =`API failed to load please try again later`;
        console.log("steam no work");
        console.log(error);
    }
    
}

getSteam();