import * as React from "react";
import Svg, { G, Circle, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const Circleart = (props) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_d_165_292)">
      <Circle
        cx={11}
        cy={7}
        r={6}
        stroke="white"
        strokeWidth={2}
        shapeRendering="crispEdges"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
export default Circleart;
