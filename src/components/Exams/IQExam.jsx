import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet";

function IQExam() {
  const [examData, setExamData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIQExamData = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`https://doroob.info/public/api/${userId}/exam`);
        setExamData(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
        setError("خطأ في تحميل البيانات. يرجى الانتهاء من الامتحان الاساسي اولا.");
      } finally {
        setLoading(false);
      }
    };
    fetchIQExamData();
  }, []);

  useEffect(() => {
    if (examData && examData.questions) {
      const allAnswered = examData.questions.every(question => {
        return selectedAnswers[question.id] !== undefined;
      });
      setAllQuestionsAnswered(allAnswered);
    }
  }, [selectedAnswers, examData]);

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleSubmit = async () => {
    if (!allQuestionsAnswered) {
      Swal.fire({
        icon: "error",
        text: "Please answer all questions before submitting.",
      });
      return;
    }

    const userId = localStorage.getItem("userId");
    const examId = examData ? examData.id : null;

    if (!examId || !userId) {
      Swal.fire({
        icon: "error",
        text: "يجب امتحان الامتحان الاساسي اولا",
      });
      return;
    }

    const submissions = {
      answers: Object.keys(selectedAnswers).reduce((acc, questionId) => {
        const qId = parseInt(questionId);
        const answerValue = selectedAnswers[qId];
        acc[qId] = answerValue;
        return acc;
      }, {}),
    };

    try {
      const response = await axios.post(
        `https://doroob.info/public/api/exam/intelli-correct/${userId}`,
        submissions
      );
      console.log(response.data);
      console.log(submissions);

      if (response.data.message === "intelli correction done") {
        localStorage.setItem("success", "true");
        toast.success('تم تسليم الاجابات بنجاح'); 
      } else {
        Swal.fire({
          text: "خطأ في تسليم الاجابات يرجي المحاولة مرة اخري",
          icon: "error",
        });
      }

      if(localStorage.getItem('subject') === "arabic and math"){
        navigate("/MathExam");}

        else if(localStorage.getItem('subject') === "arabic"){
          navigate("/ReadingExam");
        }

        else if(localStorage.getItem('subject') === "math"){
          navigate("/MathExam");}
        
          else {navigate("/")}
      
    } catch (error) {
      console.log(error);
      
      Swal.fire({
        text: "Failed to connect to the server. Please try again later.",
        icon: "error",
      });
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100" dir="rtl">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger text-center m-5" dir="rtl">
      {error}
    </div>
  );

  if (!examData) return null; // Return null if examData is not yet available

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>IQ Exam</title>
      </Helmet>
      <div className="bg-light min-vh-100 py-5" dir="rtl">
        <div className="container">
          <div className="card shadow-sm mb-5">
            <div className="card-header bg-primary text-white text-end">
              <h3 className="card-title mb-0">{examData.name}</h3>
            </div>

            <div className="card-body">
              {examData.questions.map((question, index) => (
                <div key={question.id} className="mb-5">
                  <div className="d-flex align-items-center mb-3 text-end">
                    <span className="badge bg-secondary fs-6 ms-3">{index + 1}</span>
                    <h5 className="fw-bold mb-0 text-dark">{question.text}</h5>
                  </div>

                  {question.image && (
                    <div className="text-center mb-4">
                      <img
                        src={`${question.image}`}
                        alt="Question Image"
                        className="img-fluid rounded shadow-sm"
                        style={{ maxWidth: "25%", height: "auto", maxHeight: "400px" }}
                      />
                    </div>
                  )}

                  <div className="row g-3">
                    {question.answers.map((answer) => (
                      <div key={answer.id} className="col-12 col-md-6">
                        <div className="form-check p-3 border rounded bg-white text-end">
                          <input
                            type="radio"
                            className="form-check-input ms-2"
                            name={`question_${question.id}`}
                            id={`answer_${answer.id}`}
                            style={{ transform: "scale(1.3)", float: "right" }}
                            onChange={() => handleAnswerSelect(question.id, answer.id)}
                            checked={selectedAnswers[question.id] === answer.id}
                          />
                          <label
                            htmlFor={`answer_${answer.id}`}
                            className="form-check-label fs-5 d-block"
                          >
                            {answer.text}
                            {answer.image && (
                              <img
                                src={`${answer.image}`}
                                alt="Answer Image"
                                className="img-fluid rounded shadow-sm mt-2"
                                style={{ maxWidth: "100%", height: "auto", maxHeight: "200px" }}
                              />
                            )}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-5">
            <button 
              onClick={handleSubmit}
              className="btn btn-primary btn-lg px-5"
              disabled={!allQuestionsAnswered}
            >
              ارسال الاجابات
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default IQExam;