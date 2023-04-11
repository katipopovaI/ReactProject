import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList2";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/errorBoundary";
import decoration from "../../resources/img/vision.png";

// const App = () => {
//     return (
//         <div className="app">
//             <AppHeader/>
//             <main>
//                 <RandomChar/>
//                 <div className="char__content">
//                     <CharList/>
//                     <CharInfo/>
//                 </div>
//                 <img className="bg-decoration" src={decoration} alt="vision"/>
//             </main>
//         </div>
//     )
// }

class App extends Component {
  //   state = {
  //     showRandomChar: true,
  //   };

  //   toggleRandomChar = () => {
  //     this.setState((state) => {
  //       return {
  //         showRandomChar: !state.showRandomChar,
  //       };
  //     });
  //   };

  state = {
    selectedChar: null,
  };

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
    });
  };

  //  {/* {this.state.showRandomChar ? <RandomChar /> : null}
  //<button onClick={this.toggleRandomChar}>Click me </button> */}
  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>

          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected} />
              {/* <CharList /> */}
            </ErrorBoundary>

            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar} />
              {/* <CharInfo /> */}
            </ErrorBoundary>
          </div>

          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
