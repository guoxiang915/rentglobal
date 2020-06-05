import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default (props) => (
  <SvgIcon
    {...props}
    width="18"
    height="13"
    viewBox="0 0 18 13"
  >
    <defs>
      <style>
        {'.a{fill:#525252;}'}
      </style>
    </defs>
    <g transform="translate(-2 -5)">
      <rect className="icon-path" width="8" height="4" transform="translate(7 9)" />
      <rect className="icon-path" width="2" height="11" transform="translate(17 6)" />
      <rect className="icon-path" width="3" height="13" transform="translate(13 5)" />
      <rect className="icon-path" width="2" height="4" transform="translate(18 9)" />
      <rect className="icon-path" width="2" height="11" transform="translate(3 6)" />
      <rect className="icon-path" width="3" height="13" transform="translate(6 5)" />
      <path className="icon-path" d="M0,0H2V4H0Z" transform="translate(2 9)" />
    </g>
  </SvgIcon>
);
