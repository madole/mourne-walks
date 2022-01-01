import pointsOfInterest from "../data/points-of-interest-mourne.json";
export interface BlurbType {
  link: string;
  heading: string;
  body: string;
}
export const getBlurbs = (): BlurbType[] => {
  return pointsOfInterest.features.map((feature) => {
    return {
      link: feature.properties.link,
      heading: feature.properties.heading,
      body: feature.properties.body,
    };
  });
};
