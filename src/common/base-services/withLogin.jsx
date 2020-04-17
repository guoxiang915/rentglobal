import React, { PureComponent } from 'react';
import { LoginDialog } from '../../components/Layout/Dialogs';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';

export const withLogin = (C, options) => {
  class withLogin extends PureComponent {
    state = { dialog: null };

    componentDidUpdate(prevProps) {
      if (prevProps.auth?.isLoggedIn !== this.props.auth?.isLoggedIn) {
        this.setState({ dialog: null });
        if (options?.hardReload !== false) {
          window.location.reload(false);
        }
      }
    }

    handleCloseDialog = () => {
      this.setState({ dialog: null });
    };

    passLoginDialog = () => {
      const { isLoggedIn } = this.props.auth;
      if (!isLoggedIn) {
        this.setState({
          dialog: (
            <LoginDialog
              auth={this.props.auth}
              mappedLogin={this.props.mappedLogin}
              onClose={this.handleCloseDialog}
            />
          ),
        });
      }
      return isLoggedIn;
    };

    render() {
      const { dialog } = this.state;
      return (
        <React.Fragment>
          {dialog}
          <C passLoginDialog={this.passLoginDialog} {...this.props} />
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.authState,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      mappedLogin: (credentials, history) =>
        dispatch(authActions.login(credentials, history)),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(withLogin));
};
