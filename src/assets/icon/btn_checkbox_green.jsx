import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default (props) => (
  <SvgIcon {...props} width="24" height="24" viewBox="0 0 24 24">
    <defs>
      <style>
        {
          '.a,.b{fill:#fff;}.b{stroke:#d7df23;stroke-width:1.5px;}.c{opacity:0;}.d{clip-path:url(#a);}.e{stroke:none;}.f{fill:none;}'
        }
      </style>
      <clipPath id="a">
        <rect className="a" width="11.492" height="8.409" />
      </clipPath>
    </defs>
    <g className="b">
      <circle className="e" cx="12" cy="12" r="12" />
      <circle className="f" cx="12" cy="12" r="11.25" />
    </g>
    <g className="c" transform="translate(6 8)">
      <g className="d">
        <path
          className="a"
          d="M11.209.283a.966.966,0,0,1,0,1.366L4.731,8.126a.966.966,0,0,1-1.366,0L.282,5.042A.965.965,0,0,1,1.648,3.677l2.4,2.4L9.843.283a.966.966,0,0,1,1.366,0"
          transform="translate(0.001 0)"
        />
      </g>
    </g>
  </SvgIcon>
);
