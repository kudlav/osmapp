import React, { Component } from 'react';

// https://jakearchibald.github.io/svgomg/
// https://www.smooth-code.com/open-source/svgr/playground/

interface Props {
  width: number;
  height: number;
  className?: string;
}
export default class LogoOsmapp extends Component<Props, never> {
  static muiName = 'LogoOsmapp';

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { width, height, className } = this.props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width={width}
        height={height}
        className={className}
      >
        <g fillRule="evenodd">
          <path
            d="M32.578 33.691L80.11 45.27l42.412-11.943 43.51 11.822 44.12-13.041 13.162 47.166-14.382 42.29 11.7 41.804-10.846 44.241-44.607 11.822-43.51-12.797-34.125 10.847-51.31-6.094 10.97-46.556-11.335-45.704L47.69 78.663z"
            fill="#eb5757"
          />
          <g fill="#fff" stroke="#fff">
            <path
              d="M118.927 125.615l-36.129 35.643c2.407 4.336 8.381 9.267 11.495 11.199l33.955-37.286"
              strokeWidth="1.309"
            />
            <path
              d="M175.92 107.559c0 17.48-13.968 31.65-31.198 31.65s-31.198-14.17-31.198-31.65c0-17.48 13.967-31.65 31.198-31.65 17.23 0 31.198 14.17 31.198 31.65z"
              strokeWidth="2.945"
            />
          </g>
        </g>
      </svg>
    );
  }
}
