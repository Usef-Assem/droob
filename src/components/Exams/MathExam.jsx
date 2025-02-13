import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
function MathExam() {
  const [secondExamData, setSecondExamData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [examSubject, setExamSubject] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if success is true in localStorage
    const isSuccess = localStorage.getItem("success") === "true";
    if (!isSuccess) {
      setError("يجب إكمال الامتحان الأول بنجاح أولاً.");
      setLoading(false);
      return;
    }
    const userId = localStorage.getItem("userId");
    if (userId) {
      const fetchSecondExamData = async () => {
        try {
          const response = await axios.get(
            `https://doroob.info/public/api/${userId}/Math-exam`
          );
          console.log(response.data); // Log the full response
          setExamSubject(response.data.data.subject.name);
          setSecondExamData(response.data.data); // Set the exam data
        } catch (err) {
          console.log(err);
          setError("فشل في جلب بيانات الامتحان الثاني. حاول مرة أخرى لاحقًا.");
        } finally {
          setLoading(false);
        }
      };
      fetchSecondExamData();
    } else {
      setError("لا توجد بيانات امتحان أساسي. يرجى إكمال الامتحان الرئيسي أولاً.");
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (secondExamData && secondExamData.questions) {
      const initialAnswers = {};
      secondExamData.questions.forEach(question => {
        if (question.type === 'ordering') {
          initialAnswers[question.id] = question.answers.map(a => a.id);
        } else if (question.type === 'mcq') {
          initialAnswers[question.id] = undefined;
        }
      });
      setSelectedAnswers(prev => ({ ...prev, ...initialAnswers }));
    }
  }, [secondExamData]);
  useEffect(() => {
    if (secondExamData && secondExamData.questions) {
      const allAnswered = secondExamData.questions
        .filter(question => question.type === 'mcq' || question.type === 'ordering')
        .every(question => {
          const answer = selectedAnswers[question.id];
          if (question.type === 'ordering') {
            return Array.isArray(answer) && answer.length === question.answers.length;
          }
          return answer !== undefined;
        });
      setAllQuestionsAnswered(allAnswered);
    }
  }, [selectedAnswers, secondExamData]);
  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };
  const moveAnswer = (questionId, currentIndex, direction) => {
    setSelectedAnswers(prev => {
      const newOrder = [...prev[questionId]];
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      [newOrder[currentIndex], newOrder[newIndex]] = [newOrder[newIndex], newOrder[currentIndex]];
      return { ...prev, [questionId]: newOrder };
    });
  };
  const handleSubmit = async () => {
    if (!allQuestionsAnswered) {
      Swal.fire({
        icon: "error",
        text: "يرجي الاجابة علي جميع الاسئلة قبل الارسال",
      });
      return;
    }
    const userId = localStorage.getItem("userId");
    const examId = secondExamData ? secondExamData.id : null;
    if (!examId || !userId) {
      Swal.fire({
        icon: "error",
        text: "حدث خطأ أثناء تجهيز البيانات. يرجى المحاولة لاحقًا.",
      });
      return;
    }
    const submissions = {
      exam_id: examId,
      answers: secondExamData.questions.reduce((acc, question) => {
        if (question.type === 'mcq' || question.type === 'ordering') {
          acc[question.id] = selectedAnswers[question.id];
        }
        return acc;
      }, {})
    };
    try {
      console.log(submissions);
      const response = await axios.post(
        `https://doroob.info/public/api/exam/Math-correct/${userId}`,
        submissions
      );
      console.log(response.data);
      localStorage.setItem('Math_Level' , response.data['Math_Level '])
      localStorage.setItem('Math_grade' , response.data.Math_grade)
      
      if (response.data.message === "Math correction done") {
        {localStorage.getItem('subject') !== 'arabic and math' && alert("تم إرسال الإجابات بنجاح يرجي تسليم الجهاز للمعلم")}
      } else {
        Swal.fire({
          text: "حدث خطأ أثناء إرسال الإجابات. حاول مرة أخرى.",
          icon: "error",
        });
      }
      if(localStorage.getItem('subject') === 'arabic and math') {
        navigate("/ReadingExam");
      } 
      else if(localStorage.getItem('subject') === 'arabic' || localStorage.getItem('subject') === 'math') {
        navigate("/MathGuides");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "فشل في الاتصال بالخادم. حاول مرة أخرى لاحقًا.",
        icon: "error",
      });
    }
  };
  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100" dir="rtl">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">جاري التحميل...</span>
      </div>
    </div>
  );
  if (error) return (
    <div className="alert alert-danger text-center m-5" dir="rtl">
      {error}
    </div>
  );
  if (!secondExamData) return null; // Return null if exam data is not yet available
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>امتحان الحساب</title>
      </Helmet>
      <div className="bg-light min-vh-100 py-5" dir="rtl">
        <div className="container">
          <div className="card shadow-sm mb-5">
            <div className="card-header bg-primary text-white text-end">
              <h3 className="card-title mb-0">{secondExamData.name}</h3>
            </div>
            <div className="card-body">
              {secondExamData.questions
                .filter(question => question.type === 'mcq' || question.type === 'ordering')
                .map((question, index) => (
                  <div key={question.id} className="mb-5">
                    <div className="d-flex align-items-center mb-3 text-end">
                      <span className="badge bg-secondary fs-6 ms-3">{index + 1}</span>
                      <h5 className="fw-bold mb-0 text-dark">{question.text}</h5>
                    </div>
                    {question.image && (
                      <div className="text-center mb-4">
                        <img
                          src={`${question.image}`}
                          alt="صورة السؤال"
                          className="img-fluid rounded shadow-sm"
                          style={{ maxWidth: "25%", height: "auto", maxHeight: "400px" }}
                        />
                      </div>
                    )}
                    {question.type === 'ordering' ? (
                      <div className="col-12">
                        {selectedAnswers[question.id]?.map((answerId, index) => {
                          const answer = question.answers.find(a => a.id === answerId);
                          return (
                            <div key={answerId} className="d-flex align-items-center mb-3 p-3 bg-white rounded shadow-sm">
                              <span className="flex-grow-1 fs-4 me-3">{answer.text}</span>
                              <button
                                className="btn btn-outline-primary btn-sm ms-2"
                                onClick={() => moveAnswer(question.id, index, 'up')}
                                disabled={index === 0}
                              >
                                ↑
                              </button>
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => moveAnswer(question.id, index, 'down')}
                                disabled={index === selectedAnswers[question.id].length - 1}
                              >
                                ↓
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
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
                                    alt="صورة الإجابة"
                                    className="img-fluid rounded shadow-sm mt-2"
                                    style={{ maxWidth: "100%", height: "auto", maxHeight: "200px" }}
                                  />
                                )}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
              إرسال الإجابات
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default MathExam;
