import React, { useEffect, useState } from 'react';
import unilogo from '../../Assets/uni-logo.jpg';
import { Helmet } from 'react-helmet';


const ReadingGuides = () => {
    const [ArabicLevel, setArabicLevel] = useState('');
    const [ArabicGrade, setArabicGrade] = useState('');
    const [UserName, setUserName] = useState('');

    // Fetch Arabic level and grade from localStorage on component mount
    useEffect(() => {
        localStorage.removeItem("subject");
        localStorage.removeItem("success");
        localStorage.removeItem("userId");

        const storedArabicLevel = localStorage.getItem("Arabic_Level") || "غير محدد";
        const storedArabicGrade = localStorage.getItem("Arabic_grade") || "غير متوفر";
        const storedUserName = localStorage.getItem("userName") || "غير متوفر";

        setArabicLevel(storedArabicLevel);
        setArabicGrade(storedArabicGrade);
        setUserName(storedUserName);
    }, []);

    

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>التوجيه التعليمي</title>
            </Helmet>
            <div className="container py-5" dir="rtl" style={{ maxWidth: '1000px' }} id="reading-guides-content">
                {/* Header Section */}
                <header className="text-center mb-5">
                    <img
                        src={unilogo}
                        alt="كلية التربية جامعة حلوان"
                        className="mb-3"
                        style={{ width: '80px', height: 'auto' }}
                    />
                    <h1 className="text-primary mb-3">التوجيه التعليمي لذوي صعوبات التعلم</h1>
                    <h3 className="text-secondary">(خاص بصعوبات تعلم القراءة)</h3>
                    <p className="mt-3">إعداد: ياسمين خالد عبدالمنعم</p>
                </header>

                {/* Main Instructions */}
                <section className="card mb-4 shadow">
                    <div className="card-body">
                        <h2 className="card-title text-primary mb-4">مستوى الطالب في القراءة</h2>
                        <p className="alert alert-info">
                            تلميذك لديه <strong>{ArabicLevel}</strong> في القراءة و حصل علي درجة <strong>{ArabicGrade}</strong>
                        </p>
                    </div>
                </section>

                {/* Instructions Section */}
                <section className="card mb-4 shadow">
                    <div className="card-body">
                        <h2 className="card-title text-primary mb-4">تعليمات</h2>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                عزيزي المُعلّم مرفق إليك مجموعة من التوجيهات التعليمية التي تساعدك في التعامل مع تلميذك من ذوي صعوبات تعلم القراءة.
                            </li>
                            <li className="list-group-item">
                                المطلوب من سيادتكم الاستعانة بها في تقديم التوجيه التعليمي المناسب.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Important Notes Section */}
                <section className="card mb-4 shadow">
                    <div className="card-body">
                        <h2 className="card-title text-primary mb-4">ملاحظات هامة</h2>
                        <div className="alert alert-warning">
                            <strong>واعلم أنك</strong> أهم دور في العملية التعليمية، مراعاة الفروق الفردية وإدراك نقاط القوة والضعف لدى تلميذك.
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
                        <h2 className="card-title text-primary mb-4">التوجيهات التعليمية الخاصة</h2>

                        <div className="mb-4">
                            <h5 className="text-success">المهارات البصرية والحركية:</h5>
                            <ul className="list-group list-group-flush">
                                {[
                                    'تدريب تتبع الحروف والكلمات بالعين والإصبع',
                                    'تنمية التنسيق بين العين واليد'
                                ].map((item, index) => (
                                    <li key={index} className="list-group-item">{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h5 className="text-success">الأدوات المساعدة:</h5>
                            <ul className="list-group list-group-flush">
                                {[
                                    'استخدام أقلام التظليل والمساطر',
                                    'تحديد الكلمات الهامة بالألوان'
                                ].map((item, index) => (
                                    <li key={index} className="list-group-item">{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h5 className="text-success">استراتيجيات القراءة الفعالة:</h5>
                            <div className="row">
                                {[
                                    { title: 'المهارات الأساسية', items: [
                                        'تقسيم الكلمات إلى مقاطع صوتية',
                                        'التخمين السياقي',
                                        'إعادة قراءة الجمل الصعبة'
                                    ] },
                                    { title: 'القراءة التعبيرية', items: [
                                        'القراءة بصوت عالٍ مع التعبير',
                                        'تصحيح الأخطاء بلطف'
                                    ] },
                                    { title: 'التفاعل مع النص', items: [
                                        'الأسئلة التحليلية',
                                        'مشاركة الآراء حول النص'
                                    ] },
                                    { title: 'استراتيجيات عامة', items: [
                                        'البدء من المعروف إلى المجهول',
                                        'استخدام الصور التوضيحية',
                                        'تقسيم النصوص الطويلة'
                                    ] }
                                ].map((category, index) => (
                                    <div key={index} className="col-md-6 mb-3">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h6 className="card-subtitle mb-2 text-muted">{category.title}</h6>
                                                <ul className="list-unstyled">
                                                    {category.items.map((item, i) => (
                                                        <li key={i}>✓ {item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h5 className="text-success">أنشطة تعليمية:</h5>
                            <div className="row">
                                {[
                                    { title: 'ألعاب الوعي الصوتي', items: [
                                        'تقطيع الكلمات',
                                        'تخمين الكلمات',
                                        'اللعب بالأحرف'
                                    ] },
                                    { title: 'القراءة الجماعية', items: [
                                        'القراءة بالتناوب',
                                        'القراءة الجهرية'
                                    ] },
                                    { title: 'الكتابة الإبداعية', items: [
                                        'إكمال القصص',
                                        'كتابة اليوميات'
                                    ] },
                                    { title: 'التكنولوجيا', items: [
                                        'البرامج التعليمية',
                                        'الكتب الصوتية'
                                    ] }
                                ].map((category, index) => (
                                    <div key={index} className="col-md-6 mb-3">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h6 className="card-subtitle mb-2 text-muted">{category.title}</h6>
                                                <ul className="list-unstyled">
                                                    {category.items.map((item, i) => (
                                                        <li key={i}>✓ {item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h5 className="text-success">الأنشطة الحركية:</h5>
                            <ul className="list-group list-group-flush">
                                {[
                                    'تمارين تحريك الأصابع أثناء القراءة',
                                    'ألعاب حركية لتعزيز المفردات'
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

export default ReadingGuides;