import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { Animated } from '../../modules';

const flexCentre = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function Square({ children }) {
  return (
    <div style={Object.assign({}, flexCentre, { height: '100px', width: '100px', border: '1px solid black' })}>
      {children}
    </div>
  );
}

function Circle({ children }) {
  return (
    <div style={Object.assign({}, flexCentre, { height: '100px', width: '100px', borderRadius: '50%', border: '1px solid black' })}>
      {children}
    </div>
  );
}

class SwapExample extends React.Component {
  constructor() {
    super();
    this.togglePosition = this.togglePosition.bind(this);
    this.state = {
      position: 'a',
    };
  }
  togglePosition() {
    this.setState({
      position: this.state.position === 'a' ? 'b' : 'a',
    });
  }
  render() {
    const { position } = this.state;

    const a = (
      <Animated id="my-circle-a">
        <Circle>:)</Circle>
      </Animated>
    );

    const b = (
      <Animated id="my-circle-b">
        <Circle>:(</Circle>
      </Animated>
    );

    return (
      <div>
        <div><button onClick={this.togglePosition}>Move the circle</button></div>
        <Square>{position === 'a' ? a : b}</Square>
        <Square>{position === 'a' ? b : a}</Square>
      </div>
    );
  }
}

storiesOf('Animated', module)
  .add('swap', () => (<SwapExample />));
