import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="128" cy="122" r="120" />
    <rect x="7" y="262" rx="0" ry="0" width="1" height="1" />
    <rect x="0" y="317" rx="9" ry="9" width="260" height="80" />
    <rect x="3" y="425" rx="10" ry="10" width="87" height="23" />
    <rect x="0" y="256" rx="10" ry="10" width="260" height="32" />
    <rect x="104" y="414" rx="22" ry="22" width="155" height="44" />
  </ContentLoader>
);

export default Skeleton;
