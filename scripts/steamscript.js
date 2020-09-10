// get item picture http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{img_logo_url}.jpg remove {}
// get api info /Json file http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=74154A491CFC2034F06B54580A5A52E2&steamid=76561198242197926&format=json
// console.log("running steamscript");
// document.getElementById("output").innerHTML = `<h1>`;




const api_url = 'https://cors-anywhere.herokuapp.com/http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=74154A491CFC2034F06B54580A5A52E2&steamid=76561198242197926&format=json'
// change Counter-Strike: Global Offensive into CS:GO name is very huge
function displayname(gametype){
    let x = gametype.name;
    if (x=="Counter-Strike: Global Offensive") {
        x = "CS:GO" ;
    }
    return x;
}

// change how time looks and the amount of decimals
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
function gamelogoTemplate(playedgame){
    return `
        <div class="gameTitles sameColor totheleft gamespaces overvlow">
            <img class="gamelogo" src ="http://media.steampowered.com/steamcommunity/public/images/apps/${playedgame.appid}/${playedgame.img_logo_url}.jpg">
            <h2 class="text-center" >${displayname(playedgame)}</h2>
            <p class="text-center">${timeplayed(playedgame.playtime_forever)} hrs on record</p>
        </div>
        `
}
//get the Json data from the steam api
async function getSteam(){
    try {
        const response = await fetch(api_url);
        const data = await response.json();
        console.log(data);
        console.log(data.response.games[0].name);
        console.log(data.response.games[1].name);
        document.getElementById("imaginedude").innerHTML = `
        <h1 class="sameColor text-center"> Recent games played</h1>
        ${data.response.games.map(gamelogoTemplate).join('')}`

    } catch (error) {
        console.log("steam no work");
        console.log(error);
    }
    
}

getSteam();

// var staticUrl = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=74154A491CFC2034F06B54580A5A52E2&steamid=76561198242197926&format=json'
// $.getJSON(staticUrl, function(data){
//     //function code
//     for (i=0;i<data.length; i=i+1) {
//         console.log(data.games[i].name)
//     }
// });