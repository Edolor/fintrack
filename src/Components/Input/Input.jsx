import React from 'react';

function Input({type, name, id, reff, error, def, handleChange, placeholder, disabled=false}) {
  return (
      <>
        {
            type !== "textarea" 
                ?
            (<input type={type} name={name} placeholder={placeholder} onChange={handleChange} id={id} disabled={disabled} className={`border px-4 py-4 rounded-md font-lg
                placeholder-zinc-400 disabled:opacity-50 focus:outline-none focus:ring-1 w-full invalid:border-red-500
                invalid:focus:border-red-500 invalid:focus:ring-red-500
                ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-sky-500 focus:ring-sky-500 border-zinc-200"}`}
                ref={reff} defaultValue={def} />)
                : 
            (<textarea cols="20" rows="6" name={name} placeholder={placeholder} id={id} onChange={handleChange} disabled={disabled} className={`border px-4 py-4 rounded-md font-lg
                placeholder-zinc-400 disabled:opacity-50 focus:outline-none focus:ring-1 w-full resize-none
                invalid:border-red-500 finvalid:ocus:border-red-500 invalid:focus:ring-red-500
                ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:border-sky-500 focus:ring-sky-500 border-zinc-200"}`}
            ref={reff} ></textarea>)
        }
      </>
  )
}

export default Input;

// ttps://github.com/login?client_id=Iv1.9d7d662ea00b8481
// &return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3DIv1.9d7d662ea00b8481%26scope%3Dread%253Auser%252Cuser%253Aemail%26state%3De0d94a60f4a1fa389c52e1f3b53dc38e14eae80c4848e7c16d50a30c3520551df7f19a9cced5d886d93e43572c31d77676a634ee32a5810e8bb57e8c5726d21624c7f9766cec6a9c1cc374bb27e6f7359b2f9656ba62048cbd55c8164258d71adec4191c97a59c586241632c7305ad074dab7d66ea61fe35d7653e043757