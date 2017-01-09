import invariant from 'invariant';

// TODO only use a single setTimeout and batch the flush
// TODO figure out how to resolve the one mounted at a time thing

class Controller {
  constructor() {
    this.entries = {};
  }

  mount(id) {
    invariant(typeof id === 'string', `Must supply an id, you supplied ${id}`);
    if (this.entries[id]) {
      clearTimeout(this.entries[id].timeout);
      this.entries[id].timeout = null;
      this.entries[id].mounted = true;
      return this.entries[id].rect;
    }
    this.entries[id] = {
      id,
      rect: null,
      mounted: true,
      timeout: null,
    };
    return null;
  }

  unmount(id, rect) {
    invariant(typeof id === 'string', `Must supply an id, you supplied ${id}`);
    this.entries[id].rect = rect;
    this.entries[id].mounted = false;
    this.entries[id].timeout = setTimeout(() => {
      if (!this.entries[id].mounted) {
        delete this.entries[id];
      }
    }, 1);
  }
}

export default new Controller();
