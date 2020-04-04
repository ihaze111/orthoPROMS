import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import qs from 'qs';
import * as PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import HeaderMenu from '../components/HeaderMenu';

import { userSignupRequest, sendCode, checkCode } from '../actions/signupActions';
import NHSContainer from '../components/react-styled-nhs/src/NHSContainer';
import NHSWrapper from '../components/react-styled-nhs/src/NHSWrapper';
import NHSFooter from '../components/react-styled-nhs/src/NHSFooter';
import {
  NHSButton,
  NHSFormControl, NHSFormError,
  NHSFormGroup,
  NHSFormHint,
  NHSFormLabel,
} from '../components/react-styled-nhs/src/NHSComponents';
import NHSBackLink from '../components/react-styled-nhs/src/NHSBackLink';

/**
 * Page for registering to the orthoPROMS site
 */
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      type: '',
      code: '',
      nhsNumber: '',
      timer: 180,
      discodeBtn: false,
      clearInterval: false,
      btnText: 'Send Code',
      history: createBrowserHistory(),
      error: { all: '' },
    };
    this.onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
    this.goback = () => {
      this.state.history.goBack();
    };
    this.onSubmit = (e) => {
      e.preventDefault();
      const error = {};
      if (this.state.password === '') {
        error.password = 'Please enter your password';
      } else {
        error.password = '';
      }
      if (this.state.passwordConfirmation === '') {
        error.passwordConfirmation = 'Please enter your password again for confirmation';
      } else {
        error.passwordConfirmation = '';
      }
      if (this.state.email === '' || this.state.email.search('@') === -1) {
        error.email = 'Please enter a valid email';
      } else {
        error.email = '';
      }
      if (this.state.code === '') {
        error.code = 'Please enter the code that has been emailed to you';
      } else {
        error.code = '';
      }
      // N.B. NHS number requirements relaxed for easier testing
      // if (this.state.nhsNumber.length !== 10 || this.state.nhsNumber.parseInt().toString() !==
      // this.state.nhsNumber) { error.nhsNumber = 'Please enter a valid 10-digit NHS number';
      if (this.state.nhsNumber === '' || String(parseInt(this.state.nhsNumber, 10)) !== this.state.nhsNumber) {
        error.nhsNumber = 'Please enter your NHS number';
      } else {
        error.nhsNumber = '';
      }
      if (this.state.password !== this.state.passwordConfirmation) {
        error.passwordsTogether = 'Passwords do not match';
      } else {
        error.passwordsTogether = '';
      }
      this.setState({ error });
      if (this.state.password !== '' && this.state.passwordConfirmation !== '' && this.state.email !== '' && this.state.code !== '' && this.state.password === this.state.passwordConfirmation && this.state.nhsNumber !== '' && String(parseInt(this.state.nhsNumber, 10)) === this.state.nhsNumber) {
        // Verify the verification code before registering
        this.props.checkCode({ code: this.state.code })
          .then(
            (res) => {
              if (res.data.code === 200) {
                // Verification code is correct
                this.props.userSignupRequest(this.state)
                  .then(
                    (signupRes) => {
                      // Registration success
                      if (signupRes.data.code === 200) {
                        alert('registration success');
                        this.goback();
                      } else {
                        this.setState({ error: { all: signupRes.data.message } });
                      }
                    },
                  )
                  .catch((signupRes) => {
                    // Registration error
                    this.setState({ error: { all: JSON.stringify(signupRes) } });
                  });
              } else {
                this.setState({ error: { all: res.data.message } });
              }
            },
            (res) => {
              this.setState({ error: { all: res.message } });
            },
          );
      }
    };
    this.handleClick = (e) => {
      e.preventDefault();
      const { email } = this.state;
      if (email === '' || email.search('@') === -1) {
        this.setState({ error: { email: 'Please enter a valid email' } });
      } else {
        // Send the verification code
        this.props.sendCode(this.state)
          .then(
            (res) => {
              if (res.data.code === 200) {
                this.setState({ codeSent: `Code has been emailed to ${res.data.data.email}` });
                this.setState({ error: {} });
                this.count();
              } else {
                this.setState({ error: { email: res.data.message } });
              }
            },
          )
          .catch(
            (res) => {
              this.setState({ error: { email: res.message } });
            },
          );
      }
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

  componentDidMount() {
    const { id } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    let type;
    if (id === '1') {
      type = 'Patient';
    } else if (id === '2') {
      type = 'Clinicians';
    } else {
      // TODO: better solution than redirect?
      window.location.href = '/';
    }
    this.setState({ type });
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
            <NHSBackLink href="/">Go back</NHSBackLink>
            <div className="nhsuk-grid-row">
              <div className="nhsuk-grid-column-two-thirds">
                <Form onSubmit={this.onSubmit}>
                  <h1 style={{ fontWeight: 'bold' }}>Register with orthoPROMS</h1>
                  <br />
                  <NHSFormGroup error={this.state.error.all}>
                    <NHSFormGroup
                      controlId="formBasicEmail"
                      error={this.state.error.email || this.state.error.all}
                    >
                      <NHSFormLabel>Email address</NHSFormLabel>
                      <NHSFormHint>
                        We&apos;ll never share your email with anyone else.
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
                    <NHSFormGroup error={this.state.error.code || this.state.error.all}>
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
                      <br />
                      <NHSFormGroup controlId="formBasicCode">
                        <NHSFormLabel>Code</NHSFormLabel>
                        <NHSFormControl
                          type="text"
                          placeholder="Enter Code"
                          name="code"
                          onChange={this.onChange}
                          error={this.state.error.code || this.state.error.all}
                        />
                      </NHSFormGroup>
                      <NHSFormError>{this.state.error.code}</NHSFormError>
                    </NHSFormGroup>
                    <NHSFormGroup
                      error={this.state.error.passwordsTogether || this.state.error.all}
                    >
                      <NHSFormGroup
                        controlId="formBasicPassword"
                        error={this.state.error.password || this.state.error.all}
                      >
                        <NHSFormLabel>Password</NHSFormLabel>
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
                        <NHSFormError>{this.state.error.passwordConfirmation}</NHSFormError>
                      </NHSFormGroup>

                      <NHSFormError>{this.state.error.passwordsTogether}</NHSFormError>
                    </NHSFormGroup>

                    <NHSFormGroup
                      controlId="nhsNumber"
                      error={this.state.error.nhsNumber || this.state.error.all}
                    >
                      <NHSFormLabel>NHS Number</NHSFormLabel>
                      <NHSFormControl
                        type="number"
                        placeholder="NHS Number"
                        name="nhsNumber"
                        onChange={this.onChange}
                        error={this.state.error.nhsNumber || this.state.error.all}
                      />
                      <NHSFormError>{this.state.error.nhsNumber}</NHSFormError>
                    </NHSFormGroup>
                    <NHSFormError>{this.state.error.all}</NHSFormError>
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

Register.propTypes = {
  checkCode: PropTypes.func,
  userSignupRequest: PropTypes.func,
  sendCode: PropTypes.func,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

// export default Register;
export default connect(null, {
  userSignupRequest,
  sendCode,
  checkCode,
})(Register);
