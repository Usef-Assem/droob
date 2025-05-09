import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

// Utility function to make text between quotes bold
const formatTextWithBoldQuotes = (text) => {
  return text.replace(/"(.*?)"/g, '<strong>$1</strong>');
};

function ReadingExam() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();
  const isSuccess = localStorage.getItem("success") === "true";

  // Fetch data from the API
  useEffect(() => {
    if (!isSuccess) {
      setError("يجب إكمال امتحان الذكاء بنجاح أولاً.");
      setLoading(false);
      return;
    }

    const fetchExams = async () => {
      try {
        const response = await axios.get("https://doroob.info/public/api/exams");
        console.log(response.data.data);
        setExams(response.data.data); // Set the exams data
      } catch (err) {
        console.error(err);
        setError("فشل في جلب بيانات الامتحانات. يرجى المحاولة مرة أخرى لاحقًا.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [isSuccess]);

  // Initialize selectedAnswers state
  useEffect(() => {
    if (exams.length > 0) {
      const initialAnswers = {};
      exams.forEach((exam) => {
        exam.questions.forEach((question) => {
          if (question.type === "ordering") {
            // For ordering questions, initialize with the correct order of answer IDs
            initialAnswers[question.id] = question.answers.map((a) => a.id);
          } else {
            // For other question types, initialize as undefined
            initialAnswers[question.id] = undefined;
          }
        });
      });
      setSelectedAnswers(initialAnswers);
    }
  }, [exams]);

  // Handle answer selection for MCQ and True/False questions
  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  // Handle reordering for ordering questions
  const moveAnswer = (questionId, currentIndex, direction) => {
    setSelectedAnswers((prev) => {
      const newOrder = [...prev[questionId]];
      const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

      // Swap the current answer with the one above or below
      [newOrder[currentIndex], newOrder[newIndex]] = [
        newOrder[newIndex],
        newOrder[currentIndex],
      ];

      return { ...prev, [questionId]: newOrder };
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Prepare the submissions object
    const submissions = {
      exams: exams.map((exam) => {
        const answers = {};

        exam.questions.forEach((question) => {
          if (question.type === "passage") {
            // For passage questions, include nested questions' answers directly
            question.questions?.forEach((nestedQuestion) => {
              answers[nestedQuestion.id] = selectedAnswers[nestedQuestion.id];
            });
          } else {
            // For non-passage questions, add the answer directly
            answers[question.id] = selectedAnswers[question.id];
          }
        });

        return {
          exam_id: exam.id,
          answers: answers,
        };
      }),
    };

    console.log("Submissions:", JSON.stringify(submissions, null, 2));

    try {
      const userId = localStorage.getItem("userId"); // Replace with actual user ID logic
      const response = await axios.post(
        `https://doroob.info/public/api/exam/correct/${userId}`,
        submissions
      );
      console.log(response.data);
      localStorage.setItem('Arabic_Level' , response.data['Arabic_Level '])
      localStorage.setItem('Arabic_grade' , response.data.Arabic_grade)

      if (response.status === 200) {
        alert("تم إرسال الإجابات بنجاح يرجي تسليم الجهاز للمعلم!");
      } else {
        alert("حدث خطأ أثناء إرسال الإجابات. حاول مرة أخرى.");
      }
      if(localStorage.getItem('subject') === 'arabic and math'){
          navigate("/UnifiedGuides");
      } else {
            navigate("/ReadingGuides");
      }
    } catch (error) {
      console.error(error);
      alert("فشل في الاتصال بالخادم. حاول مرة أخرى لاحقًا.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" dir="rtl">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center m-5" dir="rtl">
        {error}
      </div>
    );
  }

  return <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>امتحان القراءة</title>
  </Helmet>
    <div className="bg-light min-vh-100 py-5" dir="rtl">
      <div className="container">
        {exams.map((exam) => (
          <div key={exam.id} className="card shadow-sm mb-5">
            <div className="card-header bg-primary text-white text-end">
              <h3 className="card-title mb-0">{exam.name}</h3>
            </div>
            <div className="card-body">
              {exam.questions.map((question, index) => (
                <div key={question.id} className="mb-5">
                  <div className="d-flex align-items-center mb-3 text-end">
                    <span className="badge bg-secondary fs-6 ms-3">{index + 1}</span>
                    <p
                      className="mb-0 text-dark fs-5"
                      dangerouslySetInnerHTML={{
                        __html: formatTextWithBoldQuotes(question.text),
                      }}
                    />
                  </div>

                  {question.image && (
                    <div className="text-center mb-4">
                      <img
                        src={question.image}
                        alt="صورة السؤال"
                        className="img-fluid rounded shadow-sm"
                        style={{ maxWidth: "25%", height: "auto", maxHeight: "400px" }}
                      />
                    </div>
                  )}

                  {question.type === "mcq" && (
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
                                  src={answer.image}
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

                  {question.type === "true_false" && (
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
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "ordering" && (
                    <div className="col-12">
                      {selectedAnswers[question.id]?.map((answerId, index) => {
                        const answer = question.answers.find((a) => a.id === answerId);
                        return (
                          <div
                            key={answerId}
                            className="d-flex align-items-center mb-3 p-3 bg-white rounded shadow-sm"
                          >
                            <span className="flex-grow-1 fs-4 me-3">{answer.text}</span>
                            <button
                              className="btn btn-outline-primary btn-sm ms-2"
                              onClick={() => moveAnswer(question.id, index, "up")}
                              disabled={index === 0}
                            >
                              ↑
                            </button>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => moveAnswer(question.id, index, "down")}
                              disabled={index === selectedAnswers[question.id].length - 1}
                            >
                              ↓
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-5">
          <button
            onClick={handleSubmit}
            className="btn btn-primary btn-lg px-5"
          >
            إرسال الإجابات
          </button>
        </div>
      </div>
    </div>
  ;
</>
}

export default ReadingExam;