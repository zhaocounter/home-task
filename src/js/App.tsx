import React from 'react'
import { connect } from 'react-redux'
import Home from './container/home'
import { State } from './types'

export interface IProps {
  appData: {appTheme: String},
}

function App(props: IProps) {
  const { appData } = props
  return (
    <div className={`app ${appData.appTheme}`}>
      <Home />
    </div>
  )
}

const mapStateToProps = (state: State)=> {
  return {
    appData: state.app
  }
}

export default connect(mapStateToProps)(App)



