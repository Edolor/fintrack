import React from 'react';

function Select({name, id, reff, options, error, def=0, disabled=false}) {
  return (
      <>
        <select name={name} id={id} disabled={disabled} className={`border px-4 pr-10 py-4 rounded-md font-lg
            placeholder-zinc-400 disabled:opacity-50 focus:outline-none focus:ring-1 w-full invalid:border-red-500
            invalid:focus:border-red-500 invalid:focus:ring-red-500
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-sky-500 focus:ring-sky-500 border-zinc-200"}`}
            ref={reff}>
            {
                options.map((option, index) => {
                  return index === def ? (
                    <option key={index} value={option}>{option}</option>
                  ) : (
                    <option key={index} value={option} defaultValue={option}>{option}</option>
                  )
                })
            }
        </select>
      </>
  )
}

export default Select;