import React from 'react';
import Icons from './icons.svg';

function Icon(props) {
  const style = props.style ?? {}; 

  return (
    <svg className={props.classes} preserveAspectRatio="none" style={style ? style : ""}  fill={props.color}>
        <use href={Icons + `#${props.name}`} />
    </svg>
  )
}

export default Icon