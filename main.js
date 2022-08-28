let url = `https://pokeapi.co/api/v2/pokemon/`;
let allPokemon = [];
let currentPokemon;
let stats = [];


async function GetPokemons() {
    for (let i = 0; i < 15; i++) {
        const pokemonUrl = url + (i + 1);

        let response = await fetch(pokemonUrl);
        currentPokemon = await response.json();
        allPokemon.push(currentPokemon);
        renderPokemon(i);
        renderTypes(i);

    }

    console.log('API answers', currentPokemon);
}

function renderPokemon(i) {
    let placePokemon = document.querySelector('.place_content');
    let pokemonImg = currentPokemon['sprites']['other']['dream_world']['front_default'];

    placePokemon.innerHTML += /*html*/ `    
        <div onclick="openPokemon(${i})" class="box_content">
            <div class="place_info">
                <h1 class="pokemon_head">${currentPokemon['name']}</h1>
                <h2 class="pokemon_num">#${currentPokemon['id']}</h2>
                <div id="place_characteristics${i}" class="place_characteristics">

                </div>
            </div>
            <img class="pokemon_img" src="${pokemonImg}" alt="pokemon">
        </div>`

}


function renderTypes(i) {
    for (let j = 0; j < allPokemon[i]['types'].length; j++) {
        let type = allPokemon[i]['types'][j];

        document.getElementById('place_characteristics' + i).innerHTML += `
            <div class="box_characteristics">
                <div class="box_icon">
                    <img class="icon_characteristics" src="icons/${type['type']['name']}.png">
                </div>
                <p  class="characteristics">
                    ${type['type']['name']}
                </p>
             </div>`
    }
}

function renderTypesOp(i) {
    for (let j = 0; j < allPokemon[i]['types'].length; j++) {
        let type = allPokemon[i]['types'][j];
        document.getElementById('headingCharacteristics').innerHTML += ` 
    <p class="characteristics_op">${type['type']['name']}</p>`
    }
}

function cmToMeter() {
    let centimeter = document.getElementById('pommes').textContent;
    centimeter = parseFloat(centimeter);
    let meter = centimeter / 10;

    document.getElementById("pommes").innerHTML = `${meter} Meter`;

}

function abilityBar(i) {
    let box_bar = document.getElementById('placeStatsNum');
    stats = [];
    for (let j = 0; j < allPokemon[i]['stats'].length; j++) {
        let stat = allPokemon[i]['stats'][j]['base_stat'];
        stats.push(stat);

        box_bar.innerHTML += /*html*/ `
            <div class="box_num_bar">
                <div class="box_bar">
                    <div id="bar${j}" class="bar"></div>
                </div>
                <p>${stat}</p>
            </div>`
        document.getElementById('bar' + j).style.width = `${stat - 10}%`;
        checkBar(j);
    }
}

function checkBar(j) {
    console.log(stats);
    if (stats[j] >= 50) {
        document.getElementById('bar' + j).style.backgroundColor = "#115411";
    } else {
        document.getElementById('bar' + j).style.backgroundColor = "#861010 ";
    }


}


function openPokemon(i) {
    let containerOpenPokemon = document.getElementById('containerOpenPokemon');
    let pokemonImg = allPokemon[i]['sprites']['other']['dream_world']['front_default'];

    containerOpenPokemon.innerHTML = /*html*/ `
       <div id="PlaceOpenedPokemon" class="place_opened_pokemon">
            <div class="place_id">
                <p class="id">#00${allPokemon[i]['id']}</p> 
            </div>
            <div class="navbar_op">
                <button onclick="backToOverview()" class="btn_back">
                  <img class="img_back" src="./icons/back.png" />
                  <p>back to overview</p>
               </button>
                <div class="box_switch_op">
                    <button class="switch_outside">Bulbarsaur</button>
                    <button class="switch_mid">Ivysaur</button>
                    <button class="switch_outside">Venusaur</button>
                </div>
                <button class="place_heart_op">
                  <span class="icon_heart"
                     ><i class="fa-solid far fa-heart"></i
                  ></span>
               </button>
            </div>
            <div class="main_content_op">
                <div class="place_main_op">
                    <div class="box_main_op">
                        <div class="place_main_head_op">
                            <img class="main_icon_op" src="icons/${allPokemon[i]['types'][0]['type']['name']}.png" />
                            <div class="main_heading_op">
                                <div id="headingCharacteristics" class="heading_characteristics">
                                  
                                </div>
                                <h1 class="heading_op">${allPokemon[i]['name']}</h1>
                            </div>
                        </div>
                        <div class="place_about_op">
                            <div class="box_about_op">
                                <p>Height</p>
                                <p id="pommes">${allPokemon[i]['height']} Meter</p>
                            </div>
                            <div class="box_about_op">
                                <p>Weight</p>
                                <p >${allPokemon[i]['weight']} Kg</p>
                            </div>
                            <div class="box_about_op">
                                <p>Abilities</p>
                                <p>${allPokemon[i]['abilities'][0]['ability']['name']}</p>
                            </div>
                        </div>
                    </div>
                    <div class="box_main_img_op">
                        <img class="main_img_op" src="${pokemonImg}" />
                    </div>
                </div>
            </div>
            <div class="place_info_op">
                <div class="box_info_op">
                    <h2>Stats</h2>
                    <div class="box_stats_name">
                        <div>Hp</div>
                        <div>Attack</div>
                        <div>Defense</div>
                        <div>Special Attack</div>
                        <div>Special Defense</div>
                        <div>Speed</div>
                    </div>
                    <div id="placeStatsNum" class="place_stats_num">
                       
                    </div>
                </div>
            </div>
        </div>`
    renderTypesOp(i);
    cmToMeter();
    abilityBar(i);
}

function backToOverview() {
    let containerOpenPokemon = document.getElementById('containerOpenPokemon');

    containerOpenPokemon.innerHTML = "";

}