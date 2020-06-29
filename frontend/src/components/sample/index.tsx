import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ButtonSample from '../common/ButtonSample';

class Sample extends React.Component {
  render() {
    return (
      <div>
        <h1>Sample page</h1>
        <ButtonSample str={"クリックしてや"}></ButtonSample>
      </div>
      
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Sample/>, app);