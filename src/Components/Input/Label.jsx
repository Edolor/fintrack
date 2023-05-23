import React from 'react';

function Label({htmlFor, text}) {
  return (
    <label htmlFor={htmlFor} className="text-base font-semibold dark:text-zinc-100">
        {text} <span className="text-red-600 dark:text-red-400"></span>
    </label>
  )
}

export default Label;