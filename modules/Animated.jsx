import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

import controller from './Controller';

const MEASURE_LAST = 'MEASURE_LAST';
const INVERT = 'INVERT';
const PLAY = 'PLAY';
const DONE = 'DONE';

class Animated extends React.Component {
  constructor(props) {
    super(props);

    this.receiveRef = this.receiveRef.bind(this);
    this.onRest = this.onRest.bind(this);

    this.first = null;
    this.state = {
      state: DONE,
      translateY: 0,
      translateX: 0,
      progress: 100,
    };
  }

  componentDidMount() {
    const prevBoundingClientRect = controller.mount(this.props.id);
    if (prevBoundingClientRect) {
      this.animate(prevBoundingClientRect)
        .catch(err => console.error(err));
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.id !== props.id || this.props.index !== props.index) {
      // simulate unmount/remount
      this.componentWillUnmount();
      this.setState({}, () => {
        this.componentDidMount();
      });
    }
  }

  componentWillUnmount() {
    // FIXME the rectangle is measured *when react is reconciling*, dom changes may
    // have taken place since the last full render. What we really need is a way to
    // measure this when we know the component will not be rendered on the next render,
    // but before the render is reconciled. Considering a root wrapper that tracks this.
    controller.unmount(this.props.id, this.ref.getBoundingClientRect());
  }

  onRest() {
    this.setState({
      state: DONE,
    });
    this.props.transitionFinished();
  }

  receiveRef(node) {
    this.ref = node;
  }

  async animate(first) {
    const setState = state => new Promise(resolve => this.setState(state, resolve));

    await setState({
      state: MEASURE_LAST,
    });

    const last = this.ref.getBoundingClientRect();
    const translateX = first.left - last.left;
    const translateY = first.top - last.top;

    await setState({
      state: INVERT,
      translateX,
      translateY,
      progress: 0,
    });

    await setState({
      state: PLAY,
      progress: 100,
      translateX: 0,
      translateY: 0,
    });

    this.props.transitionBegan();
  }

  render() {
    let children;
    if (typeof this.props.children === 'function') {
      children = this.props.children;
    } else {
      children = (ref, { translateY, translateX }) => (
        <div ref={ref} style={{ transform: `translate(${translateX}px, ${translateY}px)` }}>
          {this.props.children}
        </div>
      );
    }

    if (this.state.state === MEASURE_LAST || this.state.state === DONE) {
      return children(this.receiveRef, {
        isAnimating: false,
        translateY: 0,
        translateX: 0,
        progress: 100,
      });
    }

    return (
      <Motion
        key={`flip_${this.props.id}`}
        style={{
          translateY: spring(this.state.translateY, this.props.spring),
          translateX: spring(this.state.translateX, this.props.spring),
          progress: spring(this.state.progress, this.props.spring),
        }}
        onRest={this.onRest}
      >
        {tween =>
          children(
            this.receiveRef,
            Object.assign({}, { isAnimating: this.state.state === PLAY }, tween),
          )
        }
      </Motion>
    );
  }
}

Animated.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
  spring: PropTypes.shape({
    stiffness: PropTypes.number,
    damping: PropTypes.number,
    precision: PropTypes.number,
  }),
  transitionBegan: PropTypes.func,
  transitionFinished: PropTypes.func,
};

Animated.defaultProps = {
  spring: {},
  index: -1,
  transitionBegan: () => undefined,
  transitionFinished: () => undefined,
};

export default Animated;
