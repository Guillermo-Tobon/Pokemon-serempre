document.addEventListener('DOMContentLoaded', function(){
  //Variables globales
  const pokemonService = new PokemonService();
  const form = document.querySelector('.form-search');

  let input = document.querySelector('#filter');
  let progreso = document.querySelector('.progreso');

  //Events
  form.addEventListener('submit', (e) =>{
    e.preventDefault();

    
    if( input.value != ''){
      limpiaProgreso();

      //Consulta endpoint
      pokemonService.getByIdOrName(input.value).then( data =>{
        getDataPokemonByName(data);
      }).catch( error =>{
        console.error('ERROR ->',error);
      });
    }
  });




  //Funciones 
  getDataPokemonByName = (data) => {
    console.log(data);
    document.querySelector('.habilidades').textContent = '';
    document.querySelector('.idPokemon').textContent = data.id;
    document.querySelector('.info-resultado .name').textContent = data.name;
    document.querySelector('.img-resultado img').src = data.sprites.other.home.front_default;
    let ability = data.abilities.map( abi => abi.ability.name);
    ability.forEach( abi =>  document.querySelector('.habilidades').textContent += ` ${abi}, ` );
    document.querySelector('.peso').textContent = `${data.weight}Kg`;

    let stats = data.stats.map( stat => stat );
    stats.forEach( stat =>{
      let infoProg = document.createElement('div');
      infoProg.innerHTML += `
                            <span>${stat.stat.name} <span class="porcentaje">${stat.base_stat}%</span></span>
                            <progress id="${stat.stat.name}" value="${stat.base_stat}" max="100"> ${stat.base_stat}% </progress>
                          `;
      progreso.appendChild(infoProg);
    });


    
  };




  function limpiaProgreso(){
    while( progreso.firstChild ){
      progreso.removeChild( progreso.firstChild )
    }
  }


});



