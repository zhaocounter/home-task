import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Main from '../components/main'
import Actions from '../action'
import { State } from '../types'

export interface IProps {
  appData: {
    appTheme: string
  },
  updateThemeAction: (appTheme: string) => void
}

function Home(props: IProps) {
  const { appData, updateThemeAction } = props

  const updateTheme = (): void => {
    if (appData.appTheme === 'light') {
      updateThemeAction('dark')
    } else {
      updateThemeAction('light')
    }
  }

  return (
    <div className='home'>
      <div className='page'>
        <div className='header'></div>
        <div className='content'>
          <div className='content-left'>
            <div className='content-aside'>
              <div className='top-part'></div>
              <div className='bottom-part'></div>
            </div>
            <div className='content-main'>
              <Main />
            </div>
          </div>
          <div className='content-right'></div>
        </div>
        <div className='footer'>
          <div className='footer-button' onClick={updateTheme}>Click here!</div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state: State) => {
  return {
    appData: state.app
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateThemeAction: (appTheme: string) => dispatch(Actions.updateThemeAction(appTheme)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
