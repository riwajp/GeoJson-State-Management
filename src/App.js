import "./App.css";

import Filters from "./components/Filters";
import DataDisplay from "./components/DataDisplay";

function App() {
  console.log("App");

  return (
    <div className="App">
      <DataDisplay />
      <Filters />
    </div>
  );
}

export default App;
