import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import { register } from '../../serviceWorker';
import { Top }from './App'

ReactDOM.render(
  <Provider store={store}>
    <Top/>
  </Provider>,
  document.getElementById('app') as HTMLElement
);
register();