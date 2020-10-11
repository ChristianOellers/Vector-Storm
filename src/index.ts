import TestComponent from './app/test';

const t: TestComponent = new TestComponent();

window.onload = () => {
  console.log('hi', t);
};
