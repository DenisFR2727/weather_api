import "./App.css";
import Weather from "./components/weather/Weather";

function App() {
  // document.body.addEventListener("touchmove", function (e) {
  //   e.preventDefault();
  // });
  return (
    <div className="App">
      <Weather />
    </div>
  );
}

export default App;
