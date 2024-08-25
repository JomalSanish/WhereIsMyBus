import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Rateicon = (props) => (
  <Svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12.5 3.125L15.8799 9.81146L23.4375 10.8837L17.9687 16.0884L19.2597 23.4375L12.5 19.9677L5.74025 23.4375L7.03125 16.0884L1.5625 10.8837L9.12013 9.81146L12.5 3.125Z"
      stroke="black"
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </Svg>
);
export default Rateicon;
