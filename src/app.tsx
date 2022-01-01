import { h } from "preact";
import Content from "./content";
import Mapbox from "./map";
import Navigation from "./navigation";

export function App() {
  return (
    <>
      <nav class="flex flex-col items-center justify-center w-full bg-white p-4 md:pl-60">
        <h1 class="prose prose-2xl text-5xl  text-center uppercase">
          Mourne walks
        </h1>
        <h2 class="prose prose-xl text-center">Slieve Donard</h2>
      </nav>
      <div className="w-full flex flex-col sm:flex-row flex-grow">
        <Navigation />
        <main role="main" class="w-full h-full flex-grow p-3 overflow-auto">
          <Mapbox />
          <Content />
        </main>
      </div>
      <footer class="w-full p-4 md:pl-60 flex justify-center bg-white">
        <div>
          Made by
          <a class="text-sky-400 pl-1 underline" href="https://madole.xyz">
            @madole
          </a>
          <span role="img" class="pl-2 text-xl">
            👋
          </span>
        </div>
      </footer>
    </>
  );
}
