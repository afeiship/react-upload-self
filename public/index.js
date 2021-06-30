import ReactDemokit from '@jswork/react-demokit';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactUploadSelf from '../src/main';
import './assets/style.scss';

class App extends React.Component {
  state = {
    v1: 'https://tva1.sinaimg.cn/large/008i3skNgy1gqh868msafj302s02st8l.jpg'
  };

  render() {
    const { v1 } = this.state;
    return (
      <ReactDemokit
        className="p-3 app-container"
        url="https://github.com/afeiship/react-upload-self">
        <ReactUploadSelf
          value={v1}
          onChange={(e) => {
            console.log('changed.');
            const { value } = e.target;
            const { url } = value;
            if (value) {
              this.setState({ v1: url });
              setTimeout(() => {
                console.log('fetch image from api:');
                this.setState({
                  v1: 'https://tva1.sinaimg.cn/large/007S8ZIlgy1gexw87htqhj305k05k74o.jpg'
                });
              }, 3000);
            }
          }}
          className="mb-5"
        />
        <ReactUploadSelf className="mb-5" />
        <ReactUploadSelf className="mb-5" />
        <ReactUploadSelf className="mb-5" />
      </ReactDemokit>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
