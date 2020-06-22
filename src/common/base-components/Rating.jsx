import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  StarIcon,
} from './';

const styleSheet = () => ({
  container: {
  },
});

const Rating = ({ rating, iconSize = 20, classes }) => {
  const ratingPoints = [0, 1, 2, 3, 4];
  return (
    <Typography className={classes.container}>
      {ratingPoints.map((point, index) => (
        <React.Fragment key={index}>
          {point <= rating &&
          <Typography textPrimary>
            <StarIcon style={{ width: iconSize, height: iconSize }} />
          </Typography>
          }
          {point > rating &&
          <Typography textBorderGrey>
            <StarIcon style={{ width: iconSize, height: iconSize }} />
          </Typography>
          }
        </React.Fragment>
      ))}
    </Typography>
  );
};

export default withStyles(styleSheet)(Rating);
