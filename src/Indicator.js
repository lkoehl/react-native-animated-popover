import * as React from "react";
import Svg, { G, Polygon } from "react-native-svg";

export default class Indicator extends React.Component {
  render() {
    return (
      <Svg {...this.props} width="100%" height="100%" viewBox="0 0 16 6">
        <G
          id="Icon-&amp;-Splash"
          stroke="none"
          strokeWidth={1}
          fill="none"
          fillRule="evenodd"
        >
          <G
            id="Basic/Popover/Indicator/Selected"
            transform="translate(-17.000000, -4.000000)"
            fill={this.props.color}
          >
            <Polygon id="Triangle" points="25 4 33 10 17 10" />
          </G>
        </G>
      </Svg>
    );
  }
}
