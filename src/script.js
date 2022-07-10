const displayCard = document.querySelector('#displayCard');
const buttonOneCard = document.getElementById('buttonOneCard');
const inputCard = document.getElementById('inputCard');
const btnRandom = document.getElementById('btn-random');
const imgsRandoms = document.getElementsByClassName('img-Random');
const btnId = document.getElementById('btn-id');
const msgErro = 'Seu deck já contém 40 cartas ou você tem 3 cartas repetidas nele';

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

const searchCard = async (key, nameOrId) => {
  try {
    const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?${key}=${nameOrId}`;
    const response = await fetch(url);
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
const checkRepeatedElements = () => {
  const elementsId = [];
  for (let i = 0; i < imgsRandoms.length; i += 1) {
    let count = elementsId.filter((e) => imgsRandoms[i].id.includes(e));
    if (count.length >= 2 || elementsId.length >= 40) {
      return true;
    } elementsId.push(imgsRandoms[i].id);
  } return false;
}

btnId.addEventListener("click", async () => {
  const check = checkRepeatedElements();
  if (check) return alert(msgErro);
  const number = parseInt(inputCard.value);
  if (typeof number !== "number") return alert("Invalid number ID");
  const response = await searchCard("id", number);
  const { data } = response;
  return creatImg({
    id: data[0].id,
    srcImage: data[0].card_images[0].image_url,
  });
});

btnRandom.addEventListener('click', async () => {
  const check = checkRepeatedElements();
  if (check) return alert(msgErro);
  if (imgsRandoms.length < 40) {
    const result = await getRandomCard();
    const { card_images } = result;
    return creatImg({
      id: result.id,
      srcImage: card_images[0].image_url,
    });
  }
  return alert('meu irmão deu, né?')
})

buttonOneCard.addEventListener('click', async () => {
  const check = checkRepeatedElements();
  if (check) return alert(msgErro)
  const name = inputCard.value;
  const array = name.trim().split(' ');
  const nameCard = array.map(str => str[0].toUpperCase() + str.substr(1)).join(' ');
  const response = await searchCard("name", nameCard.replaceAll(' ', '%'));
  const { data } = response;
  return creatImg({
    id: data[0].id,
    srcImage: data[0].card_images[0].image_url,
  });
});
