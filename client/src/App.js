import Header from "./components/Header";
import "./styles/index.css"
import Footer from "./components/Footer";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
function App() {
    const name =""
  return (
      <BrowserRouter>
          <div className="App">
              <Header username={name}/>
              <div className="content-wrapper">
                  <AppRouter/>
              </div>
              <Footer/>
          </div>
      </BrowserRouter>
  );
}

export default App;
