const url = new URLSearchParams(window.location.search);
const _pokemonService = new PokemonService();
const _domManipulate = new DomManipulate();
const pokemonId = url.get("pokemonId");
if (!pokemonId || !pokemonId.trim().length) {
  window.location.href = "/index.html";
}
function renderPokemon({ id, name, weight, abilities, sprites, types, stats }) {
  const pokemonInfo = document.createElement("div");
  const tipos = types.map((type) => `<span>${type.type.name}<span/>`);
  const habilidad = abilities.map(
    (ability) => `<span>${ability.ability.name}<span/>`
  );
  const status = stats
    .map(
      (stat) =>
        `   <label for="bar-${stat.stat.name}">${stat.stat.name}</label>
            <progress id="bar-${stat.stat.name}" value="${stat.base_stat}" max="300">${stat.base_stat}%</progress>
        `
    )
    .join("");
  pokemonInfo.innerHTML = `
    <div class="container-card">
      <div class="cont-img-pokemon">
        <img src="${sprites.front_default}" width="300" style="image-rendering: pixelated" />
      </div>

      <div class="cont-info-pokemon">
        <h1>${name}</h1>
        <p><strong> id Search: </strong>&nbsp;  ${id} </p>
        <p><strong> Weight: </strong>&nbsp;  ${weight} </p>
        <p><strong> Abilities:</strong>&nbsp;  ${habilidad} </p>
        <p><strong> Tipos: </strong>&nbsp; ${tipos} </p>
      </div>
    </div>
    <hr>
    <div class="cont-status">
      <h2>Base stats</h2>
      <ul class="grid-stats">
      ${status}
      </ul>
    </div>
  `;
  _domManipulate.render(pokemonInfo, ".detail-pokemon");
}
_pokemonService
  .getByIdOrName(pokemonId)
  .then((data) => {
    renderPokemon(data);
  })
  .catch((error) => console.error(error));