import React from 'react'
import { connect } from 'react-redux'
import { getStuff} from './store/actions'

const  Ideas = ({ stuff, getStuff })  => {
  return (
    <div>
      Some state changes:
      {`a = ${stuff ? stuff.a : 0}; b = ${stuff ? stuff.b : 0}`}
      <div>
      <button onClick={() => getStuff(1, 2)}>Get Stuff</button>
      </div>
    </div>
  )
}

export default connect(
  state => ({ stuff: state.ideas.stuff }),
  { getStuff }
)(Ideas)
