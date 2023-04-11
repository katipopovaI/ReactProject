const API_KEY = process.env.REACT_APP_API_KEY;

class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  // _apiKey = "apikey=f99060e3caee654e07c38be727412e72";
  _apiKey = `apikey=${API_KEY}`;
  _baseOffset = 210;

  //https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=f99060e3caee654e07c38be727412e72

  getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status:${res.status}`);
    }
    return await res.json(
      "https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=f99060e3caee654e07c38be727412e72"
    );
  };
  //delete
  // getAllCharacters = () => {
  //   return this.getResource();
  // };
  //!!!!!!!!!!!!!!!!!!!!!!!!!
  //offset = this._baseOffset
  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      // `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    console.log(res);
    return res.data.results.map(this._transformCharacter); //9 первых
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!!
  //   // вывод всех---ошибка!!
  //   getALLCharacters = () => {
  //     return this.getResource(
  //       " https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=f99060e3caee654e07c38be727412e72"
  //     );
  //   };

  //   getALLCharacters = () => {
  //     return this.getResource(
  //       `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
  //     );
  //   };

  //   //вывод по id
  //   getCharacter = (id) => {
  //     return this.getResource(
  //       `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=f99060e3caee654e07c38be727412e72`
  //     );
  //   };
  //   getCharacter = (id) => {
  //     return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
  //   };
  ///!!!!!!!!!!!!!!!
  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };
  ////!!!!!!!!!!!!!!!!!!
  //   _transformCharacter = (res) => {
  //     return {
  //       name: res.data.result[0].name,
  //       description: res.data.results[0].description,
  //       thumbnail:
  //         res.data.results[0].thumbnail.path +
  //         "." +
  //         res.data.results[0].thumbnail.extension,
  //       homepage: res.data.results[0].urls[0].url,
  //       wiki: res.data.results[0].urls[1].url,
  //     };
  //   };
  ///!!!!!!!!!!!
  _transformCharacter = (char) => {
    console.log(char.comics);
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}
export default MarvelService;
