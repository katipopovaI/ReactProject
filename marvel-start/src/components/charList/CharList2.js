import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    // offset: 1562,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest(); //210
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    console.log(this.state);
    // console.log(this.marvelService.getALLCharacters(offset));
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .cath(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.lenght < 9) {
      ended = true;
    }
    this.setState(({ offset, charList }) => ({
      // charList,
      charList: [...charList, ...newCharList],
      // charList: charList.concat(newCharList),
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
    console.log(this.state);
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  renderItems(arr) {
    let imgStyle = { objectFit: "cover" };

    if (
      arr.thumbnail.path ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      imgStyle.objectFit = "contain";
    }

    arr.map((item) => {
      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
  }

  render() {
    const { charList, loading, error, offset, newItemLoading, charEnded } =
      this.state;
    console.log(this.state);

    const items = this.renderItems(charList);

    const errorMesage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMesage}
        {spinner}
        {content}

        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;

// const CharList = () => {
//   return (
//     <div className="char__list">
//       <ul className="char__grid">
//         <li className="char__item">
//           <img src={abyss} alt="abyss" />
//           <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item char__item_selected">
//           <img src={abyss} alt="abyss" />
//           <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//           <img src={abyss} alt="abyss" />
//           <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//           <img src={abyss} alt="abyss" />
//           <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//           <img src={abyss} alt="abyss" />
//           <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//           <img src={abyss} alt="abyss" />
//           <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//           <img src={abyss} alt="abyss" />
//           <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//           <img src={abyss} alt="abyss" />
//           <div className="char__name">Abyss</div>
//         </li>
//         <li className="char__item">
//           <img src={abyss} alt="abyss" />
//           <div className="char__name">Abyss</div>
//         </li>
//       </ul>
//       <button className="button button__main button__long">
//         <div className="inner">load more</div>
//       </button>
//     </div>
//   );
// };
