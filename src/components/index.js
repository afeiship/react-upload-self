import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactUpload from '@jswork/react-upload';

const CLASS_NAME = 'react-upload-self';

export default class ReactUploadSelf extends Component {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static propTypes = {
    /**
     * The extended className for component.
     */
    className: PropTypes.string,
    /**
     * The runtime image url value.
     */
    value: PropTypes.string,
    /**
     * The change handler.
     */
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: noop
  };

  constructor(inProps) {
    super(inProps);
    this.state = {
      value: inProps.value
    };
  }

  shouldComponentUpdate(inProps) {
    const { value } = inProps;
    if (typeof value === 'undefined') return true;
    if (value !== this.state.value) {
      this.setState({ value });
    }
    return true;
  }

  handleChange = (inEvent) => {
    const { blobs } = inEvent.target.value;
    const { onChange } = this.props;
    this.setState({ value: blobs[0] });
    onChange(inEvent);
  };

  handleRemove = () => {
    const { onChange } = this.props;
    const target = { value: null };
    this.setState(target);
    onChange({ target });
  };

  render() {
    const { className, onChange, value, ...props } = this.props;
    const _value = this.state.value;

    return (
      <div
        data-component={CLASS_NAME}
        data-value={!!_value}
        className={classNames('wsui-frame-wrapper', CLASS_NAME, className)}>
        {_value && <img src={_value} alt="" />}
        <ReactUpload
          className="is-form-control"
          onChange={this.handleChange}
          {...props}
        />
        <div className="is-placeholder">
          <span className="is-tips">+ 添加文件</span>
          <button type="button" className="is-action" onClick={this.handleRemove}>
            删除🧨
          </button>
        </div>
      </div>
    );
  }
}
