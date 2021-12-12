import { getBlurbs } from "./utils/getBlurbs";
import pointsOfInterest from "./data/points-of-interest.json";
import { h } from "preact";
import { LngLatLike } from "mapbox-gl";
import { flyToLocation } from "./utils/flyToLocation";

const blurbs = getBlurbs();

const Navigation = () => {
  return (
    <div className="sm:w-1/4 md:w-1/5 w-full flex-shrink flex-grow-0 p-2">
      <div className="sticky top-0 p-4">
        <div className="text-lg font-bold pb-5">Steps</div>
        <ul className="flex sm:flex-col overflow-hidden content-center justify-between">
          {blurbs.map(({ link, heading }, index) => (
            <li className="flex-shrink-0 flex-grow-0 " key={link}>
              <a
                className="w-full block p-4 cursor-pointer hover:bg-gray-100 rounded-lg"
                href={`#${link}`}
                onClick={(e) => {
                  e.preventDefault();
                  const feature = pointsOfInterest.features[index];

                  document.querySelector(`#${link}`)?.scrollIntoView({
                    behavior: "smooth",
                  });
                  flyToLocation(
                    link,
                    feature.geometry.coordinates as LngLatLike,
                    index
                  );
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
