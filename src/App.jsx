import Map from "./components/commons/Map";

function App() {
  return (
    <div className="h-full max-h-[calc(100vh-73px)] w-full bg-zinc-200 p-2">
      <Map key={"overview.map"} width={"100%"} height={500} />
    </div>
  );
}

export default App;
