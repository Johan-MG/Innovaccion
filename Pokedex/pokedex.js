
let fourStar = [false, false, false];

const fetchPokemon = () => {
    //Consultas del HTML
    const pokeName = document.getElementById("pokeName");
    const Name = document.getElementById("name");
    const Number = document.getElementById("number");
    const Weight = document.getElementById("weight");
    const Height = document.getElementById("height");
    const Pokeimg = document.getElementById("rating");

    //Consulta de API
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;

    fetch(url).then((res) => {
        if(res.status != "200"){
            console.log(res);
            pokeImage("images/poke.jpg");
        }else{
            return res.json();
        }
    }).then((data) => {
        console.log(data);
        let pokeImg = data.sprites.other.home.front_default;
        let pokeStats = [data['stats'][1]['base_stat'], data['stats'][2]['base_stat'], data['stats'][0]['base_stat']]
        let promedio = (pokeStats[0]+pokeStats[1]+pokeStats[2])/3;

        //Sobreescribiendo
        Number.innerHTML = rellenar(""+data.id);
        Name.innerHTML = data.name;
        Weight.innerHTML = parseInt(data.weight)/10;
        Height.innerHTML = parseInt(data.height)/10;
        pokeImage(pokeImg);
        description(pokeInput);
        pokeTypes(data.types);
        setAttack(pokeStats[0]);
        setDefense(pokeStats[1]);
        setHP(pokeStats[2]);

        if(promedio<50){
            Pokeimg.src = "images/Rating_0.webp";
        }else if(promedio<65 && promedio>=50){
            Pokeimg.src = "images/Rating_1.webp";
        }else if(promedio<80 && promedio>=60){
            Pokeimg.src = "images/Rating_2.webp";
        }else if(promedio>=80){
            Pokeimg.src = "images/Rating_3.webp";
        }
        if(fourStar[0] && fourStar[1] && fourStar[2]){
            Pokeimg.src = "images/Rating_4.webp";
        }
        console.log(fourStar);
    })
}

const description = (pokeInput) => {
    const VarDescription = document.getElementById("description");
    const Category = document.getElementById("category");
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokeInput}`;
    fetch(url).then((res) =>{
        return res.json();
    }).then((data) => {
        console.log(data);
        Category.innerHTML = data['genera'][7]['genus'];
        VarDescription.innerHTML = data['flavor_text_entries'][0]['flavor_text'];
    })
}

const pokeImage = (url) =>{
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

const pokeTypes = (data) =>{
    const Types = document.getElementById("types");

    if((Object.keys(data).length) == 1){
        console.log(data);
        Types.innerHTML = data[0]['type']['name'];
    }else{
        Types.innerHTML = `${data[0]['type']['name']}/${data[1]['type']['name']}`
    }
}

function rellenar(num){
    while (num.length<3){
        num = '0'+num;
    }
    return num;
}

function setBar(stat){
    let values = [0,0,0];
    let aux = 40;
    for(var i = 0;i<3;i++){
        if((stat/aux)>1){
            values[i] = 100;
        }else{
            values[i] = (stat/aux)*100;
            break;
        }
        stat -= 40;
    }
    return values;
}

function setAttack(attack){
    let values = setBar(attack);
    document.getElementById("attack_1").style.width = `${values[0]}%`;
    document.getElementById("attack_2").style.width = `${values[1]}%`;
    document.getElementById("attack_3").style.width = `${values[2]}%`;
    if(values[2]>=100){
        document.getElementById("attack_1").style.background = '#ff6380';
        document.getElementById("attack_2").style.background = '#ff6380';
        document.getElementById("attack_3").style.background = '#ff6380';
        fourStar[0] = true;
    }else{
        document.getElementById("attack_1").style.background = '#ee7752';
        document.getElementById("attack_2").style.background = '#ee7752';
        document.getElementById("attack_3").style.background = '#ee7752';
        fourStar[0] = false;
    }
}

function setDefense(defense){
    let values = setBar(defense);
    document.getElementById("defense_1").style.width = `${values[0]}%`;
    document.getElementById("defense_2").style.width = `${values[1]}%`;
    document.getElementById("defense_3").style.width = `${values[2]}%`;
    if(values[2]>=100){
        document.getElementById("defense_1").style.background = '#ff6380';
        document.getElementById("defense_2").style.background = '#ff6380';
        document.getElementById("defense_3").style.background = '#ff6380';
        fourStar[1] = true;
    }else{
        document.getElementById("defense_1").style.background = '#ee7752';
        document.getElementById("defense_2").style.background = '#ee7752';
        document.getElementById("defense_3").style.background = '#ee7752';
        fourStar[1] = false;
    }
}

function setHP(HP){
    let values = setBar(HP);
    document.getElementById("hp_1").style.width = `${values[0]}%`;
    document.getElementById("hp_2").style.width = `${values[1]}%`;
    document.getElementById("hp_3").style.width = `${values[2]}%`;
    if(values[2]>=100){
        document.getElementById("hp_1").style.background = '#ff6380';
        document.getElementById("hp_2").style.background = '#ff6380';
        document.getElementById("hp_3").style.background = '#ff6380';
        fourStar[2] = true;
    }else{
        document.getElementById("hp_1").style.background = '#ee7752';
        document.getElementById("hp_2").style.background = '#ee7752';
        document.getElementById("hp_3").style.background = '#ee7752';
        fourStar[2] = false;
    }
}