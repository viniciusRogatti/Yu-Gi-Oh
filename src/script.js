const displayCard = document.getElementById('displayCard');
const buttonOneCard = document.getElementById('buttonOneCard');
const inputCard = document.getElementById('inputCard');
const btnRandom = document.getElementById('btn-random');
const imgsRandoms = document.getElementsByClassName('img-Random');
const btnId = document.getElementById('btn-id');
const msgErrorLimited = 'Seu deck já contém 40 cartas ou você tem 3 cartas repetidas nele';
const popup = document.querySelector('#popup');
const header = document.getElementById('header');
const container = document.getElementById('container');
const body = document.getElementById('body');

const exibInfo = (obj) => {
  // Id: obj.id, Name: obj.name, Describe: obj.desc,  Archetype: obj.archetype, Attribute: obj.attribute,
  // Race: obj.race, Type: obj.type, Atk: obj.atk, Def: obj.def, Level: obj.level, Price: obj.card_prices[0].amazon_price,
  console.log(obj);
  const paragraph = document.createElement('p');
  paragraph.id = 'paragraph-Info';
  paragraph.innerText = `Name: ${obj.name}
  Id: ${obj.id}
  Describe: ${obj.desc},`;
  popup.appendChild(paragraph);
}

const deleteImage = () => {
  const imageSelected = document.querySelector('.imgZoom')
  for (let i = 0; i < displayCard.children.length; i++) {
    if (displayCard.children[i].id === imageSelected.id) return displayCard.removeChild(displayCard.children[i])
  }
}

const active = () => {
  removeChilds();
  const zoomElements = document.querySelectorAll('.active');
  if (zoomElements.length === 2) {
    for (let i = 0; i < zoomElements.length; i++) {
      zoomElements[i].classList.remove('active');
    } return;
  }
  displayCard.classList.toggle('active');
  popup.classList.toggle('active');
  header.classList.toggle('active');
  container.classList.toggle('active');
  body.classList.toggle('active');
}

const searchCard = async (key, ...nameOrId) => {
  const url = `https://db.ygoprodeck.com/api/v7/${key}${nameOrId}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (erro) {
    return alert('Algo deu errado!');
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
    if (count.length >= 2 || imgsRandoms.length >= 40) {
      return true;
    } elementsId.push(imgsRandoms[i].id);
  } return false;
}

btnId.addEventListener("click", async () => {
  const check = await checkRepeatedElements();
  if (check) return alert(msgErrorLimited);
  const number = parseInt(inputCard.value);
  if (typeof number !== "number") return alert("Invalid number ID");
  const response = await searchCard("cardinfo.php?id=", number);
  if (response.error) return alert('No card matching your query was found in the database');
  const { data } = response;
  return creatImg({
    id: data[0].id,
    srcImage: data[0].card_images[0].image_url,
  });
});

btnRandom.addEventListener('click', async () => {
  const check = await checkRepeatedElements();
  if (check) return alert(msgErrorLimited);
  const result = await searchCard('randomcard.php');
  const { card_images } = result;
  return creatImg({
    id: result.id,
    srcImage: card_images[0].image_url,
  });
})

buttonOneCard.addEventListener('click', async () => {
  const check = checkRepeatedElements();
  if (check) return alert(msgErrorLimited)
  const name = inputCard.value;
  const array = name.trim().split(' ');
  const nameCard = array.map(str => str[0].toUpperCase() + str.substr(1)).join(' ');
  const response = await searchCard("cardinfo.php?name=", nameCard.replaceAll(' ', '%'));
  if (response.error) return alert('No card matching your query was found in the database');
  const { data } = response;
  return creatImg({
    id: data[0].id,
    srcImage: data[0].card_images[0].image_url,
  });
});

const exibPopup = async (obj) => {
  const { src, id } = obj;
  if (!src) return;
  await removeChilds();
  const imgZoom = document.createElement('img');
  imgZoom.src = src;
  imgZoom.classList.add('imgZoom');
  imgZoom.id = id;
  popup.appendChild(imgZoom);
};

const removeChilds = (string) => {
  if (string === 'paragraph') {
    for (let i = 0; i < popup.children.length; i++) {
      if (popup.children[i].id === 'paragraph-Info') {
        return popup.removeChild(popup.children[i]);
      }
    } return;
  }
  for (let i = 0; i < popup.children.length; i++) {
    if (popup.children[i].src) popup.removeChild(popup.children[i]);
  }
}

displayCard.addEventListener('click', (e) => {
  removeChilds('paragraph')
  const obj = {
    src: e.target.src,
    id: e.target.id,
  }
  if (e.target.src) {
    exibPopup(obj)
    active();
  }
});

popup.addEventListener('click', (e) => {
  if (e.target.id === 'btn-popup') {
    removeChilds();
    active();
  } if (e.target.id === 'delete') {
    deleteImage()
    active();
    return removeChilds();
  } if (e.target.id === 'btn-infos') return getInfoCard();
});

const getInfoCard = async () => {
  removeChilds('paragraph');
  const imageInfo = document.querySelector('.imgZoom');
  const idInfo = parseInt(imageInfo.id);
  const response = await searchCard("cardinfo.php?id=", idInfo)
  const { data } = response;
  console.log(data);
  try {
    return await exibInfo(data[0]);
  } catch (error) {
    return alert('Essa carta não tem informações disponíveis')
  }
};

window.addEventListener('click', () => {
  inputCard.value = '';
})