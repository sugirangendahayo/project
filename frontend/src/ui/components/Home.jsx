/* eslint-disable no-unused-vars */
import React , {useEffect} from 'react'
import student_books from "../../assets/images/student_books.jpg"
import background_image from "../../assets/images/background.jpg";
import smileyGirlReading from "../../assets/images/smiley-girl-reading.jpg";
import { Link } from 'react-router-dom';
import initializeAOS from '../../utils/aosConfig';
import ScrollTop from '../../utils/ScrollTop';




const Home = () => {

useEffect(()=>{
    initializeAOS();
})

  return (
    <>
    <ScrollTop />
      <section>
        <div
          className="hero min-h-[50vh]  bg-cover bg-center"
          style={{ backgroundImage: `url(${smileyGirlReading})` }}
          data-aos="fade-up"
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
              <p className="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-ghost">Get Started</button>
            </div>
          </div>
        </div>
        <div className="md:grid grid-cols-3 mt-9 items-center justify-between  " data-aos="fade-left">
          <div className=" flex justify-around items-center m-2 py-2 rounded gap-2 shadow-inner ">
            <span className=" shadow-md px-5 py-2 rounded">
              <svg
                data-slot="icon"
                fill="none"
                className="w-12"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                ></path>
              </svg>
            </span>
            <div className="text-center md:text-left">
              <span className="font-medium">500+</span>
              <span className="block text-gray-500">Graduated students.</span>
            </div>
          </div>
          <div className="  flex justify-around items-center m-2 py-2 rounded gap-2 shadow-inner ">
            <span className=" shadow-md px-5 py-2 rounded">
              <svg
                data-slot="icon"
                fill="none"
                className="w-12"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                ></path>
              </svg>
            </span>
            <div className="text-center md:text-left">
              <span className="font-medium">150+</span>
              <span className="block text-gray-500">E-learning courses.</span>
            </div>
          </div>
          <div className="  flex justify-around items-center m-2 py-2 rounded gap-2 shadow-inner ">
            <span className="shadow-md px-5 py-2 rounded">
              <svg
                data-slot="icon"
                fill="none"
                className="w-12"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                ></path>
              </svg>
            </span>
            <div className="text-center md:text-left">
              <span className="font-medium">1.2k</span>
              <span className="block text-gray-500">
                International students
              </span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div className="py-4">
            <h1
              className="text-2xl font-semibold py-3 px-2 text-center md:text-left"
              data-aos="fade-up"
            >
              Interactive teaching our online platorms
            </h1>
          </div>
          <div className="md:grid grid-cols-2 md:gap-16 justify-between px-3">
            <div className=" relative m-2 rotate-3 " data-aos="zoom-in-down">
              <img src={background_image} alt="" />
              <div className="absolute top-4 md:top-12 right-0 md:-right-10 rotate-[-14deg] w-56 md:w-80 ">
                <img src={student_books} alt="" className="" />
              </div>
            </div>
            <div
              className="m-2 py-2 px-1 text-center md:text-left grid"
              data-aos="fade-right"
            >
              <div>
                <h1 className="flex justify-center md:justify-start">
                  <span>
                    <svg
                      data-slot="icon"
                      className="w-6 text-blue-900"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      ></path>
                    </svg>
                  </span>
                  <span className="px-2 text-medium font-medium">
                    Everyday complete workshit
                  </span>
                </h1>
                <p className="text-small text-gray-500 pl-8 text-center md:text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.eos
                  magni fuga dolores commodifugiat eum nisi.
                </p>
              </div>
              <div>
                <h1 className="flex justify-center md:justify-start">
                  <span>
                    <svg
                      data-slot="icon"
                      className="w-6 text-green-500"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      ></path>
                    </svg>
                  </span>
                  <span className="px-2 text-medium font-medium text-center">
                    Online group discussion
                  </span>
                </h1>
                <p className="text-small text-gray-500 pl-8 text-center md:text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.eos
                  magni fuga dolores commodifugiat eum nisi.
                </p>
              </div>
              <div>
                <h1 className="flex justify-center md:justify-start">
                  <span>
                    <svg
                      data-slot="icon"
                      className="w-6 text-blue-900 font-bold"
                      fill="none"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      ></path>
                    </svg>
                  </span>
                  <span className="px-2 text-medium font-medium ">
                    Learning outcome
                  </span>
                </h1>
                <p className="text-small text-gray-500 pl-8 text-center md:text-left">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.eos
                  magni fuga dolores commodifugiat eum nisi.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 px-2 py-5">
          <div
            className="md:flex bg-gradient-to-r from-slate-950 via-slate-800 to-slate-600 py-6 rounded-xl  md:w-[80%] m-auto px-3 items-center justify-between"
            data-aos="fade-up"
          >
            <div className="text-center md:text-left">
              <h1 className="text-xl font-medium text-center text-white">
                Are you ready to start your course now!
              </h1>
            </div>
            <div className="flex justify-between">
              <span className="px-2 py-1 m-2 flex justify-center items-center rounded-lg bg-transparent  hover:scale-110 duration-300 transition-all">
                <Link to="/about">Get Started</Link>
              </span>
              <span className="bg-transparent border-basic-border border-white text-white px-2 py-1 m-2 rounded-lg hover:scale-110 duration-300 transition-all">
                <Link to="/contact">Contact us</Link>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home