import React from "react";

function Popup({children}) {
    return (
        <>
            <div className="z-50 fixed h-screen w-full top-0 left-0 flex items-center justify-center">
                <div className="fixed h-screen w-full top-0 left-0 bg-black opacity-50 z-20">&nbsp;</div>
                {children}
            </div>
        </>
    )
}

export default Popup;
