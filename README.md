# react-flip
Render here, render there, watch it animate, move on.

A one component library that makes it dead simple to make a component animate from here to there, no measuring pixels required.

```js
import { Animated } from 'react-flip';

// render here
<div>
  <div className="here">
    <Animated id="I'm unique! :)">
      <MyCoolComponent />
    </Animated>
  </div>
  <div className="there">
    null
  </div>
</div>

// render there
<div>
  <div className="here">
    null
  </div>
  <div className="there">
    <Animated id="I'm unique! :)">
      <MyCoolComponent />
    </Animated>
  </div>
</div>

// oh, that's it...
```

*gif coming soon :)*

## Install
`npm install --save react react-motion react-flip`;

**Yes** there is a peer dependency on `react-motion` (and obviously `react`);

## Use it
`react-flip` exports a single component `Animated`.

### Make something move from here to there
- Wrap it inside an `Animated` with a unique id.
```js
<Animated id="animated-thingy">
  <MyCoolComponent />
</Animated>
```
- Render it somewhere "before"
```js
<div className="somewhere">
  <Animated id="animated-thingy">
    <MyCoolComponent />
  </Animated>
</div>
```
- Cause it to render elsewhere "after" (due to a state/props/context change).
```js
<div className="somewhere">
  null
</div>
<div className="elsewhere">
  <Animated id="animated-thingy">
    <MyCoolComponent />
  </Animated>
</div>
```
 ***Warning***: Your animated must remain mounted between your before and after renders. If the animated unmounts (is not rendered) for just a single update, it loses memory of its last position and assumes it is new.

### You can also make things swap positions:

- Render the before.
```js
<div className="somewhere">
  <Animated id="animated-thingy-1">
    <Component1 />
  </Animated>
</div>
<div className="elsewhere">
  <Animated id="animated-thingy-2">
    <Component2 />
  </Animated>
</div>
```
- Render the after (with your animateds swapped).
```js
<div className="somewhere">
  <Animated id="animated-thingy-2">
    <Component2 />
  </Animated>
</div>
<div className="elsewhere">
  <Animated id="animated-thingy-1">
    <Component1 />
  </Animated>
</div>
```

### And even reorder entire collections:

- Render (also supplying the `index` prop).
```js
<div>
  {this.state.items.map(({ id, ...etc }, i) => (
    <Animated id={id} key={id} index={i}>
      <Component {...etc} />
    </Animated>
  ))}
</div>
```
- Reorder the items.
- Render again.

**Remember**: the `key` prop goes on the root node of any element in an array, however, the `index` prop is for `<Animated>` only. For example:
```js
<div>
  {this.state.items.map(({ id, ...etc }, i) => (
    <div className="wrap-each-item-but-don't-animate-this-element" key={id}>
      <Animated id={id} index={i}>
        <Component {...etc} /> // I'll still be animated
      </Animated>
    </div>
  ))}
</div>
```

### API

#### Props
- `id`: string (required)
  An id for tracking this specific animated component. It must be unique from all other ids of `<Animated>`s currently being rendered. If you happen to use two of the same id, there will be no warning (currently), and the animation won't occur.

- `index`: number (optional)
  The index of this item, if this item was rendered in a collection. You **must** supply this prop when rendering collections of `<Animated>`s that you wish to reanimate when reordered. (If you for some reason don't want that, don't supply the prop).

- `children`: ReactElement | ManualRenderFunction (required)
  What will be rendered.

  - If ReactElement: the element will be wrapped in a `<div>`, and that div will receive ```style={{ transform: `translate(${translateX}px, ${translateY}px)` }}``` to perform the animation. If you want to avoid the extra div and apply the transformation directly to your component, use a ManualRenderFunction instead.

  - If ManualRenderFunction: this function will be called with the signature `(getRef: (node) => void, AnimationData { translateX: number, translateY: number, progress: number, isAnimating: boolean }) => ReactElement`. This will be called every frame with updated (tweened) animation data. You **must** supply `getRef` to the root element of your component as a ref callback so that its position can be measured, and you **must** apply the transformation yourself. `progress` is a number from 0 to (over) 100 (it may go over 100 if the animation overshoots the target. ie. `animation === 100` does not mean the animation has finished).

- `spring`: SpringConfig (optional)
  This is a react-motion [spring config](https://github.com/chenglou/react-motion#--spring-val-number-config-springhelperconfig--opaqueconfig), which has the shape `{ stiffness: number (optional), damping: number (optional), precision: (optional) }`, you can use this to configure the physics of the animation.

- `transitionBegan`: function (optional)
  A callback which is triggered when the transition animation has begun.

- `transitionFinished`: function (optional)
  A callback which is triggered when the transition animation has come to a full stop.

## Run the demos
```bash
git clone https://github.com/MarcoThePoro/react-flip.git
cd react-flip
npm install
npm run storybook
```
Then navigate to [http://localhost:9001](http://localhost:9001)

## Test it
404 tests not found

## FAQ

- I'm trying to swap two `<Animated>`s but they're jumping to their new position without animating.

  Check if you're accidentally giving them the same `id`.

- I'm trying to reorder a collection of `<Animated>`s but they're jumping to their new position without animating.

  Ensure you're supplying correct values for `key` (trackable across renders) and `index` (position in collection).

- Help! Now that all the animation work is done by this library, I no longer have a job!

  Oh no!
