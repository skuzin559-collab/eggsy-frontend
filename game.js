const API_URL = "https://eggsy-backend.onrender.com";

let playerId = localStorage.getItem("eggsy_player_id");
let coins = 0;

async function registerPlayer() {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ nickname: "EggPlayer" })
  });

  const data = await res.json();
  playerId = data.player_id;
  localStorage.setItem("eggsy_player_id", playerId);
}

async function loadPlayer() {
  const res = await fetch(`${API_URL}/player/${playerId}`);
  const data = await res.json();
  coins = data.coins;
  updateUI();
}

async function saveCoins() {
  await fetch(`${API_URL}/player/${playerId}/update`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ coins: coins })
  });
}

function updateUI() {
  document.getElementById("coins").innerText = "Coins: " + coins;
}

function addCoin() {
  coins++;
  updateUI();
  saveCoins();
}

async function init() {
  if (!playerId) {
    await registerPlayer();
  }
  await loadPlayer();
}

init();
