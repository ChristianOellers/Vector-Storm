/**
 * Object pool.
 */
export default class Stage {
  objects: any[];

  /**
   * Hold objects.
   */
  constructor() {
    // Values
    this.objects = [];
  }

  /**
   * Add single object.
   */
  add(object: any) {
    this.objects.push(object);
  }

  /**
   * Set many objects.
   */
  set(objects: any) {
    this.objects = objects;
  }
}
