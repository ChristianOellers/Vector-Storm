// @flow
class Stage {
  constructor() {
    // Values
    this.objects = [];
  }

  add(object) {
    this.objects.push(object);
  }

  set(objects) {
    this.objects = objects;
  }
}
