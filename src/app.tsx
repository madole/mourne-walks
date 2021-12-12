import { h } from "preact";
import Content from "./content";
import Mapbox from "./map";
import Navigation from "./navigation";

export function App() {
  return (
    <>
      <nav class="flex justify-center w-full bg-white">
        <h1 class="text-6xl font-serif">Mourne walks</h1>
      </nav>
      <div className="w-full flex flex-col sm:flex-row flex-grow">
        <Navigation />
        <main role="main" class="w-full h-full flex-grow p-3 overflow-auto">
          <Mapbox />
          <Content />
        </main>
      </div>
      <footer class="w-full p-4 ml-1/4 flex justify-center bg-white">
        <div>Made by madole</div>
      </footer>
    </>
  );
}
