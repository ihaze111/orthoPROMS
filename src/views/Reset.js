import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
  NHSButton, NHSFormControl, NHSFormGroup, NHSFormHint, NHSFormLabel,
} from '../components/react-styled-nhs/src/NHSComponents';
import NHSBackLink from '../components/react-styled-nhs/src/NHSBackLink';


import {
  sendCode,
  reset,
} from '../actions/signupActions';
import HeaderMenu from '../components/HeaderMenu';

class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      type: '',
      code: '',
      timer: 60,
      discodeBtn: false,
      clearInterval: false,
      btnText: 'Send Code',
      history: createBrowserHistory(),
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
        return alert('Please enter your e-mail.');
      }
      if (code === '') {
        return alert('Please enter code');
      }
      // 验证密码
      if (this.state.password === '' || this.state.passwordConfirmation === '') {
        return alert('Please enter your NewPassword');
      }
      if (this.state.password !== this.state.passwordConfirmation) {
        return alert('Entered passwords differ!');
      }
      this.props.reset(this.state)
        .then((res) => {
          if (res.data.code === 200) {
            alert(res.data.message);
            this.goback();
          } else {
            alert(res.data.message);
          }
        })
        .catch((res) => {
          console.error(res);
        });
      return null;
    };
    this.handleClick = (e) => {
      e.preventDefault();

      const { email } = this.state;
      if (email === '') {
        return alert('Please enter your e-mail.');
      }

      this.props.sendCode(this.state)
        .then(
          (res) => {
            if (res.data.code === 200) {
              alert(res.data.message);
              this.count();
            } else {
              alert(res.data.message);
            }
          },
          (res) => {
            console.log(res);
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
              timer: 60,
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
                  <Row>
                    <Col>
                      <NHSFormGroup controlId="formBasicEmail">
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
                        />
                      </NHSFormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <NHSFormGroup controlId="formBasicCode">
                        <NHSFormLabel>Code</NHSFormLabel>
                        <NHSFormControl
                          type="text"
                          placeholder="Enter Code"
                          name="code"
                          onChange={this.onChange}
                        />
                      </NHSFormGroup>
                    </Col>
                    <Col>
                      <NHSButton
                        variant="outline-primary"
                        block
                        style={{ 'margin-top': '32px' }}
                        onClick={this.handleClick}
                        disabled={this.state.discodeBtn}
                      >
                        {this.state.btnText}
                      </NHSButton>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <NHSFormGroup controlId="formBasicPassword">
                        <NHSFormLabel>New Password</NHSFormLabel>
                        <NHSFormControl
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={this.onChange}
                        />
                      </NHSFormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <NHSFormGroup controlId="formBasicPassword">
                        <NHSFormLabel>Confirmation Password</NHSFormLabel>
                        <NHSFormControl
                          type="password"
                          placeholder="Password"
                          name="passwordConfirmation"
                          onChange={this.onChange}
                        />
                      </NHSFormGroup>
                    </Col>
                  </Row>
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
