const displayCard = document.querySelector('#displayCard');
const buttonOneCard = document.getElementById('buttonOneCard');
const nameCard = document.getElementById('inputCard');
const btnRandom = document.getElementById('btn-random');

const getRandomCard = async () => {
  try {
    const url = "https:db.ygoprodeck.com/api/v7/randomcard.php";
    const response = await fetch(url);
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.log(error);
  }
}

buttonOneCard.addEventListener('click', () => {
  const name = nameCard.value;
  console.log(name);
});

const creatImg = (srcImage) => {
const img = document.createElement("img");
img.classList.add("img-Random");
img.src = srcImage; 
displayCard.appendChild(img);
}

btnRandom.addEventListener('click', async () => {
  const imgsRandoms = document.querySelectorAll('.img-Random');
  if (imgsRandoms.length < 40) {
    const result = await getRandomCard();
    const { card_images } = result;
    return creatImg((card_images[0].image_url));
  }
  return alert('meu irmão deu né?')
})


// cardRamdom https://db.ygoprodeck.com/api/v7/randomcard.php