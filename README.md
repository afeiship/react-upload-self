# react-upload-self
> Upload only one element for react.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-upload-self
```

## properties
| Name      | Type   | Required | Default | Description                           |
| --------- | ------ | -------- | ------- | ------------------------------------- |
| className | string | false    | -       | The extended className for component. |
| value     | string | false    | -       | The runtime image url value.          |
| onChange  | func   | false    | noop    | The change handler.                   |
| template  | func   | false    | -       | The uploaded display template.        |


## usage
1. import css
  ```scss
  @import "~@jswork/react-upload-self/dist/style.css";

  // or use sass
  @import "~@jswork/wsui-frame-wrapper/dist/index.scss";
  @import "~@jswork/wsui-scaleable-image/dist/index.scss";
  @import "~@jswork/react-fade-image/dist/style.scss";
  @import "~@jswork/react-upload-self/dist/style.scss";
  
  

  // customize your styles:
  $react-upload-self-options: ()
  ```
2. import js
  ```js
  import ReactDemokit from '@jswork/react-demokit';
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ReactUploadSelf from '@jswork/react-upload-self';
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

  ```

## documentation
- https://afeiship.github.io/react-upload-self/


## license
Code released under [the MIT license](https://github.com/afeiship/react-upload-self/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-upload-self
[version-url]: https://npmjs.org/package/@jswork/react-upload-self

[license-image]: https://img.shields.io/npm/l/@jswork/react-upload-self
[license-url]: https://github.com/afeiship/react-upload-self/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-upload-self
[size-url]: https://github.com/afeiship/react-upload-self/blob/master/dist/react-upload-self.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-upload-self
[download-url]: https://www.npmjs.com/package/@jswork/react-upload-self
