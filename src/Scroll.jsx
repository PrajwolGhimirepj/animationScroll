import React, { useEffect, useState, useRef } from "react";
import "./Scroll.css";

const Scroll = () => {
  const [scrollLocked, setScrollLocked] = useState(false);
  const [index, setIndex] = useState(0);

  const [down, setDown] = useState(false);

  // Create refs properly
  const divRef1 = useRef(null);
  const divRef2 = useRef(null);
  const divRef3 = useRef(null);
  const divRef4 = useRef(null);
  const divRef5 = useRef(null);

  const maxIndex = 4; // We have 7 sections (0 to 6)

  useEffect(() => {
    const handleWheel = (event) => {
      if (scrollLocked) return;

      setScrollLocked(true);
      setTimeout(() => setScrollLocked(false), 800);

      if (event.deltaY > 0 && index < maxIndex) {
        setIndex((prevIndex) => prevIndex + 1);

        setDown(true);
      } else if (event.deltaY < 0 && index > 0) {
        setIndex((prevIndex) => prevIndex - 1);

        setDown(false);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [scrollLocked, index]);

  useEffect(() => {
    // seconddiv
    if (down && index === 1) {
      divRef2.current.classList.add("animate");
    }
    if (!down && index === 0) {
      divRef2.current.classList.remove("animate");
    }

    // thirddiv
    if (down && index === 2) {
      divRef3.current.classList.add("animate");
    }
    if (!down && index === 1) {
      divRef3.current.classList.remove("animate");
    }

    // thirddiv
    if (down && index === 3) {
      divRef4.current.classList.add("animate");
    }
    if (!down && index === 2) {
      divRef4.current.classList.remove("animate");
    }
    // 4thddiv
    if (down && index === 4) {
      divRef5.current.classList.add("animate");
    }
    if (!down && index === 3) {
      divRef5.current.classList.remove("animate");
    }
  });

  useEffect(() => {
    const handelButtonCLick = (event) => {
      if (event.key === "ArrowUp") {
        console.log("up");
        setDown(false);
        setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
      } else if (event.key === "ArrowDown") {
        console.log("down");
        setDown(true);
        setIndex((prevIndex) => (prevIndex < 4 ? prevIndex + 1 : 4));
      }
    };

    document.addEventListener("keydown", handelButtonCLick);
    return () => {
      document.removeEventListener("keydown", handelButtonCLick);
    };
  }, []);

  return (
    <>
      <div className="info">
        <p>state down: {down.toString()}</p>
        <p>index: {index}</p>
      </div>
      <div className="main">
        <div ref={divRef1} className="divIdel  "></div>
        <div
          ref={divRef2}
          className="divIdel"
          style={{ backgroundColor: "black" }}
        >
          <img src="web_category0.jpg" alt="" />
        </div>
        <div
          ref={divRef3}
          className="divIdel"
          style={{ backgroundColor: "blue" }}
        >
          <img src="web_category1.jpg" alt="" />
        </div>
        <div
          ref={divRef4}
          className="divIdel"
          style={{ backgroundColor: "green" }}
        >
          <img src="web_category2.jpg" alt="" />
        </div>
        <div
          ref={divRef5}
          className="divIdel"
          style={{ backgroundColor: "red" }}
        >
          <img src="Web_Banner_1660x964_luxury_pret.jpg" alt="" />
        </div>
        <img
          src="Web_Banner_1660x964_copy_50f6d685-f4d7-43b3-ae13-675395c74063.jpg"
          alt=""
        />
      </div>
    </>
  );
};

export default Scroll;
