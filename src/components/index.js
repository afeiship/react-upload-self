import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactUpload from '@jswork/react-upload';
import ReactFadeImage from '@jswork/react-fade-image';

const CLASS_NAME = 'react-upload-self';

const DEFAULT_TEMPLATE = ({ file, url }) => {
  if (!file || file.type.includes('image/')) {
    return <ReactFadeImage className="is-scaleable is-image" src={url} />;
  }
  return (
    <div data-type={file.type} className="is-not-image">
      {file.name}
    </div>
  );
};

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
    onChange: PropTypes.func,
    /**
     * The uploaded display template.
     */
    template: PropTypes.func
  };

  static defaultProps = {
    onChange: noop,
    template: DEFAULT_TEMPLATE
  };

  constructor(inProps) {
    super(inProps);
    this.state = {
      url: inProps.value || null,
      file: null
    };
  }

  shouldComponentUpdate(inProps) {
    const { value } = inProps;
    if (typeof value === 'undefined') return true;
    if (value !== this.state.url) {
      this.setState({ url: value });
    }
    return true;
  }

  change = (inValue) => {
    const { onChange } = this.props;
    this.setState(inValue);
    onChange({ target: { value: inValue } });
  };

  handleChange = (inEvent) => {
    const { value } = inEvent.target;
    if (!value.length) return null;
    this.change(value[0]);
  };

  handleRemove = () => {
    this.change({ url: null, file: null });
  };

  render() {
    const { className, onChange, template, value, ...props } = this.props;
    const { url, file } = this.state;

    return (
      <div
        data-component={CLASS_NAME}
        data-value={!!url}
        className={classNames(
          'wsui-scaleable-image wsui-frame-wrapper',
          CLASS_NAME,
          className
        )}>
        {url && template({ url, file })}
        <ReactUpload
          className="is-form-control"
          onChange={this.handleChange}
          {...props}
        />
        <div className="is-placeholder">
          <span className="is-tips">+ 添加文件</span>
          <button
            type="button"
            className="is-action"
            onClick={this.handleRemove}>
            删除🧨
          </button>
        </div>
      </div>
    );
  }
}
