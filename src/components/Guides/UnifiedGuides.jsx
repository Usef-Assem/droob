import React, { useEffect, useState } from 'react';
import unilogo from '../../Assets/uni-logo.jpg'; // Adjust the path to your logo
import { Helmet } from 'react-helmet';


const UnidiedGuides = () => {
    const [ArabicLevel, setArabicLevel] = useState('');
    const [ArabicGrade, setArabicGrade] = useState('');
    const [mathLevel, setMathLevel] = useState('');
    const [mathGrade, setMathGrade] = useState('');
    const [UserName, setUserName] = useState('');

    // Fetch Arabic level and grade from localStorage on component mount
    useEffect(() => {
        localStorage.removeItem("subject");
        localStorage.removeItem("success");
        localStorage.removeItem("userId");

        const storedArabicLevel = localStorage.getItem("Arabic_Level") || "غير محدد";
        const storedArabicGrade = localStorage.getItem("Arabic_grade") || "غير متوفر";
        const storedUserName = localStorage.getItem("userName") || "غير متوفر";

        const storedMathLevel = localStorage.getItem("Math_Level") || "غير محدد";
        const storedMathGrade = localStorage.getItem("Math_grade") || "غير متوفر";
    
        setMathLevel(storedMathLevel);
        setMathGrade(storedMathGrade);
        setUserName(storedUserName);

        setArabicLevel(storedArabicLevel);
        setArabicGrade(storedArabicGrade);
    }, []);


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>التوجيه التعليمي</title>
            </Helmet>
            <div className="container py-5" dir="rtl" style={{ maxWidth: '1000px' }} id="educational-guidance-content">
                {/* Header Section */}
                <header className="text-center mb-5">
                    <img
                        src={unilogo}
                        alt="كلية التربية جامعة حلوان"
                        className="mb-3"
                        style={{ width: '80px', height: 'auto' }}
                    />
                    <h1 className="text-primary mb-3">التوجيه التعليمي لذوي صعوبات التعلم</h1>
                    <h3 className="text-secondary">(صعوبات تعلم القراءة والحساب)</h3>
                    <p className="mt-3">إعداد: ياسمين خالد عبدالمنعم</p>
                </header>

                {/* Main Instructions */}
                <section className="card mb-4 shadow">
                    <div className="card-body">
                        <h2 className="card-title text-primary mb-4">مستوى الطالب في القراءة والحساب</h2>
                        <p className="alert alert-info">
                            تلميذك لديه <strong>{ArabicLevel}</strong> في القراءة وحصل على درجة <strong>{ArabicGrade}</strong>.
                        </p>
                        <p className="alert alert-info">
                            تلميذك لديه <strong>{mathLevel}</strong> في الحساب وحصل على درجة <strong>{mathGrade}</strong>.
                        </p>
                    </div>
                </section>

                {/* Instructions Section */}
                <section className="card mb-4 shadow">
                    <div className="card-body">
                        <h2 className="card-title text-primary mb-4">ملاحظات هامة</h2>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                عزيزي المُعلّم إليك مجموعة من التوجيهات التعليمية التي تساعدك في التعامل مع تلميذك من ذوي صعوبات تعلم القراءة والحساب.
                            </li>
                            <li className="list-group-item">
                                المطلوب من سيادتكم الاستعانة بها في تقديم التوجيه التعليمي المناسب لهم.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Important Notes Section */}
                <section className="card mb-4 shadow">
                    <div className="card-body">
                        {/* <h2 className="card-title text-primary mb-4">ملاحظات هامة</h2> */}
                        <div className="alert alert-warning">
                            <strong>عزيزي المعلم</strong> يجب عليك مراعاة الفروق الفردية وإدراك نقاط القوة والضعف لدى تلميذك.
                        </div>
                        <ul className="list-group list-group-flush">
                            {['التدرج', 'التكرار', 'التنوع', 'التشجيع الإيجابي'].map((item, index) => (
                                <li key={index} className="list-group-item">{item}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* General Guidelines Section */}
                <section className="card mb-4 shadow">
                    <div className="card-body">
                        <h2 className="card-title text-primary mb-4">التوجيهات التعليمية العامة</h2>
                        <ul className="list-group list-group-flush">
                            {[
                                'إبعاد المثيرات المشتتة للانتباه',
                                'متابعة مستوى التحصيل الدراسي',
                                'تقديم المكافآت والتشجيع',
                                'أنشطة تعليمية مناسبة',
                                'تعزيز العلاقة بين البيت والمدرسة',
                                'إعداد التقارير الختامية',
                                'التدخل المبكر',
                                'تأسيس نوعية الحياة',
                                'مشاركة مؤسسات المجتمع',
                                'برنامج تعليمي علاجي متدرج',
                                'تدريبات منزلية',
                                'تحديث الأهداف التربوية',
                                'دمج الأنشطة اللغوية',
                                'استخدام استراتيجيات حديثة',
                                'تنويع أساليب التقويم',
                                'مراقبة التطور المستمر',
                                'أساليب تدريس مختلفة'
                            ].map((item, index) => (
                                <li key={index} className="list-group-item">{item}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Specific Guidelines Section */}
                <section className="card mb-4 shadow">
                    <div className="card-body">
                        <h2 className="card-title text-primary mb-4">التوجيهات التعليمية المرتبطة بصعوبات تعلم القراءة و الحساب</h2>

                        {/* Reading Specific Guidelines */}
                        <div className="mb-4">
                            <h5 className="text-success">صعوبات تعلم القراءة:</h5>
                            <ul className="list-group list-group-flush">
                                {[
                                    'تدريب تتبع الحروف والكلمات بالعين والإصبع',
                                    'تنمية التنسيق بين العين واليد',
                                    'استخدام أقلام التظليل والمساطر',
                                    'تحديد الكلمات الهامة بالألوان',
                                    'تقسيم الكلمات إلى مقاطع صوتية',
                                    'التخمين السياقي',
                                    'إعادة قراءة الجمل الصعبة',
                                    'القراءة بصوت عالٍ مع التعبير',
                                    'تصحيح الأخطاء بلطف',
                                    'الأسئلة التحليلية',
                                    'مشاركة الآراء حول النص'
                                ].map((item, index) => (
                                    <li key={index} className="list-group-item">{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Math Specific Guidelines */}
                        <div className="mb-4">
                            <h5 className="text-success">صعوبات تعلم الحساب:</h5>
                            <ul className="list-group list-group-flush">
                                {[
                                    'استخدام الألعاب والأدوات الملموسة',
                                    'التدريب المتكرر على المفاهيم الأساسية',
                                    'ربط المفاهيم بالحياة اليومية',
                                    'التشجيع الإيجابي',
                                    'التعلم التعاوني',
                                    'ألعاب تعليمية مثل الدومينو والسلم والثعبان',
                                    'أنشطة حركية مثل القفز على الأرقام',
                                    'أنشطة فنية مثل الرسم بالأرقام',
                                    'استخدام التطبيقات التعليمية',
                                    'الألعاب الإلكترونية التعليمية'
                                ].map((item, index) => (
                                    <li key={index} className="list-group-item">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default UnidiedGuides;