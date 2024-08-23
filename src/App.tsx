import "./App.css";
import "./Locomotive.css";
import Locomotive from "locomotive-scroll";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import jasmeet from "./assets/jasmeet.jpg";
import josh from "./assets/josh.jpg";
import redBlood from "./assets/red-blood.jpg";

function App() {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const scroll = new Locomotive({
            el: scrollRef.current as HTMLDivElement,
            smooth: true,
        });

        return () => {
            scroll.destroy();
        };
    }, []);

    useEffect(() => {
        document.querySelectorAll(".elem").forEach((item) => {
            let rotate = 0;
            let rotateDiff = 0;

            // Ensure event type is correctly typed
            item.addEventListener("mousemove", (event) => {
				const mouseEvent = event as MouseEvent;
                const topDiff =
                    mouseEvent.clientY - item.getBoundingClientRect().top;
                rotateDiff = mouseEvent.clientX - rotate;
                rotate = mouseEvent.clientX;

                gsap.to(item.querySelector("img"), {
                    opacity: 1,
                    ease: "power3",
                    top: topDiff,
                    left: mouseEvent.clientX,
                    rotate: gsap.utils.clamp(-20, 20, rotateDiff * 0.5),
                    duration: 1,
                });

                gsap.to(item.querySelector("h1"), {
                    opacity: 0.4,
                    ease: "power3",
                    paddingLeft: "100px",
                    duration: 1,
                });
            });

            item.addEventListener("mouseleave", () => {
                gsap.to(item.querySelector("img"), {
                    opacity: 0,
                    ease: "power3",
                    duration: 1,
                });

                gsap.to(item.querySelector("h1"), {
                    opacity: 0.7,
                    ease: "power3",
                    duration: 1,
                    paddingLeft: "0px",
                });
            });
        });
    }, []);

    return (
        <div ref={scrollRef}>
            <div id="main">
                <div id="element">
                    <div className="elem">
                        <img src={jasmeet} alt="jasmeet" />
                        <h1>jasmeet</h1>
                        <h4>BIRD</h4>
                    </div>
                    <div className="elem">
                        <img src={josh} alt="josh" />
                        <h1>josh</h1>
                        <h4>FLOWER</h4>
                    </div>
                    <div className="elem elemlast">
                        <img src={redBlood} alt="redBlood" />
                        <h1>redBlood</h1>
                        <h4>FLOWER</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
