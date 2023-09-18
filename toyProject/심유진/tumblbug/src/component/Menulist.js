import React from 'react';
import './Menulist.css';

export default function Menulist({ id, name }) {
  return <li id={id} className={'menu-list-item'}>{name}</li>;
}