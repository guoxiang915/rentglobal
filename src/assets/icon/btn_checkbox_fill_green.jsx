import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default (props) => (
  <SvgIcon {...props} width="60" height="60" viewBox="0 0 60 60">
    <defs>
      <style>
        {
          '.a{fill:#fff;}.b{fill:#d7df23;stroke:#d7df23;}.c{clip-path:url(#c);}.d{stroke:none;}.e{fill:none;}.f{filter:url(#a);}'
        }
      </style>
      <filter
        id="a"
        x="0"
        y="0"
        width="60"
        height="60"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy="6" input="SourceAlpha" />
        <feGaussianBlur stdDeviation="6" result="b" />
        <feFlood floodColor="#d7df23" floodOpacity="0.302" />
        <feComposite operator="in" in2="b" />
        <feComposite in="SourceGraphic" />
      </filter>
      <clipPath id="c">
        <rect className="a" width="11.492" height="8.409" />
      </clipPath>
    </defs>
    <g transform="translate(18 12)">
      <g className="f" transform="matrix(1, 0, 0, 1, -18, -12)">
        <g className="b" transform="translate(18 12)">
          <circle className="d" cx="12" cy="12" r="12" />
          <circle className="e" cx="12" cy="12" r="11.5" />
        </g>
      </g>
      <g transform="translate(6 8)">
        <g className="c">
          <path
            className="a"
            d="M11.209.283a.966.966,0,0,1,0,1.366L4.731,8.126a.966.966,0,0,1-1.366,0L.282,5.042A.965.965,0,0,1,1.648,3.677l2.4,2.4L9.843.283a.966.966,0,0,1,1.366,0"
            transform="translate(0.001 0)"
          />
        </g>
      </g>
    </g>
  </SvgIcon>
);
