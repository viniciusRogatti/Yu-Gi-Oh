const displayCard = document.getElementById('displayCard');
const buttonOneCard = document.getElementById('buttonOneCard');
const nameCard = document.getElementById('inputCard');
const btnRandom = document.getElementById('btn-random');

buttonOneCard.addEventListener('click', () => {
  const name = nameCard.value;
  console.log(name);
});
btnRandom.addEventListener('click', () => {
  getRandomCard();
})
const getRandomCard = async () => {
  try {
    const url = "https:db.ygoprodeck.com/api/v7/randomcard.php";
    const response = await fetch(url);
    const result = await response.json();
    console.log(result.card_images[0].image_url);
  } catch (error) {
    console.log(error);
  }
}

// cardRamdom https://db.ygoprodeck.com/api/v7/randomcard.php