// Constants
const CONFIG = {
    POKEMON_API_URL: "https://pokeapi.co/api/v2/pokemon/",
    // DEFAULT_LIMIT: 20
};

const MESSAGES = {
    LOADING: "Loading...",
    NOT_FOUND: "Pokemon not found",
    NETWORK_ERROR: "Network error",
    EMPTY_INPUT: "Please enter a pokemon name"
};

// DOM elements
const pokemonNameInput = document.getElementById("pokemon-name");
const searchBtn = document.getElementById("search-btn");
const pokemonContainer = document.getElementById("pokemon-display");

// Event listeners
searchBtn.addEventListener("click", () => getPokemon(pokemonNameInput.value));
pokemonNameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") getPokemon(pokemonNameInput.value);
});

// Fetch pokemon from API
async function fetchPokemon(name) {
    const res = await fetch(`${CONFIG.POKEMON_API_URL}${name}`);
    if (!res.ok) throw new Error("Pokemon not found");
    return res.json();
};

// Render errors
function renderError(error) {
    if (error.name === "AbortError") return;
    let errorMessage = MESSAGES.NOT_FOUND;
    if (!error.message.includes("Pokemon not found")) {
        errorMessage = MESSAGES.NETWORK_ERROR;
    };
    pokemonContainer.innerHTML = `<p class="error">${errorMessage}</p>`;
}

// Fix name
function fixName(name) {
    return name
        .trim()
        .toLowerCase()
        .replace(/\s/g, "-");
}

// Display pokemon
function displayPokemon(pokemon) {
    const typeLabels = pokemon.types.map(t =>
        `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`
    ).join('');

    pokemonContainer.innerHTML = `
        <div class="pokemon-card">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h2>${pokemon.name} (#${pokemon.id})</h2>
            <div class="pokemon-types">${typeLabels}</div>
            <div class="pokemon-info">
                <p>Height: ${pokemon.height / 10}m</p>
                <p>Weight: ${pokemon.weight / 10}kg</p>
            </div>
        </div>
    `;
}

// Controller
async function getPokemon(name) {
    try {
        if (!name.trim()) {
            pokemonContainer.innerHTML = `<p class="error">${MESSAGES.EMPTY_INPUT}</p>`;
            return;
        }
        pokemonContainer.innerHTML = MESSAGES.LOADING;
        const fixedName = fixName(name);
        const pokemon = await fetchPokemon(fixedName);
        displayPokemon(pokemon);
        pokemonNameInput.value = "";
    } catch (error) {
        renderError(error);
    }
};