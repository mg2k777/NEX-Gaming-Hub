const games = [
    {
        id: 1,
        name: "Roblox",
        category: "Adventure",
        icon: "🧱"
    },
    {
        id: 2,
        name: "Minecraft",
        category: "Sandbox",
        icon: "⛏️"
    },
    {
        id: 3,
        name: "Free Fire",
        category: "Battle Royale",
        icon: "🔥"
    },
    {
        id: 4,
        name: "GTA V",
        category: "Action",
        icon: "🚗"
    },
    {
        id: 5,
        name: "Fortnite",
        category: "Battle Royale",
        icon: "🎯"
    },
    {
        id: 6,
        name: "Valorant",
        category: "FPS",
        icon: "🔫"
    }
];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const gamesGrid = document.getElementById("gamesGrid");
const favoritesGrid = document.getElementById("favoritesGrid");
const search = document.getElementById("search");
const themeBtn = document.getElementById("themeBtn");

function renderGames(list) {
    gamesGrid.innerHTML = "";

    if (list.length === 0) {
        gamesGrid.innerHTML = "<p>Nenhum jogo encontrado 😢</p>";
        return;
    }

    list.forEach(game => {
        gamesGrid.innerHTML += createCard(game);
    });
}

function renderFavorites() {
    favoritesGrid.innerHTML = "";

    const favoriteGames = games.filter(game =>
        favorites.includes(game.id)
    );

    if (favoriteGames.length === 0) {
        favoritesGrid.innerHTML =
            "<p>Você ainda não adicionou nenhum favorito ❤️</p>";
        return;
    }

    favoriteGames.forEach(game => {
        favoritesGrid.innerHTML += createCard(game);
    });
}

function createCard(game) {
    const isFavorite = favorites.includes(game.id);

    return `
        <article class="gameCard">
            <div class="gameImage">${game.icon}</div>

            <div class="gameInfo">
                <h3>${game.name}</h3>
                <p>${game.category}</p>

                <button
                    class="favoriteBtn"
                    onclick="toggleFavorite(${game.id})"
                >
                    ${isFavorite ? "❤️ Remover favorito" : "🤍 Favoritar"}
                </button>
            </div>
        </article>
    `;
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(gameId => gameId !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    renderGames(games);
    renderFavorites();
}

search.addEventListener("input", () => {
    const query = search.value.toLowerCase();

    const filtered = games.filter(game =>
        game.name.toLowerCase().includes(query) ||
        game.category.toLowerCase().includes(query)
    );

    renderGames(filtered);
});

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    themeBtn.textContent =
        document.body.classList.contains("light")
            ? "☀️"
            : "🌙";
});

renderGames(games);
renderFavorites();
