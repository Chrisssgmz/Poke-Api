# PokeAPI Explorer

Pokémon explorer using [PokeAPI v2](https://pokeapi.co/).

## Features

- Search Pokémon by name
- Display information: image, ID, types, height, weight
- Colorful type badges
- Responsive design
- Error handling
- Name normalization (spaces to hyphens, lowercase)

## Structure

```
poke-api/
├── index.html    # HTML structure
├── app.js        # JavaScript logic
├── styles.css    # CSS styles
└── README.md     # This file
```

## Usage

1. Open `index.html` in your browser
2. Enter a Pokémon name in the input
3. Press "Search" or Enter

## Examples

- `pikachu`
- `charizard`
- `mr-mime`
- `bulbasaur`

## API

This project uses the endpoint:

- `GET https://pokeapi.co/api/v2/pokemon/{name}`

## Technologies

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3 (Flexbox, Grid, Responsive)
