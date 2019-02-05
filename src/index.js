import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './containers/App';

const MOUNT_NODE = document.getElementById('root');

const load = (Component) => {
  render(
    <Component />,
    MOUNT_NODE,
    /** TODO: Just to show callback of render method */
    () => console.log(`${Component.name} component is mounted!`)
  );
};

load(App);

if(module.hot) {
  module.hot.accept(['./containers/App'], () => {
    unmountComponentAtNode(MOUNT_NODE);
    load(App);
  });
}

