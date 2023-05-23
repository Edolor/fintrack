import React, { useState } from 'react';
import Icon from "../Icon/Icon";

function Message({type, message, show, setShow}) {

    const handleClose = () => { 
        // Remove message
        setShow(() => "");
    }

    return (
        <>
            {
                (type === "success") && (
                    <div className={`bg-green-600 text-white px-6 py-3 font-semibold flex items-center transition-transform
                        rounded-md space-x-3 ${show ? "translate-x-0" : "-translate-x-96"}`}>
                        <div>{message}</div>
                        <button className="hover:bg-green-500 h-8 w-8 rounded-full flex justify-center items-center
                                    active:scale-95 transition-transform" onClick={handleClose}>
                            <Icon name="close" color="#ffffff" classes="h-6 w-6 block" />
                        </button>
                    </div>
                )
            }

            {
                (type === "error") && (
                    <div className={`bg-red-100 text-red-600 px-6 py-3 items-center justify-between transition-transform
                            rounded-md space-x-3 ${show ? "flex" : "hidden"}`}>
                        <div>{message}</div>
                        <button type="button" className="hover:bg-red-200 h-8 w-8 rounded-full flex justify-center items-center
                                    active:scale-95 transition-transform" onClick={handleClose}>
                            <Icon name="close" color="#DC2626" classes="h-6 w-6 block" />
                        </button>
                    </div>
                )
            }
        </>
    )
}

export default Message