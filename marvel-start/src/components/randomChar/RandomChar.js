import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
// import thor from "../../resources/img/thor.jpeg";
import mjolnir from "../../resources/img/mjolnir.png";

import "./randomChar.scss";

class RandomChar extends Component {
  //временное решение
  constructor(props) {
    super(props);
    this.updateChar();
  }

  //   state = {
  //     name: null,
  //     description: null,
  //     thumbnail: null,
  //     homepage: null,
  //     wiki: null,
  //   };
  //оптимизация state
  state = {
    char: {},
    loading: true,
    error: false,
  };

  // создаем новый метод на основе класса marvelService
  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };
  //   onDescription = () => {
  //     this.setState({
  //       descriptionnew: char.description,
  //     });
  //     console.log(descriptionnew);
  //   };
  updateChar = () => {
    // const id = 1011009;
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    // // console.log(id);
    // this.marvelService
    //   //.getAllCharacters().then((res)=>console.log(res)));
    //   .getCharacter(id)
    //   .then((res) => {
    //     // this.setState({
    //     //   name: res.data.results[0].name,
    //     //   description: res.data.results[0].description,
    //     //   thumbnail:
    //     //     res.data.results[0].thumbnail.path +
    //     //     "." +
    //     //     res.data.results[0].thumbnail.extension,
    //     //   homepage: res.data.results[0].urls[0].url,
    //     //   wiki: res.data.results[0].urls[1].url,
    //     // });
    //     this.setState(res);
    //   });
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  //   descriptionChange = (char) => {
  //     const description = char.description;
  //     switch (description) {
  //       case description.length === 0:
  //         return "There is no description for this character";
  //       case description.length > 210:
  //         return description.slice(0, 210) + "...";
  //       default:
  //         return description;
  //     }
  //   };

  render() {
    // const { name, description, thumbnail, homepage, wiki } = this.state;
    // const {
    //   char: { name, description, thumbnail, homepage, wiki },
    // } = this.state;
    const {
      //   char: { name, description, thumbnail, homepage, wiki },
      char,
      loading,
      error,
    } = this.state;
    // //условный рендеринг
    // if (loading) {
    //   return <Spinner />;
    // }

    const errorMesage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    return (
      <div className="randomchar">
        {/* {loading ? <Spinner /> : <View char={char} />} */}
        {errorMesage}
        {spinner}
        {content}
        {/* <div className="randomchar__block">
          <img
            src={thumbnail}
            alt="Random character"
            className="randomchar__img"
          />
          <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
              {description}
            //    As the Norse God of thunder and lightning, Thor wields one of the
            // greatest weapons ever made, the enchanted hammer Mjolnir. While
            // others have described Thor as an over-muscled, oafish imbecile, he's
            // quite smart and compassionate... 
            </p>
            <div className="randomchar__btns">
              <a href="{homepage}" className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href="{wiki}" className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
           </div>
        </div> */}

        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  //   const descriptionNew = this.descriptionChange;
  if (char.description.length === 0) {
    char.description = "There is no description for this character";
  } else {
    if (char.description.length > 210) {
      char.description = char.description.slice(0, 210) + " ...";
    }
  }

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};
export default RandomChar;
