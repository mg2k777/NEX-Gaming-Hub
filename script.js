const games = [

    {
        id: 1,
        name: "Roblox",
        category: "Adventure",
        image: "https://placehold.co/600x800/17191f/ffffff?text=ROBLOX",
        description:
            "Uma plataforma enorme onde você pode jogar, criar experiências e explorar milhões de mundos criados pela comunidade."
    },

    {
        id: 2,
        name: "Minecraft",
        category: "Sandbox",
        image: "https://placehold.co/600x800/17191f/ffffff?text=MINECRAFT",
        description:
            "Explore mundos infinitos, construa estruturas, enfrente criaturas e sobreviva sozinho ou com seus amigos."
    },

    {
        id: 3,
        name: "Free Fire",
        category: "Battle Royale",
        image: "https://placehold.co/600x800/17191f/ffffff?text=FREE+FIRE",
        description:
            "Battle Royale rápido para dispositivos móveis. Entre na partida, encontre equipamentos e lute pela sobrevivência."
    },

    {
        id: 4,
        name: "GTA V",
        category: "Action",
        image: "https://placehold.co/600x800/17191f/ffffff?text=GTA+V",
        description:
            "Ação em mundo aberto ambientada em Los Santos, com história, exploração e uma grande variedade de atividades."
    },

    {
        id: 5,
        name: "Fortnite",
        category: "Battle Royale",
        image: "https://placehold.co/600x800/17191f/ffffff?text=FORTNITE",
        description:
            "Battle Royale com construção, eventos e diferentes modos de jogo."
    },

    {
        id: 6,
        name: "Valorant",
        category: "FPS",
        image: "https://placehold.co/600x800/17191f/ffffff?text=VALORANT",
        description:
            "FPS competitivo baseado em equipes, combinando precisão de tiro com habilidades únicas dos agentes."
    }

];


let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

let selectedCategory = "Todos";

const gamesGrid = document.getElementById("gamesGrid");
const favoritesGrid = document.getElementById("favoritesGrid");
const search = document.getElementById("search");
const categories = document.getElementById("categories");

const modal = document.getElementById("gameModal");
const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalFavorite = document.getElementById("modalFavorite");

let currentGame = null;


/* CATEGORIAS */

function renderCategories() {

    const categoryList = [
        "Todos",
        ...new Set(games.map(game => game.category))
    ];

    categories.innerHTML = "";

    categoryList.forEach(category => {

        const button = document.createElement("button");

        button.className = "categoryBtn";

        if (category === selectedCategory) {
            button.classList.add("active");
        }

        button.textContent = category;

        button.onclick = () => {

            selectedCategory = category;

            renderCategories();
            renderGames();

        };

        categories.appendChild(button);

    });

}


/* CARD */

function createCard(game) {

    const isFavorite = favorites.includes(game.id);

    return `
        <article class="gameCard">

            <img
                class="gameImage"
                src="${game.image}"
                alt="${game.name}"
            >

            <div class="gameInfo">

                <h3>${game.name}</h3>

                <p>${game.category}</p>

                <div class="cardButtons">

                    <button
                        class="detailsBtn"
                        onclick="openGame(${game.id})"
                    >
                        Ver detalhes
                    </button>

                    <button
                        class="favoriteBtn"
                        onclick="toggleFavorite(${game.id})"
                    >
                        ${isFavorite ? "❤️" : "🤍"}
                    </button>

                </div>

            </div>

        </article>
    `;
}


/* FILTRO */

function getFilteredGames() {

    const query = search.value.toLowerCase();

    return games.filter(game => {

        const matchesSearch =
            game.name.toLowerCase().includes(query) ||
            game.category.toLowerCase().includes(query);

        const matchesCategory =
            selectedCategory === "Todos" ||
            game.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

}


/* RENDER */

function renderGames() {

    const list = getFilteredGames();

    gamesGrid.innerHTML = "";

    if (list.length === 0) {

        gamesGrid.innerHTML =
            "<p>Nenhum jogo encontrado 😢</p>";

        return;
    }

    list.forEach(game => {

        gamesGrid.innerHTML += createCard(game);

    });

}


function renderFavorites() {

    const favoriteGames =
        games.filter(game => favorites.includes(game.id));

    favoritesGrid.innerHTML = "";

    if (favoriteGames.length === 0) {

        favoritesGrid.innerHTML =
            "<p>Você ainda não adicionou nenhum favorito ❤️</p>";

        return;
    }

    favoriteGames.forEach(game => {

        favoritesGrid.innerHTML += createCard(game);

    });

}


/* FAVORITOS */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(gameId => gameId !== id);

    } else {

        favorites.push(id);

    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    renderGames();
    renderFavorites();

    if (currentGame && currentGame.id === id) {
        updateModalButton();
    }

}


/* MODAL */

function openGame(id) {

    currentGame =
        games.find(game => game.id === id);

    if (!currentGame) return;

    modalImage.src = currentGame.image;
    modalImage.alt = currentGame.name;

    modalTitle.textContent =
        currentGame.name;

    modalCategory.textContent =
        currentGame.category;

    modalDescription.textContent =
        currentGame.description;

    updateModalButton();

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function updateModalButton() {

    if (!currentGame) return;

    const favorite =
        favorites.includes(currentGame.id);

    modalFavorite.textContent =
        favorite
            ? "❤️ Remover dos favoritos"
            : "🤍 Adicionar aos favoritos";

}


function closeGame() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


closeModal.onclick = closeGame;


modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeGame();
    }

});


modalFavorite.onclick = () => {

    if (currentGame) {
        toggleFavorite(currentGame.id);
    }

};


/* PESQUISA */

search.addEventListener("input", renderGames);


/* TECLA ESC */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeGame();
    }

});


/* INICIAR */

renderCategories();
renderGames();
renderFavorites();
