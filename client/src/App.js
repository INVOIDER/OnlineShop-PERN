import Header from "./components/Header";
import "./styles/index.css"

function App() {
    const name ="Пётр"
  return (
    <div className="App">
        <Header username={name}/>
    </div>
  );
}

export default App;
