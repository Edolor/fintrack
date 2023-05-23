import React from 'react';

function Error({text, active}) {
  return (
    <span className={`mt-[2px] text-red-600 dark:text-red-400 text-base ${active ? "block" : "hidden"}`}>
        {text}
    </span>
  )
}

export default Error;