import React from 'react';
import { Link } from "react-router-dom";
import trackImage from "../../Assets/img/hero-image.png"

export default function Home() {
  return (
    <>
      <section id="hero" className="w-full relative flex flex-col justify-center min-h-[40vh]
          bg-yellowish lg:min-h-[80vh] lg:py-8">
        <div className="container mx-auto flex justify-center items-center h-full px-6 lg:justify-start sm:px-10 xl:px-14">
          <div className="w-full flex flex-col space-y-6 items-center py-14 sm:py-10 lg:w-1/2 lg:items-start">
            <h1 className="font-serif font-extrabold dark:text-zinc-100 max-w-lg flex flex-col space-y-px text-center 
                text-5xl items-center sm:text-[56px] lg:items-start md:text-left">
              <span className="leading-tight text-center lg:text-left"><span className="text-primary">Easiest way</span> to</span> 
              <span className="leading-tight text-center lg:text-left">to track your <span className="text-primary">finances.</span></span>
            </h1>
            <p className="text-lg mt-1 text-center leading-normal max-w-lg sm:text-xl lg:text-left dark:text-zinc-100">
              Monitor your transactions, log custom transactions, get automatic receipts.
            </p>

            <div className="pt-2 sm:pt-0 flex items-center flex-col gap-y-6 sm:gap-x-8 sm:flex-row">
              <div className="overflow-hidden">
                <Link to="/login"
                    className="flex flex-row items-center text-base justify-center font-semibold px-7 py-3.5 bg-white rounded-md
                      text-primary border border-primary drop-shadow-sm outline-offset-2 w-full sm:w-auto  outline-primary outline-1
                      focus:outline active:drop-shadow-none sm:text-lg hover:underline hover:bg-zinc-50">
                  Login and track
                </Link>
              </div>

              <div className="overflow-hidden">
                <Link to="/signup"
                    className="flex flex-row items-center text-base justify-center font-semibold px-7 py-3.5 bg-primary rounded-md
                      text-white drop-shadow-lg outline-offset-2 outline-primary outline-1 focus:outline
                      active:drop-shadow-none sm:text-lg hover:underline hover:bg-primaryLight">
                  Create an account
                </Link>
              </div>
            </div>
          </div>

          <div className="w-1/2 hidden h-full items-center flex-col justify-between space-y-8 lg:flex">
            <figure>
              <img src={trackImage} alt="Tracking with paper and pen." />
              <figcaption className="hidden">Tracking with paper and pen</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  )
}
