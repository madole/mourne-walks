import { h } from "preact";
import type { BlurbType } from "./utils/getBlurbs";
import { getBlurbs } from "./utils/getBlurbs";
import { useEffect, useRef } from "preact/compat";
import useIntersectionObserver from "./hooks/useIntersectionObserver";
import pointsOfInterest from "./data/points-of-interest-mourne.json";
import { flyToLocation } from "./utils/flyToLocation";
import { Feature } from "./types";

const blurbs = getBlurbs();

const Blurb = ({ blurb, index }: { blurb: BlurbType; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 1,
    rootMargin: "0px 0px -50px 0px",
  });
  useEffect(() => {
    if (entry?.isIntersecting) {
      if (window.location.href.includes(blurb.link)) {
        return;
      }
      const feature = pointsOfInterest.features[index] as Feature;
      flyToLocation(feature);
    }
  }, [blurb.link, entry?.isIntersecting, index]);

  return (
    <div
      ref={ref}
      id={blurb.link}
      className="flex flex-col gap-4 bg-white p-8 md:p-10 rounded-xl md:rounded-3xl shadow-lg w-11/12 md:w-2/3"
    >
      <h2 className="prose prose-lg font-bold max-w-none">{blurb.heading}</h2>
      <p className="prose max-w-none">{blurb.body}</p>
    </div>
  );
};

function Content() {
  return (
    <div class="flex flex-col gap-108 mb-108 items-center">
      {blurbs.map((blurb, index) => (
        <Blurb blurb={blurb} index={index} key={blurb.link} />
      ))}
    </div>
  );
}

export default Content;
