/* require("../src/script.js");
const { getRandomCard } = require("../src/script.js");

describe("Ao chamar a função getRandomCard", () => {
  it("Verifica se é uma função", async () => {
    await expect(typeof getRandomCard).toBe('function');
  });

  it("Verifica se a função retorna uma carta aleatoria", async () => {
    const result = ["id", "type", "desc", "name", "race", "card_sets", "card_images", "card_prices"]
    const expected = await getRandomCard();
    console.log(expected)
    expect(result).toBe(result);
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
}) */