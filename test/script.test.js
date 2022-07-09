require("./script.js");

describe("Ao chamar a função getRandomCard", () => {
  it("Verifica se é uma função", async () => {
    await expect(typeof getRandomCard).toBe('function');
  });

  it("Verifica se a função retorna uma carta aleatoria", async () => {
    await expect(getRandomCard()).toEqual({
      "id": 3244563,
      "name": "Shield Spear",
      "type": "Trap Card",
      "desc": "Target 1 face-up monster on the field; it gains 400 ATK/DEF until the end of this turn.",
      "race": "Normal",
      "card_sets": [
        {
          "set_name": "Speed Duel Starter Decks: Match of the Millennium",
          "set_code": "SS04-ENB27",
          "set_rarity": "Common",
          "set_price": "$1.06"
        },
        {
          "set_name": "Starter Deck: Dawn of the Xyz",
          "set_code": "YS11-EN038",
          "set_rarity": "Common",
          "set_price": "$1.02"
        },
        {
          "set_name": "Tactical Evolution",
          "set_code": "TAEV-EN074",
          "set_rarity": "Common",
          "set_price": "$1.06"
        }
      ],
      "card_images": [
        {
          "image_url": "https://storage.googleapis.com/ygoprodeck.com/pics/3244563.jpg",
          "image_url_small": "https://storage.googleapis.com/ygoprodeck.com/pics_small/3244563.jpg"
        }
      ],
      "card_prices": [
        {
          "cardmarket_price": "0.05",
          "tcgplayer_price": "0.15",
          "ebay_price": "0.99",
          "amazon_price": "0.20"
        }
      ]
    });
  });

  it("Verifica se a função fetch é chamada", async () => {
    await getRandomCard();
    expect(fetch).toHaveBeenCalled();
  });

  it("Verifica se executa o fetch no url correto", async () => {
    const url = 'https://db.ygoprodeck.com/api/v7/randomcard.php';
    await getRandomCard();
    expect(fetch).toBeCalledWith(url);
  })
})