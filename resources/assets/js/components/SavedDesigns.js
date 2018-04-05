import React, { Component } from 'react'
import { render } from 'react-dom'
// import CssBaseline from 'material-ui/CssBaseline'

class SavedDesigns extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: []
    }
  }

  // componentDidMount() {
  //     fetch('/api/users')
  //         .then(response => {
  //         return response.json();
  // })
  // .then(users => {
  //         this.setState({ users });
  // });
  // }
  //
  // renderUsers() {
  //     return this.state.users.map(user => {
  //             return (
  //         <tr key={ user.id }>
  // <td>{ user.id }</td>
  //     <td>{ user.name }</td>
  //     <td>{ user.email }</td>
  //     </tr>
  // );
  // })
  // }

  render () {
    return (
      <div>
        <p>Test ko hehe</p>
      </div>
    )
  }
}

export default SavedDesigns

render(<SavedDesigns />, document.getElementById('root'))
