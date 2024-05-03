import "./App.css";
import NavBar from "./components/NavBar";
import ShoesCard from "./components/ShoesCard";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-auto items-center gap-20 align-middle justify-center  h-full w-full">
        <WeatherCard />
        <ShoesCard />
      </div>
    </div>
  );
};

export default App;
