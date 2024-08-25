import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const Helpicon = (props) => (
  <Svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_37_33)">
      <Path
        d="M12.5 17.1875V12.5M12.5 7.8125V7.77588M23.4375 12.5C23.4375 18.5406 18.5406 23.4375 12.5 23.4375C6.45939 23.4375 1.5625 18.5406 1.5625 12.5C1.5625 6.45939 6.45939 1.5625 12.5 1.5625C18.5406 1.5625 23.4375 6.45939 23.4375 12.5Z"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_37_33">
        <Rect width={25} height={25} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Helpicon;
