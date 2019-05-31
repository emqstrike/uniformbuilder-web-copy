import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App/>, document.getElementById('root'));

// if (module.hot) {
//     // accept self and any dependencies (including those coming from context)
//     module.hot.accept(() => {
//         // this will be called on errors
//         // like if you have a syntax error in a hot replaced module.
//         console.log('there was an error in a hot replaced module')
//     })
// }