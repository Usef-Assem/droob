import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Helmet } from "react-helmet";

const MainExam = () => {
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [submissionLoading, setSubmissionLoading] = useState(false); // Loading state for submission
  const [error, setError] = useState(null);
  const [submissionError, setSubmissionError] = useState("");
  const [userId] = useState(localStorage.getItem("userId")); // Global variable for userId
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    localStorage.removeItem("success");
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://doroob.info/public/api/${userId}/base_exam`);
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("فشل تحميل البيانات. يرجى تسجيل بيانات الطالب اولا.");
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);
  

  const handleAnswerChange = (base_exam_id, questionIndex, value) => {
    setAnswers((prev) => {
      const existingAnswer = prev.find(
        (answer) =>
          answer.base_exam_id === base_exam_id && answer.questionIndex === questionIndex
      );
      if (existingAnswer) {
        return prev.map((answer) =>
          answer.base_exam_id === base_exam_id && answer.questionIndex === questionIndex
            ? { ...answer, answer: value }
            : answer
        );
      }
      return [...prev, { base_exam_id, answer: value }];
    });
  };

  const handleSubmit = async () => {
    const allQuestions = data.flatMap((section) =>
      section.Exam.map((exam, index) => ({
        base_exam_id: exam.base_exam_id,
        questionIndex: index,
      }))
    );

    const isAllAnswered = allQuestions.every((question) =>
      answers.some((answer) => answer.base_exam_id === question.base_exam_id)
    );

    if (!isAllAnswered) {
      setSubmissionError("يرجى الإجابة على جميع الأسئلة قبل الإرسال.");
      return;
    }

    setSubmissionError("");
    setSubmissionLoading(true);

    try {
      console.log("Answers:", answers);
      const response = await axios.post(
        `https://doroob.info/public/api/${userId}/base_exam`,
        { answers }
      );
      console.log(answers);
      console.log("Response:", response.data);
      console.log("Response:", response.data.data);
      localStorage.setItem('subject', response.data.data)
      alert("تم إرسال الإجابات بنجاح برجاء اعطاء الجهاز للطالب");
      navigate("/IQExam");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionError("فشل إرسال الإجابات. يرجى المحاولة مرة أخرى.");
    } finally {
      setSubmissionLoading(false); // Hide loading after submission completes
    }
  };

  if (loading) return <p className="text-center fs-4 py-5">... جاري التحميل</p>;
  if (error) return <p className="text-danger text-center py-5">{error}</p>;

  let questionNumber = 1;

  return <>
        <Helmet>
      <meta charSet="utf-8" />
      <title>الامتحان الاساسي</title>
    </Helmet>
    <div className="min-vh-100 bg-light py-3">
      <h1 className="text-center">بطاقة الملاحظة للمعلم</h1>
      <div className="p-4" dir="rtl">
        {data.map((section) => (
          <div key={section.id} className="mb-5">
            {section.Exam.map((exam, index) => (
              <div key={index} className="mb-5">
                <p className=" mb-3 fs-5">
                  {`${questionNumber++}. ${exam.question}`}
                </p>
                <div className="d-flex gap-5 me-3">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`${exam.base_exam_id}-${index}`}
                        value="true"
                        onChange={() =>
                          handleAnswerChange(exam.base_exam_id, index, true)
                        }
                        required
                      />
                      صح
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`${exam.base_exam_id}-${index}`}
                        value="false"
                        onChange={() =>
                          handleAnswerChange(exam.base_exam_id, index, false)
                        }
                        required
                      />
                      خطأ
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        {submissionError && (
          <p className="text-danger py-3">{submissionError}</p>
        )}
        <button
          onClick={handleSubmit}
          className="px-4 py-2 btn btn-primary"
          disabled={submissionLoading} // Disable button when submitting
        >
          {submissionLoading ? "جاري الإرسال..." : "إرسال"}
        </button>
      </div>
    </div>
    </>;
};

export default MainExam;
