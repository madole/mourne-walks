import { getBlurbs } from "./utils/getBlurbs";
import pointsOfInterest from "./data/points-of-interest-mourne.json";
import { h } from "preact";
import { flyToLocation } from "./utils/flyToLocation";
import { useEffect, useState } from "preact/compat";
import { Feature } from "./types";

const blurbs = getBlurbs();

const Navigation = () => {
  const [url, setUrl] = useState(window.location.href.split("#")[1]);

  useEffect(() => {
    window.addEventListener("historyStateReplaced", () => {
      setUrl(window.location.href.split("#")[1]);
    });
  }, []);

  return (
    <div className="sm:w-1/4 md:w-1/5 w-full flex-shrink flex-grow-0 px-2 hidden md:block bg-white -mt-20">
      <div className="sticky top-0 p-4 overflow-scroll">
        <div className="prose prose-lg  font-bold pb-5">Steps</div>
        <ul className="flex sm:flex-col content-center justify-between">
          {blurbs.map(({ link, heading }, index) => (
            <li className="flex-shrink-0 flex-grow-0" key={link}>
              <a
                className={`w-full block p-4 cursor-pointer hover:bg-gray-200 rounded-lg prose ${
                  url === link ? "bg-gray-100" : ""
                }`}
                href={`#${link}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${link}`)?.scrollIntoView({
                    behavior: "smooth",
                  });
                  const feature = pointsOfInterest.features[index] as Feature;
                  flyToLocation(feature);
                }}
              >
                {heading}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
