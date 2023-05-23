import React from 'react'
import Header from "./../Layout/Header/Header";
import Footer from "./../Layout/Footer/Footer";
import { Outlet } from "react-router-dom";

function Root({error}) {

  return (
    <div className="w-full">
      <Header />
      <main className="pt-[83px] pb-12">
        {!error ? <Outlet /> : error }
      </main>
      <Footer />
    </div>
  )
}

export default Root;