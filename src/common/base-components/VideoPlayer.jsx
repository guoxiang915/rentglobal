import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles, CircularProgress } from "@material-ui/core";
import { Button, Box } from ".";
import { PlayArrowOutlined, Pause } from "@material-ui/icons";

const playButtonStyleSheet = (theme) => ({
  playButtonWrapper: {
    position: "relative",
    width: 70,
    height: 70,
  },

  circularProgress: {
    position: "absolute",
    width: "100% !important",
    height: "100% !important",
  },

  playButton: {
    width: 45,
    height: 45,
    color: theme.colors.primary.white,
  },
});

const PlayButton = withStyles(playButtonStyleSheet, { name: "PlayButton" })(
  class PlayButton extends PureComponent {
    static defaultProps = {
      isPlaying: PropTypes.bool,
      onTogglePlay: PropTypes.func,
    };

    state = {
      isLoading: this.props.isLoading,
      isPlaying: this.props.isPlaying,
    };

    componentDidUpdate() {
      this.setState({
        isLoading: this.props.isLoading,
        isPlaying: this.props.isPlaying,
      });
    }

    handleTogglePlay = () => {
      this.setState(
        { isPlaying: !this.state.isPlaying },
        () =>
          this.props.onTogglePlay &&
          this.props.onTogglePlay(this.state.isPlaying)
      );
    };

    render() {
      const { isLoading, isPlaying } = this.state;
      const { classes: s } = this.props;

      return (
        <Box
          classes={{ box: s.playButtonWrapper }}
          justifyChildrenCenter
          alignChildrenCenter
        >
          {isLoading && (
            <CircularProgress
              className={s.circularProgress}
              thickness={1}
              color="primary"
            />
          )}
          <Button
            variant="icon"
            background="primary"
            link="white"
            shadow
            className={s.playButton}
          >
            {isPlaying ? (
              <Pause className={s.playButtonIcon} />
            ) : (
              <PlayArrowOutlined className={s.playButtonIcon} />
            )}
          </Button>
        </Box>
      );
    }
  }
);

export const VideoPlayer = {
  PlayButton,
};
