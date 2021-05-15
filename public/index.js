import ReactDemokit from '@jswork/react-demokit';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUploadSelf from '../src/main';
import './assets/style.scss';

class App extends React.Component {
  render() {
    return (
      <ReactDemokit
        className="p-3 app-container"
        url="https://github.com/afeiship/react-upload-self">
        <ReactUploadSelf className="mb-5" />
        <ReactUploadSelf className="mb-5" />
        <ReactUploadSelf className="mb-5" />
        <ReactUploadSelf className="mb-5" />
      </ReactDemokit>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
