import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { BrightnessHighFill, MoonFill } from "react-bootstrap-icons";
import './GemeniService.js'
import "./css/start.css";
export default function Quizstart() {

  const navigate = useNavigate();
  const location = useLocation();
  const { questions = [] } = location.state || {};
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // All states 
  const [Sidebar, setSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const question = questions[currentQuestion];
  const [answers, setAnswers] = useState({});
  // dark and light theme
  const [theme, settheme] = useState({
    mode: "light",
    color: "#1E293B",
    backgroundColor: "#F8FAFC",
  });

  const changetheme = () => {
    if (theme.mode === "light") {
      settheme({
        mode: "dark",
        color: "#F1F5F9", // Soft white text
        backgroundColor: "#353839",
        // Deep matte black
      });
    } else {
      settheme({
        mode: "light",
        color: "#1E293B", // Deep charcoal text
        backgroundColor: "#F8FAFC", // Clean off-white
      });
    }
  };
  // Go back button
  const handleConfirm = () => {
    setShowModal(false);
    navigate("/instructions");
  };

  // const exitwithskip = () => {
  //   setShowModal(false);
  //   navigate("/leaderboard");
  // };
  // UseEffect for the prevention of page reloading
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  //if quiz errors
  if (!questions.length) {
    return (
      navigate("/error")
    );
  }
  function submitAnswer() {
    if (selectedOption === null) {
      alert("Please select an answer.");
      return;
    }

    if (!answerSubmitted) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: selectedOption,
      }));

      setAnswerSubmitted(true);
      return;
    }

    // Move to next question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setAnswerSubmitted(false);
    } else {
      navigate("/leaderboard", {
        state: {
          questions,
          answers,
        },
      });
    }
  }

  function skipQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setAnswerSubmitted(false);
      return;
    }

    const hasUnansweredQuestions = questions.some(
      (_, index) => answers[index] === undefined
    );

    if (hasUnansweredQuestions) {
      setShowModal(true);
      return;
    }

    navigate("/leaderboard", {
      state: {
        questions,
        answers,
      },
    });
  };

  return (
    <div className="overflow-hidden h-100 " style={theme}>
      <nav
        className="navbar navbar-expand border-bottom text-center p-3 "
        style={{ background: theme.backgroundColor }}
      >
        <div className="container-fluid justify-content-between align-items-center">
          <div className="d-flex align-items-center flex-row gap-2 gap-lg-3">
            <Link
              to="/instructions"
              className="btn border-secondary exit-button"
              style={{ color: theme.color }}
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-bar-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"
                />
              </svg>
            </Link>
            {showModal && (
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{ color: theme.color }}
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content rounded-3 shadow">
                    <div className="modal-body p-4 text-center" style={{ color: theme.color }}>
                      <h5 className="mb-0">Want to Exit Quiz?</h5>
                      <p className="mb-0 mt-1">
                        If you leave now, your current quiz progress will be lost and you'll need to start again.
                      </p>
                    </div>

                    <div className="modal-footer flex-nowrap p-0">
                      <button
                        type="button"
                        className="btn btn-lg exit-button btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end"
                        onClick={handleConfirm}
                        style={{ color: theme.color }}>
                        <strong>Exit Quiz </strong>
                      </button>

                      <button
                        type="button"
                        className="btn btn-lg btn-success btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0"
                        onClick={() => setShowModal(false)}
                        style={{ color: theme.color }} >
                        Continue! 👍
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button
              className="btn border-secondary sidebar-btn fw-bold d-inline-flex align-items-center gap-2"
              style={{ color: theme.color }}
              onClick={() => setSidebar(currentValue => !currentValue)}
            >
              <span className="d-lg-flex d-none">Questions</span>
              {Sidebar ? <i className="bi bi-box-arrow-left"></i> : <i className="bi bi-box-arrow-right"></i>}
            </button>
          </div>
          <div className=" justify-content-center align-items-center text-center text-white pt-1  ">
            <h2 className="text-center fs-4" style={{ color: theme.color }}>
              QuizBoard
            </h2>

          </div>
          <div className="justify-content-end align-items-center ">
            <button
              className="btn theme align-items-center fs-4"
              onClick={() => changetheme()} style={{ color: theme.color }}>
              {theme.mode === "dark"
                ? <BrightnessHighFill />
                : <MoonFill />}
            </button>

          </div>
        </div>
      </nav>

      <div className={`row flex-wrap-reverse ${Sidebar ? "" : "justify-content-center"} align-items-top gap-2`} style={{ minHeight: "calc(100vh - 73px)" }}>
        {/* Question offcanvas */}
        <div
          className={`col-12 ${Sidebar ? "col-lg-3" : "col-lg-1"}`}
        >
          <div
            className={`sidebar ${Sidebar ? "show-sidebar" : "hide-sidebar"
              } d-flex flex-column justify-content-start shadow-lg border-end h-100`}
            style={theme}>
            <div className="d-flex align-items-center justify-content-between w-100 p-3 border-bottom mt-1">
              <h5 className="fs-5 fw-semibold">
                Questions Menu:
              </h5>

              <button
                className="btn border-secondary sidebar-btn fw-bold d-inline-flex d-lg-none align-items-center gap-2"
                style={{ color: theme.color }}
                onClick={() => setSidebar((value) => !value)}
              >
                {Sidebar ? (
                  <i className="bi bi-box-arrow-left"></i>
                ) : (
                  <i className="bi bi-box-arrow-right"></i>
                )}
              </button>
            </div>

            <div className="list-group list-group-flush border-bottom overflow-auto flex-grow-1 custom-scrollbar" >

              {questions.map((q, index) => (
                <button
                  key={index}
                  type="button"
                  className={`list-group-item list-group-item-action ${currentQuestion === index ? "active" : ""
                    }`}
                  onClick={() => {
                    setCurrentQuestion(index);
                    setSelectedOption(null);
                    setAnswerSubmitted(false);
                  }}
                  style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>
                  <strong className="fw-sans ">Q.{index + 1}</strong>{" "}
                  <h5 className="fs-6">{q.question}</h5>
                </button>
              ))}


            </div>
          </div>
        </div>

        {/* Question Body */}
        <div
          className={`col-12 ${Sidebar ? "col-lg-8" : "col-lg-8 px-5"
            } p-4`}
        >
          {/* Question */}

          <div className="question-wrapper my-5">
            <p>
              Choose One Correct Answer From Below Options
            </p>

            <h2 className="fs-4">
              <span className="fw-bolder fs-3">
                Q.{currentQuestion + 1}
              </span>{" "}
              {question?.question}
            </h2>
          </div>


          {/* Options */}

          <div className="options d-flex align-items-center justify-content-center flex-column gap-3">
            {question?.options.map((option, index) => {

              const isCorrect =
                question.correctAnswers.includes(index);

              const isSelected =
                selectedOption === index;

              let optionClass = "";

              if (answerSubmitted) {
                if (isCorrect) {
                  optionClass = "correct-option";
                } else if (isSelected) {
                  optionClass = "incorrect-option";
                }
              }

              return (
                <div
                  key={index}
                  className="checkbox-wrapper d-flex flex-row align-items-center gap-2 w-100 mb-2"
                >
                  <input
                    type="radio"
                    name="answer"
                    id={`option-${index}`}
                    checked={isSelected}
                    disabled={answerSubmitted}
                    onChange={() => setSelectedOption(index)}
                  />

                  <label
                    htmlFor={`option-${index}`}
                    className={`d-flex align-items-center fs-6 fw-regular w-100 ${optionClass}`}
                    style={{
                      color: theme.color,
                      background: theme.backgroundColor,
                      borderColor: theme.color,
                    }}
                  >
                    <span>
                      {option}
                    </span>

                    {answerSubmitted && isCorrect && (
                      <span className="ms-auto text-success fw-bold fs-5">
                        ✓
                      </span>
                    )}

                    {answerSubmitted &&
                      isSelected &&
                      !isCorrect && (
                        <span className="ms-auto text-danger fw-bold fs-5">
                          ✕
                        </span>
                      )}
                  </label>
                </div>

              );
            })}

          </div>


          {/* Explanation */}

          {answerSubmitted && (
            <div
              className="answer-explanation mt-4 p-3 rounded"
              style={{ color: theme.color }}
            >
              <h6 className="fw-bold mb-2">
                Explaination:
              </h6>

              <p className="mb-0">
                {question?.explanation}
              </p>
            </div>
          )}


          {/* Buttons */}

          <div className="d-flex justify-content-between align-items-center mt-5">

            <button
              type="button"
              className="btn btn-secondary skip-btn"
              style={theme}
              onClick={skipQuestion}
            >
              Skip Question
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-border-success submit-btn"
              style={theme}
              onClick={submitAnswer}
              disabled={selectedOption === null}
            >
              {answerSubmitted
                ? currentQuestion === questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"
                : "Submit Answer"}
            </button>

          </div>

        </div>


      </div>
    </div >
  );
}
