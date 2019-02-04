import React from 'react'

class Header extends React.Component{

  constructor(){
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.props.history.push('/places')
  }
  render(){
    return(
      <header className="header">
        <div conClick={this.handleClick()} className='button'>Back</div>
      </header>
    )
  }
}

export default Header
