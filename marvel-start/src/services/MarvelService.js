class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=f99060e3caee654e07c38be727412e72";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status:${res.status}`);
    }
    return await res.json();
  };

  //   // вывод всех---ошибка!!
  //   getALLCharacters = () => {
  //     return this.getResource(
  //       " https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=f99060e3caee654e07c38be727412e72"
  //     );
  //   };

  getALLCharacters = () => {
    return this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
  };

  //   //вывод по id
  //   getCharacter = (id) => {
  //     return this.getResource(
  //       `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=f99060e3caee654e07c38be727412e72`
  //     );
  //   };
  //   getCharacter = (id) => {
  //     return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
  //   };
  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );

    // return this._transformCharacter(res);
    return this._transformCharacter(res.data.results[0]);
  };

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

  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}
export default MarvelService;
