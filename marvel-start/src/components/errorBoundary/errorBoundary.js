import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCath(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    //представляем что это компонет который передан в этот компонент==ребенок
    return this.props.children;
  }
}
export default ErrorBoundary;
