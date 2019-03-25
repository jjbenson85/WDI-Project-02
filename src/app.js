import React from 'react'
import ReactDOM from 'react-dom'

import './scss/style.scss'

import { BrowserRouter , Route, Switch } from 'react-router-dom'

import PlacesIndex from './components/places/PlacesIndex'
import PlacesShow from './components/places/PlacesShow'
import Home from './components/Home'

class App extends React.Component {

  constructor(){
    super()

    this.state={}
    this.updateBg = this.updateBg.bind(this)
  }



  updateBg(){
    const rndm = Math.random()
    const num = Math.floor(rndm*6)
    this.setState({bg: num})
    setTimeout(this.updateBg, 1000*10)
  }

  componentDidMount(){
    this.updateBg()
  }

  render() {

    return (
      <BrowserRouter>
        <main className={`bg bg-${this.state.bg}`}>
          <Switch>
            <Route path="/places/:id/:fsa" component={PlacesShow} />
            <Route path="/places" component={PlacesIndex} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
