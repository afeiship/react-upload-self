import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactUpload from '@jswork/react-upload';
import ReactFadeImage from '@jswork/react-fade-image';
import NxObjectUrl from '@jswork/next-object-url';

const CLASS_NAME = 'react-upload-self';

const DEFAULT_TEMPLATE = ({ file, value }) => {
  if (!file || file.type.includes('image/')) {
    return <ReactFadeImage className="is-scaleable is-image" src={value} />;
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
      value: inProps.value || null,
      file: null
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
    const { files } = inEvent.target.value;
    const { onChange } = this.props;
    if (!files.length) return null;
    const file = files[0];
    const value = NxObjectUrl.create(file).url;
    const target = { value, file };
    this.setState(target);
    onChange({ target });
  };

  handleRemove = () => {
    const { onChange } = this.props;
    const target = { value: null, file: null };
    this.setState(target);
    onChange({ target });
  };

  render() {
    const { className, onChange, template, value, ...props } = this.props;
    const _value = this.state.value;
    const file = this.state.file;

    return (
      <div
        data-component={CLASS_NAME}
        data-value={!!_value}
        className={classNames(
          'wsui-scaleable-image wsui-frame-wrapper',
          CLASS_NAME,
          className
        )}>
        {_value && template({ value: _value, file })}
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
