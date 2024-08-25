import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const Updateicon = (props) => (
  <Svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_37_41)">
      <Path
        d="M12.5 1.5625L12.5 17.1875M12.5 17.1875L18.75 12.5M12.5 17.1875L6.25 12.5M1.5625 18.75V20.3125C1.5625 22.0384 2.96161 23.4375 4.6875 23.4375H20.3125C22.0384 23.4375 23.4375 22.0384 23.4375 20.3125V18.75"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_37_41">
        <Rect width={25} height={25} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Updateicon;
