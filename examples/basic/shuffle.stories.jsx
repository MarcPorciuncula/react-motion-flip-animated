import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { Animated } from '../../modules';
import shuffle from 'lodash/shuffle';
import range from 'lodash/range';

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

class ShuffleExample extends React.Component {
  constructor() {
    super();
    this.shuffle = this.shuffle.bind(this);
    this.state = {
      items: range(1, 26).map(n => n.toString()),
    };
  }
  shuffle() {
    this.setState({
      items: shuffle(this.state.items),
    });
  }
  render() {
    const { items } = this.state;

    return (
      <div>
        <div><button onClick={this.shuffle}>Shuffle</button></div>
        <div style={{ display: 'flex', flexFlow: 'row wrap', width: '560px' }}>
          {items.map((id, i) => (
            <Square key={id}>
              <Animated id={`shuffle-${id}`} index={i}><Circle>{id}</Circle></Animated>
            </Square>
          ))}
        </div>
      </div>
    );
  }
}

storiesOf('Animated', module)
  .add('shuffle', () => (<ShuffleExample />));
