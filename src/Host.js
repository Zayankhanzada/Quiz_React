import React, { useState, useEffect } from 'react';
import "./App.css";
import "./css/host.css"
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftShort } from "react-bootstrap-icons";
import { generateQuiz } from "./GemeniService";



function Host() {
    console.log(process.env.REACT_APP_GEMINI_API_KEY);


    // All Declearation of Component
    // Host setup Declearation
    const [mode, setMode] = useState("ai");
    const [numQ, setNumQ] = useState(3);
    const [difficulty, setDifficulty] = useState(1);
    const levels = ["Easy", "Medium", "Hard"];
    const [name, setName] = useState("");
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [questions, setQuestions] = useState([
        {
            question: "",
            options: ["", "", "", ""],
            correctAnswers: []
        }
    ]);
    const navigate = useNavigate();
    const location = useLocation()
    // for the space background
    useEffect(() => {
        if (location.pathname !== "/host") return;
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

    function handleQuestionChange(index, value) {

        const updated = [...questions];

        updated[index].question = value;

        setQuestions(updated);
    }


    function handleCorrectAnswer(qIndex, optIndex) {

        const updated = [...questions];

        if (
            updated[qIndex].correctAnswers.includes(optIndex)
        ) {

            updated[qIndex].correctAnswers =
                updated[qIndex].correctAnswers.filter(
                    item => item !== optIndex
                );

        } else {

            updated[qIndex].correctAnswers.push(optIndex);
        }

        setQuestions(updated);
    }

    function addQuestion() {

        setQuestions([
            ...questions,
            {
                question: "",
                options: ["", "", "", ""],
                correctAnswers: []
            }
        ]);
    }
    function handleOptionChange(qIndex, optIndex, value) {

        const updated = [...questions];

        updated[qIndex].options[optIndex] = value;

        setQuestions(updated);
    }

    async function fetchAIQuestions() {
        if (!topic.trim()) {
            setErr("Enter a quiz topic");
            return;
        }

        try {
            setLoading(true);
            setErr("");

            const generatedQuestions = await generateQuiz(
                topic,
                numQ,
                levels[difficulty - 1]
            );
            navigate("/lobby", {
                state: {
                    hostName: name,
                    topic,
                    questions: generatedQuestions,
                },
            });

        } catch (error) {
            console.error(error);

            setErr(
                "Failed to generate questions. Please try again or check console for more."
            );
        } finally {
            setLoading(false);
        }
    }
    async function handleCreate() {
        if (!name.trim()) {
            setErr("Enter your name");
            return;
        }

        setErr("");

        if (mode === "manual") {

            for (let i = 0; i < questions.length; i++) {

                const q = questions[i];

                if (!q.question.trim()) {
                    setErr(`Question ${i + 1} is empty`);
                    return;
                }

                const filledOptions =
                    q.options.filter(opt => opt.trim());

                if (filledOptions.length < 2) {
                    setErr(
                        `Question ${i + 1} needs at least 2 options`
                    );
                    return;
                }

                if (q.correctAnswers.length === 0) {
                    setErr(
                        `Select a correct answer for Question ${i + 1}`
                    );
                    return;
                }
            }

            navigate("/lobby", {
                state: {
                    hostName: name,
                    topic: "Custom Quiz",
                    questions
                }
            });

            return;
        }

        await fetchAIQuestions();
    }
// throw new Error("Testing Error Boundary");

    return (
        <>

            <div className="stars" id="stars"></div>
            <div className="container d-flex justify-content-center flex-column p-lg-5 p-3 m-lg-5 m-0">
                <div className='align-items-start'>
                    <Link to='/'
                        className="btn back-btn d-flex align-items-center gap-2 border border-2 text-white rounded-pill"
                    >
                        <span> <ArrowLeftShort size={24} /></span>
                        <span className=""> Go Back</span>
                    </Link>
                </div>
                <div className="mt-5 position-relative start-5">
                    <div className="modal-content text-white rounded-4 p-lg-5 p-3">
                        <div className="modal-header d-flex flex-column align-items-start justify-content-start border-bottom-0">
                            <h2 className="modal-title fw-Syne text-center text-lg-start ">Host Setup</h2>
                            <p className='text-secondary fs-6'>AI will Help to Generate your quiz questions</p>
                        </div>
                        <div className="modal-body py-0 mb-3">
                            <div className="row flex-column g-3">

                                <div className="col-12">
                                    <label htmlFor="firstName" className="form-label text-secondary">
                                        Host Name
                                    </label>

                                    <input
                                        type="text"
                                        className="host-field fs-6 py-3 px-4 w-100 focus-ring-0"
                                        id="firstName"
                                        placeholder="John Smith, etc.."
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>

                                <div className="col-12">

                                    <div className="d-flex gap-2 mb-3">

                                        <button
                                            type="button"
                                            className={`btn ${mode === "ai"
                                                ? "btn-primary"
                                                : "btn-outline-primary"}`}

                                            onClick={() => setMode("ai")}
                                        >
                                            AI Generated
                                        </button>

                                        <button
                                            type="button"
                                            className={`btn ${mode === "manual"
                                                ? "btn-primary"
                                                : "btn-outline-primary"}`}

                                            onClick={() => setMode("manual")}
                                        >
                                            Create Manually
                                        </button>

                                    </div>

                                    {mode === "ai" ? (
                                        <>
                                            <label
                                                htmlFor="topic"
                                                className="form-label text-secondary"
                                            >
                                                Quiz Topic
                                            </label>

                                            <input
                                                type="text"
                                                className="host-field fs-6 py-3 px-4 w-100 focus-ring-0"
                                                id="topic"
                                                placeholder="Social Sciences, Foreign affairs, etc.."
                                                value={topic}
                                                onChange={e => setTopic(e.target.value)}
                                            />

                                            <div className="mt-3">
                                                {/* Number of Questions */}
                                                <label className="fs-6 text-secondary mb-2 d-block">
                                                    NUMBER OF QUESTIONS —
                                                    <strong className="text-primary"> {numQ}</strong>
                                                </label>

                                                <input
                                                    type="range"
                                                    min={3}
                                                    max={10}
                                                    step={1}
                                                    value={numQ}
                                                    className="w-100"
                                                    onChange={(e) => setNumQ(Number(e.target.value))}
                                                />

                                                {/* Difficulty Level */}
                                                <label className="fs-6 text-secondary mb-2 d-block mt-3">
                                                    PROFICIENCY LEVEL —
                                                    <strong className="text-primary"> {levels[difficulty - 1]}</strong>
                                                </label>

                                                <input
                                                    type="range"
                                                    min={1}
                                                    max={3}
                                                    step={1}
                                                    value={difficulty}
                                                    className="w-100"
                                                    onChange={(e) => setDifficulty(Number(e.target.value))}
                                                />

                                                {/* Optional labels under slider */}
                                                <div className="d-flex justify-content-between text-muted small mt-1">
                                                    <span>Easy</span>
                                                    <span>Medium</span>
                                                    <span>Hard</span>
                                                </div>
                                            </div>

                                        </>
                                    ) : (
                                        <>
                                            <h3 className='text-primary text-center fs-5 m-0 p-0 mt-5'>
                                                Question Builder
                                            </h3>

                                            <p className='fs-6 text-secondary text-center text-wrap'>
                                                Architect your Quiz Board, Enter the question text and define potential answers
                                            </p>

                                            {questions.map((q, qIndex) => (

                                                <div
                                                    key={qIndex}
                                                    className="border rounded-4 p-3 mt-4"
                                                >

                                                    <label className="form-label">
                                                        Question {qIndex + 1}
                                                    </label>

                                                    <textarea
                                                        rows="4"
                                                        className="form-control border-dark p-4"
                                                        placeholder="Enter your question"
                                                        value={q.question}
                                                        onChange={(e) =>
                                                            handleQuestionChange(
                                                                qIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <div className="options d-flex flex-column gap-3 mt-4">

                                                        {q.options.map((opt, optIndex) => (

                                                            <label
                                                                key={optIndex}
                                                                className='d-flex align-items-center gap-2 test-option w-100 p-3 text-white text-start border-0 px-4'
                                                            >

                                                                <input
                                                                    type='checkbox'
                                                                    checked={q.correctAnswers.includes(optIndex)}
                                                                    onChange={() =>
                                                                        handleCorrectAnswer(
                                                                            qIndex,
                                                                            optIndex
                                                                        )
                                                                    }
                                                                />

                                                                <input
                                                                    className="test-option border-0 w-100 text-white"
                                                                    placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                                                                    value={opt}
                                                                    onChange={(e) =>
                                                                        handleOptionChange(
                                                                            qIndex,
                                                                            optIndex,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />

                                                            </label>

                                                        ))}

                                                    </div>

                                                </div>

                                            ))}

                                            <button
                                                type="button"
                                                className="btn btn-outline-primary mt-4 w-100"
                                                onClick={addQuestion}
                                            >
                                                + Add Question
                                            </button>

                                            <h5 className='mt-lg-2 mt-3 fs-6 text-center'>
                                                Tap the checkbox for declaring a correct answer 😬!
                                            </h5>
                                        </>
                                    )}

                                </div>

                            </div>
                        </div>
                        <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                            {err && <div className="text-danger fs-6">{err}</div>}
                            <button className="btn btn-primary fs-6 mt-1 p-3 rounded-5" onClick={handleCreate} disabled={loading} >

                                {loading ? "🤖 Generating questions..." : "✨ Create Quiz"}


                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Host;
