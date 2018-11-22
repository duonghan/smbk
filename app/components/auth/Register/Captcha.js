/* eslint-disable no-plusplus,no-bitwise */
import React, { Component } from 'react';
import { Icon, Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';

class CaptchaComponent extends Component {
  constructor(props) {
    super(props);
    this.setData();
  }

  setData = () => {
    const { text } = this.props;
    let { length } = this.props;
    if (text !== '') {
      length = { text };
    }

    this.text = [];
    this.originText = [];
    this.possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      let char = this.possible.charAt(
        Math.floor(Math.random() * this.possible.length),
      );
      if (text !== '') {
        char = text[i];
      }
      this.text.push(
        `<text
                    font-family="${this.props.fontFamily}"
                    font-size="${this.props.fontSize}"
                    x="${this.props.paddingLeft * i}"
                    y="${this.props.paddingTop}"
                    fill="${
                      this.props.textColor
                        ? this.props.textColor
                        : `# ${((1 << 24) * Math.random() || 0).toString(16)}`
                    }"
                    transform="rotate(${Math.random() * (5 - 0) + 0})"
                >${char}</text>`,
      );
      this.originText.push(char);
    }
    this.props.result(this.originText.join(''));
  };

  render() {
    const { height, width } = this.props;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" height="${height}" width="${width}">${this.text.join()}</svg>`;
    const image = btoa(svg);
    return (
      <Row gutter={8}>
        <Col span={12}>
          <img
            style={{
              background: this.props.background,
              height,
              width,
            }}
            src={`data:image/svg+xml;base64,${image}`}
            alt=""
          />
        </Col>
        <Col span={12}>
          <Button onClick={this.setData}>
            <Icon type="sync" />
          </Button>
        </Col>
      </Row>
    );
  }
}

CaptchaComponent.defaultProps = {
  height: 30,
  width: 100,
  textColor: '#0C487F',
  fontFamily: 'Verdana',
  fontSize: '24',
  paddingLeft: '20',
  paddingTop: '20',
  length: 5,
  background: 'none',
  text: '',
};

CaptchaComponent.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  length: PropTypes.number,
  textColor: PropTypes.string,
  fontFamily: PropTypes.string,
  text: PropTypes.string,
  fontSize: PropTypes.string,
  paddingLeft: PropTypes.string,
  paddingTop: PropTypes.string,
  background: PropTypes.string,
  result: PropTypes.func,
};

export default CaptchaComponent;
