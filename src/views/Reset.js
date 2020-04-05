import React from 'react';
import Form from 'react-bootstrap/Form';
import qs from 'qs';

import {
  connect,
} from 'react-redux';
import * as PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import NHSContainer from '../components/react-styled-nhs/src/NHSContainer';
import NHSWrapper from '../components/react-styled-nhs/src/NHSWrapper';
import NHSFooter from '../components/react-styled-nhs/src/NHSFooter';
import {
  NHSButton, NHSFormControl, NHSFormError, NHSFormGroup, NHSFormHint, NHSFormLabel,
} from '../components/react-styled-nhs/src/NHSComponents';
import NHSBackLink from '../components/react-styled-nhs/src/NHSBackLink';


import {
  sendCode,
  reset,
} from '../actions/signupActions';
import HeaderMenu from '../components/HeaderMenu';

/**
 * Page for resetting password
 */
class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      type: '',
      code: '',
      timer: 180,
      discodeBtn: false,
      clearInterval: false,
      btnText: 'Send Code',
      history: createBrowserHistory(),
      error: { all: '' },
      id: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id !== undefined
        ? qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id : '1',
    };
    this.onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
    this.goback = () => {
      this.state.history.goBack();
    };
    this.onSubmit = (e) => {
      e.preventDefault();
      const { email } = this.state;
      const { code } = this.state;
      if (email === '') {
        this.setState({ error: { email: 'Please enter your e-mail.' } });
      }
      if (code === '') {
        this.setState({ error: { code: 'Please enter code' } });
      }
      // Verify password
      if (this.state.password === '' || this.state.passwordConfirmation === '') {
        this.setState({ error: { passwordsTogether: 'Please enter your new password' } });
      }
      if (this.state.password !== this.state.passwordConfirmation) {
        this.setState({ error: { passwordsTogether: 'Entered passwords differ!' } });
      }
      if (email !== '' && this.state.password === this.state.passwordConfirmation && this.state.password !== '' && this.state.passwordConfirmation !== '' && code !== '') {
        this.setState({ error: {} });
        const type = this.state.id === '1' ? 'Patient' : 'Clinician';
        this.props.reset({
          ...this.state,
          type,
        })
          .then((res) => {
            if (res.data.code === 200) {
              window.location = `/Login?id=${this.state.id}&success=passwordReset`;
            } else if (res.data.code === 404) {
              this.setState({ error: { email: res.data.message } });
            } else if (res.data.code === 401) {
              this.setState({ error: { code: res.data.message } });
            } else {
              this.setState({ error: { all: res.data.message } });
            }
          })
          .catch((res) => {
            if (res.response.status === 404) {
              this.setState({ error: { email: res.response.data.message } });
            } else if (res.response.status === 401) {
              this.setState({ error: { code: res.response.data.message } });
            } else {
              this.setState({ error: { all: res.response.data.message } });
            }
          });
      }
      return null;
    };
    this.handleClick = (e) => {
      e.preventDefault();

      const { email } = this.state;
      if (email === '') {
        this.setState({ error: { email: 'Please enter your e-mail.' } });
      }

      this.props.sendCode(this.state)
        .then(
          (res) => {
            if (res.data.code === 200) {
              this.setState({ codeSent: `Code has been emailed to ${res.data.data.email}` });
              this.setState({ error: {} });
              this.count();
            } else {
              this.setState({ error: { emailAndCode: res.data.message } });
            }
          },
        )
        .catch(
          (res) => {
            this.setState({ error: { emailAndCode: res.message } });
          },
        );

      return null;
    };
    this.count = () => {
      let { timer } = this.state;
      const siv = setInterval(() => {
        this.setState({
          timer: (timer -= 1),
          btnText: timer,
          discodeBtn: true,
        }, () => {
          if (timer === 0) {
            clearInterval(siv);
            this.setState({
              timer: 180,
              btnText: 'Resend',
              discodeBtn: false,
            });
          }
        });
      }, 1000);
    };
  }

  render() {
    return (
      <div>
        <HeaderMenu
          navigationDisabled
          searchDisabled
        />
        <NHSContainer>
          <NHSWrapper>
            <NHSBackLink href={`/Login?id=${qs.parse(
              this.props.location.search,
              { ignoreQueryPrefix: true },
            ).id}`}
            >
              Go back
            </NHSBackLink>
            <div className="nhsuk-grid-row">
              <div className="nhsuk-grid-column-two-thirds">
                <Form onSubmit={this.onSubmit}>
                  <h1 style={{ fontWeight: 'bold' }}>Reset Your Password</h1>
                  <br />
                  <NHSFormGroup error={this.state.error.emailAndCode || this.state.error.all}>
                    <NHSFormGroup
                      controlId="formBasicEmail"
                      error={this.state.error.email || this.state.error.all}
                    >
                      <NHSFormLabel>Email address</NHSFormLabel>
                      <NHSFormHint>
                        We&apos;ll never share your email with anyone
                        else.
                      </NHSFormHint>
                      <NHSFormControl
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={this.onChange}
                        error={this.state.error.email || this.state.error.all}
                      />
                      <NHSFormError>{this.state.error.email}</NHSFormError>
                    </NHSFormGroup>
                    <NHSButton
                      variant="outline-primary"
                      block
                      style={{ 'margin-top': '32px' }}
                      onClick={this.handleClick}
                      disabled={this.state.discodeBtn}
                    >
                      {this.state.btnText}
                    </NHSButton>
                    <p>{this.state.codeSent}</p>
                    <NHSFormGroup
                      controlId="formBasicCode"
                      error={this.state.error.code || this.state.error.all}
                    >
                      <NHSFormLabel>Code</NHSFormLabel>
                      <NHSFormControl
                        type="text"
                        placeholder="Enter Code"
                        name="code"
                        onChange={this.onChange}
                        error={this.state.error.code || this.state.error.all}
                      />
                      <NHSFormError>{this.state.error.code}</NHSFormError>
                    </NHSFormGroup>
                    <NHSFormError>{this.state.error.emailAndCode}</NHSFormError>
                  </NHSFormGroup>

                  <NHSFormGroup error={this.state.error.passwordsTogether || this.state.error.all}>
                    <NHSFormGroup
                      controlId="formBasicPassword"
                      error={this.state.error.password || this.state.error.all}
                    >
                      <NHSFormLabel>New Password</NHSFormLabel>
                      <NHSFormControl
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={this.onChange}
                        error={this.state.error.password || this.state.error.all}
                      />
                      <NHSFormError>{this.state.error.password}</NHSFormError>
                    </NHSFormGroup>

                    <NHSFormGroup
                      controlId="formBasicPassword"
                      error={this.state.error.passwordConfirmation || this.state.error.all}
                    >
                      <NHSFormLabel>Confirmation Password</NHSFormLabel>
                      <NHSFormControl
                        type="password"
                        placeholder="Password"
                        name="passwordConfirmation"
                        onChange={this.onChange}
                        error={this.state.error.passwordConfirmation || this.state.error.all}
                      />
                    </NHSFormGroup>
                    <NHSFormError>
                      {this.state.error.passwordsTogether || this.state.error.all}
                    </NHSFormError>
                  </NHSFormGroup>

                  <NHSButton
                    onClick={this.onSubmit}
                    type="submit"
                  >
                    Submit
                  </NHSButton>
                </Form>
              </div>
            </div>
          </NHSWrapper>
        </NHSContainer>
        <NHSFooter />
      </div>
    );
  }
}

Reset.propTypes = {
  sendCode: PropTypes.func,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  reset: PropTypes.func,
};

export default connect(null, {
  reset,
  sendCode,
})(Reset);
