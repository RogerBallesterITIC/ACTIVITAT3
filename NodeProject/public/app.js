// ============================================
// PRIMERA FILA: Conversor JSON ↔ XML (COMENTADO - no se usa)
// ============================================
/*
const btnToJSON = document.getElementById("btnToJSON");
const btnToXML = document.getElementById("btnToXML");
const input = document.getElementById("input");
const output = document.getElementById("output");

btnToJSON.addEventListener("click", async () => {
  const text = input.value;
  const res = await fetch("/XMLtoJson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  output.value = json.result;
});

btnToXML.addEventListener("click", async () => {
  const text = input.value;
  const res = await fetch("/JsonToXML", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: text })
  });
  const json = await res.json();
  output.value = json.result;
});
*/

// ============================================
// SEGUNDA FILA: Obtener Pokémon en XML
// ============================================
const btnPokemonToXML = document.getElementById("btnPokemonToXML");
const pokemonInput1 = document.getElementById("pokemonInput1");
const xmlOutput = document.getElementById("xmlOutput");

btnPokemonToXML.addEventListener("click", async () => {
  const pokemonName = pokemonInput1.value;
  
  if (!pokemonName) {
    xmlOutput.value = "Por favor, introduce un nombre de Pokémon";
    return;
  }

  const res = await fetch("/pokemonToXML", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pokemonName: pokemonName })
  });

  const data = await res.json();
  xmlOutput.value = data.result;
});

// ============================================
// TERCERA FILA: Habilidades e Imagen
// ============================================
const btnShowAbilities = document.getElementById("btnShowAbilities");
const btnShowImage = document.getElementById("btnShowImage");
const pokemonInput2 = document.getElementById("pokemonInput2");
const abilitiesContainer = document.getElementById("abilitiesContainer");
const imageContainer = document.getElementById("imageContainer");

btnShowAbilities.addEventListener("click", async () => {
  const pokemonName = pokemonInput2.value;
  
  if (!pokemonName) {
    abilitiesContainer.innerHTML = "<strong>Error:</strong> Introduce un nombre de Pokémon";
    return;
  }

  const res = await fetch("/pokemonAbilities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pokemonName: pokemonName })
  });

  const data = await res.json();
  
  let abilitiesText = "<strong>Habilidades del Pokémon:</strong><br>";
  if (data.abilities && data.abilities.length > 0) {
    data.abilities.forEach(ability => {
      abilitiesText += `- ${ability.name} ${ability.is_hidden ? "(Habilidad Oculta)" : ""}<br>`;
    });
  } else {
    abilitiesText += "No se encontraron habilidades";
  }
  abilitiesContainer.innerHTML = abilitiesText;
});

btnShowImage.addEventListener("click", async () => {
  const pokemonName = pokemonInput2.value;
  
  if (!pokemonName) {
    imageContainer.innerHTML = "<p>Introduce un nombre de Pokémon</p>";
    return;
  }

  const res = await fetch("/pokemonImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pokemonName: pokemonName })
  });

  const data = await res.json();
  
  imageContainer.innerHTML = "";
  const img = document.createElement("img");
  img.src = data.imageUrl;
  img.alt = data.pokemonName;
  img.style.width = "150px";
  img.style.margin = "10px";
  
  imageContainer.appendChild(img);
});