import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import beograd from "../images/beograd.jpg";
import novisad from "../images/novisad.jpg";
import nis from "../images/nis.jpg";
import subotica from "../images/subotica.jpg";
import krusevac from "../images/krusevac.jpg";

const cities = [
  { name: "Belgrade", image: beograd },
  { name: "Novi Sad", image: novisad },
  { name: "Nis", image: nis },
  { name: "Subotica", image: subotica },
  { name: "Krusevac", image: krusevac }
];

const Hamburger = ({ state }) => {
  // Create varibles of our dom nodes
  let menuLayer = useRef(null);
  let reveal1 = useRef(null);
  let reveal2 = useRef(null);
  let cityBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);

  useEffect(() => {
    // If the menu is open and we click the menu button to close it.
    if (state.clicked === false) {
      gsap.to([reveal2, reveal1], {
        duration: 0.8,
        height: 0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.07
        }
      });
      gsap.to(menuLayer, { duration: 1, css: { display: "none" } });
      // If menu is closed and we want to open it.
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      gsap.to(menuLayer, { duration: 0, css: { display: "block" } });
      gsap.to([reveal1, reveal2], {
        duration: 0,
        opacity: 1,
        height: "100%"
      });
      staggerReveal(reveal1, reveal2);
      fadeInUp(info);
      staggerText(line1, line2, line3);
    }
  }, [state]);

  const staggerReveal = (node1, node2) => {
    gsap.from([node1, node2], {
      duration: 0.8,
      height: 0,
      transformOrigin: "right top",

      ease: "power3.inOut",
      stagger: {
        amount: 0.1
      }
    });
  };

  const staggerText = (node1, node2, node3) => {
    gsap.from([node1, node2, node3], {
      duration: 0.8,
      y: 100,
      delay: 0.1,
      ease: "power3.inOut",
      stagger: {
        amount: 0.3
      }
    });
  };

  // Fade up for the additonal info on our menu
  const fadeInUp = node => {
    gsap.from(node, {
      y: 60,
      duration: 1,
      delay: 0.2,
      opacity: 0,
      ease: "power3.inOut"
    });
  };

  // Hover on the link
  const handleHover = e => {
    gsap.to(e.target, {
      duration: 0.3,
      y: 3,

      ease: "power1.inOut"
    });
  };

  // Hover off the link
  const handleHoverExit = e => {
    gsap.to(e.target, {
      duration: 0.3,
      y: -3,
      skewX: 0,
      ease: "power1.inOut"
    });
  };

  // adds city image once you hover on
  const handleCity = city => {
    gsap.to(cityBackground, {
      duration: 0,
      background: `url(${city}) center center`
    });
    gsap.to(cityBackground, {
      duration: 0.4,
      opacity: 1,
      ease: "power3.inOut"
    });
    gsap.from(cityBackground, {
      duration: 0.4,

      transformOrigin: "right top"
    });
  };

  // Removes the city image once you hover off
  const handleCityReturn = () => {
    gsap.to(cityBackground, {
      duration: 0.4,
      opacity: 0
    });
  };

  return (
    <div ref={el => (menuLayer = el)} className="hamburger-menu">
      <div
        ref={el => (reveal1 = el)}
        className="menu-secondary-background-color"
      ></div>
      <div ref={el => (reveal2 = el)} className="menu-layer">
        <div
          ref={el => (cityBackground = el)}
          className="menu-city-background"
        ></div>
        <div className="container">
          <div className="wrapper">
            <div className="menu-links">
              <nav>
                <ul>
                  <li>
                    <Link
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line1 = el)}
                      to="/projects"
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line2 = el)}
                      to="/about-us"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={e => handleHover(e)}
                      onMouseOut={e => handleHoverExit(e)}
                      ref={el => (line3 = el)}
                      to="/contact-us"
                    >
                      Contact us
                    </Link>
                  </li>
                </ul>
              </nav>
              <div ref={el => (info = el)} className="info">
                <h3>Short About Us</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas sed libero sit amet mauris blandit cursus. Donec a
                  tincidunt erat. Nam interdum massa ac mi finibus convallis.
                  Curabitur eu vulputate elit. Cras non lobortis neque, nec
                  consequat lacus. Aliquam vestibulum condimentum consequat.
                  Phasellus mollis odio nisi, sit amet faucibus nisl euismod a.
                  test
                </p>
              </div>
              <div className="locations">
                Locations:
                {/* Returning the list of cities */}
                {cities.map(el => (
                  <span
                    key={el.name}
                    onMouseEnter={() => handleCity(el.image)}
                    onMouseOut={handleCityReturn}
                  >
                    {el.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
