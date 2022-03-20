import "./App.css";
import HeadNavbar from "./components/HeadNavbar";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <HeadNavbar />
      <div className="centered">
        <Login />
      </div>
    </div>
  );
}

export default App;
