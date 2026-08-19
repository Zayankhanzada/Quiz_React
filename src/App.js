import logo from "./images/newlogo2.png";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Quiz from "./Quiz";
import Quizstart from "./Quizstart";
import Host from "./Host";
import Lobby from "./Lobby";
import { Error } from "./Error";
import { Leaderboard } from "./Leaderboard";
import ErrorBoundary from "./ErrorBoundry";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;
    const starsContainer = document.getElementById("stars");

    if (!starsContainer) return;
    starsContainer.innerHTML = "";

    for (let i = 0; i < 180; i++) {
      const star = document.createElement("div");

      const size =
        Math.random() > 0.96
          ? "lg"
          : Math.random() > 0.7
            ? "md"
            : "sm";

      star.className = `star ${size}`;

      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";

      star.style.animationDuration =
        2 + Math.random() * 6 + "s";

      star.style.animationDelay =
        Math.random() * 5 + "s";

      starsContainer.appendChild(star);
    }
  }, [location.pathname]);

  // async function testQuiz() {
  //   const questions = await generateQuiz("JavaScript", 5, "easy", "explanation");

  //   console.log("Quiz Response:", questions);
  // }

  // testQuiz();
  return (

    <Routes>
      {/* HOME ROUTE */}
      <Route
        path="/"
        element={
           <ErrorBoundary fallback={<Error />}>
          <>
            <div className="stars" id="stars"></div>
            <div className="App">
              <header className="container App-header text-white d-flex flex-column align-items-center justify-content-center my-5 pt-5">
                <span className="live-badge d-flex align-items-center fw-semibold">Live-AI Quiz Platform</span>
                <img src={logo} className="App-logo " alt="logo" />
                <h1 className="fw-normal text-white ">
                  Welcome To Our <span className="fw-bold gradient-text">Quiz Board</span>, try your Best!
                </h1>
                <p className="py-3 fs-6 fs-lg-5">Create & join real-time quizzes.<br />
                  Compete, learn, dominate the leaderboard.</p>
                <div className="d-flex flex-column flex-lg-row align-items-center gap-3">



                  <Link to="/host" className="createbtn d-flex align-items-center rounded-pill lh-1 border-0 overflow-hidden text-nowrap fw-semibold text-decoration-none py-3 px-4 gap-3 text-white" >
                    <span className="createbtn-icon-wrapper d-grid position-relative flex-shrink-0 bg-white overflow-hidden">
                      <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="createbtn-icon-svg"
                        width="10"
                      >
                        <path
                          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                          fill="currentColor"
                        ></path>
                      </svg>

                      <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        width="10"
                        xmlns="http://www.w3.org/2000/svg"
                        className="createbtn-icon-svg createbtn-icon-svg--copy position-absolute"
                      >
                        <path
                          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    Create Quiz with AI
                  </Link>

                  <Link
                    to="/instructions"
                    className="main-start-btn bg-white fs-5 border-0 d-flex align-items-center overflow-hidden position-relative  gap-3 px-5 py-3 text-decoration-none rounded-pill"
                  >
                    <span className="pe-3 fs-5 fw-medium">
                      Join the Quiz!
                    </span>

                    <div className="icon bg-white position-absolute d-flex align-items-center justify-content-center  rounded-pill">
                      <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>

                        <path
                          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                          fill="currentColor"
                        ></path>
                      </svg>

                    </div>
                  </Link>
                </div>
              </header>
            </div>
          </>
          </ErrorBoundary>
        }
      />

      {/* QUIZ ROUTE */}
      <Route path="/host" element={ <ErrorBoundary fallback={<Error />}><Host /></ErrorBoundary>}></Route>
      <Route path="/instructions" element={ <ErrorBoundary fallback={<Error />}><Quiz /></ErrorBoundary>} />
      <Route path="/quiz" element={ <ErrorBoundary fallback={<Error />}><Quizstart /></ErrorBoundary>} />
      <Route path="/lobby" element={ <ErrorBoundary fallback={<Error />}><Lobby /></ErrorBoundary>} />
      <Route path="/error" element={<Error />} />
      <Route path="/leaderboard" element={ <ErrorBoundary fallback={<Error />}><Leaderboard /></ErrorBoundary>} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;