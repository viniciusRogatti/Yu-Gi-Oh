const displayCard = document.querySelector('#displayCard');
const buttonOneCard = document.getElementById('buttonOneCard');
const inputCard = document.getElementById('inputCard');
const btnRandom = document.getElementById('btn-random');
const imgsRandoms = document.getElementsByClassName('img-Random');

const getRandomCard = async () => {
  try {
    const url = "https:db.ygoprodeck.com/api/v7/randomcard.php";
    const response = await fetch(url);
    const result = await response.json(); 
    return result;
    
  } catch (error) {
    return error.message;
  }
}

buttonOneCard.addEventListener('click', async () => {
  const check = checkRepeatedElements();
  console.log(check);
  if (check) return alert('Você tem 3 cartas repetidas no seu deck')
  const name = inputCard.value;
  const array = name.trim().split(' ');
  const nameCard = array.map(str => str[0].toUpperCase() + str.substr(1)).join(' ');
  const response = await searchCardByName(nameCard.replaceAll(' ', '%'));
  const { data } = response;
  return creatImg({
    id:data[0].id,
    srcImage: data[0].card_images[0].image_url,
  });
});

const searchCardByName = async (name) => {
  try {    
    const url1 = `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`;
    const response = await fetch(url1);
    const result = await response.json();
    return result;
  } catch (err) {
    alert(err.message);
  }
}
const creatImg = (objeto) => {
const { id, srcImage } = objeto;
const img = document.createElement("img");
img.id = id;
img.classList.add("img-Random");
img.src = srcImage; 
displayCard.appendChild(img);
}

btnRandom.addEventListener('click', async () => {
  const check = checkRepeatedElements();
  console.log(check);
  if (check) return alert('Você tem 3 cartas repetidas no seu deck');
  if (imgsRandoms.length < 40) {
    const result = await getRandomCard();
    const { card_images } = result;
    return creatImg({
      id:result.id,
      srcImage: card_images[0].image_url,
    });
  }
  return alert('meu irmão deu né?')
})

const checkRepeatedElements = () => {
  const elementsId = [];
  for(let i = 0; i < imgsRandoms.length; i += 1) {
    let count = elementsId.filter((e) => imgsRandoms[i].id.includes(e));
    if (count.length >= 2) {
      return true;
    } elementsId.push(imgsRandoms[i].id);
  } return false;
}
