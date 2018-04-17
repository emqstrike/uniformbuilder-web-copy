import React from 'react'
import CssBaseline from 'material-ui/CssBaseline'
// import Header from '../Header/Header'
// import Footer from '../Footer/Footer'

const App = ({ children }) => (
  <React.Fragment>
    <CssBaseline />
    {/*<Header />*/}

    <main>{children}</main>

    {/* <Footer /> */}
  </React.Fragment>
)

export default App
