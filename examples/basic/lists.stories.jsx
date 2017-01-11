import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { css } from 'glamor';

import { Animated } from '../../';

css.global('body, html, #root', {
  margin: '0',
  height: '100%',
  fontFamily: 'Roboto, sans-serif',
});

const wrapper = css({
  position: 'relative',
  height: '100%',
  width: '100%',
  backgroundColor: '#2196F3',
});

const lists = css({
  display: 'flex',
  height: '100%',
});

const listOuter = css({
  display: 'flex',
  flexDirection: 'column',
});

const list = css({
  width: '270px',
  borderRadius: '3px',
  backgroundColor: '#E3F2FD',
  margin: '5px',
  padding: '5px',
});

const listTitle = css({
  margin: '5px',
  fontSize: '20px',
});

const listItem = css({
  marginBottom: '6px',
  backgroundColor: '#fff',
  borderRadius: '3px',
  borderBottom: '1px solid rgb(204, 204, 204)',
  padding: '6px',
  display: 'flex',
  fontSize: '14px',
});

const listItemText = css({
  margin: '0',
  flexGrow: '1',
});

const tick = css({
  cursor: 'pointer',
  margin: 0,
  color: 'rgb(204, 204, 204)',
  ':hover': {
    color: '#00E676',
  },
});

const bin = css({
  cursor: 'pointer',
  margin: 0,
  color: 'rgb(204, 204, 204)',
  ':hover': {
    color: '#F44336',
  },
});

function List({ items, name, handleAction }) {
  return (
    <div className={listOuter}>
      <div className={list}>
        <h1 className={listTitle}>{name}</h1>
        {items.map((text, i) => (
          <Animated key={`note_${text}`} id={`note_${text}`} index={i}>
            <ListItem text={text} action={name === 'todo' ? 'done' : 'delete'} handleAction={() => handleAction(text)} />
          </Animated>
        ))}
      </div>
    </div>
  );
}

function ListItem({ text, action = 'done', handleAction }) {
  return (
    <div className={listItem}>
      <p className={listItemText}>
        {text}
      </p>
      { action === 'done' ?
        <p className={tick} onClick={handleAction}>
          ✔
        </p>
      : null}
      { action === 'delete' ?
        <p className={bin} onClick={handleAction}>
          🗑
        </p>
      : null}
    </div>
  );
}

class ListExample extends React.Component {
  constructor() {
    super();
    this.handleDone = this.handleDone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      todo: [
        'Make slick animations',
        'IoT all the things',
        'Self driving scooters',
        'Get groceries',
        'World domination',
        'Eat lunch',
        'Write todos',
      ],
      done: ['Clone trello'],
    };
  }
  handleDelete(text) {
    this.setState({
      done: this.state.done.filter(item => item !== text),
    });
  }
  handleDone(text) {
    this.setState({
      todo: this.state.todo.filter(item => item !== text),
      done: [...this.state.done, text],
    });
  }
  render() {
    return (
      <div className={wrapper}>
        <div className={lists}>
          {Object.entries(this.state).map(([name, items]) => (
            <List key={name} name={name} items={items} handleAction={name === 'todo' ? this.handleDone : this.handleDelete} />
          ))}
        </div>
      </div>
    );
  }
}

storiesOf('Todo List')
  .add('default', () => <ListExample />);
