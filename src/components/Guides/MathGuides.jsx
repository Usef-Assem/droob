import React, { useEffect, useState } from 'react';
import unilogo from '../../Assets/uni-logo.jpg';
import { Helmet } from 'react-helmet';


const MathGuides = () => {
  const [mathLevel, setMathLevel] = useState('');
  const [mathGrade, setMathGrade] = useState('');
  const [UserName, setUserName] = useState('');

 
  useEffect(() => {
    localStorage.removeItem("subject");
    localStorage.removeItem("success");
    localStorage.removeItem("userId");

    const storedMathLevel = localStorage.getItem("Math_Level") || "غير محدد";
    const storedMathGrade = localStorage.getItem("Math_grade") || "غير متوفر";
    const storedUserName = localStorage.getItem("userName") || "غير متوفر";

    setMathLevel(storedMathLevel);
    setMathGrade(storedMathGrade);
    setUserName(storedUserName);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>التوجيه التعليمي</title>
      </Helmet>
      <div className="container py-5" dir="rtl" style={{ maxWidth: '1000px' }} id="math-guides-content">
        {/* Header Section */}
        <header className="text-center mb-5">
          <img
            src={unilogo}
            alt="كلية التربية جامعة حلوان"
            className="mb-3"
            style={{ width: '80px', height: 'auto' }}
          />
          <h1 className="text-primary mb-3">التوجيه التعليمي لذوي صعوبات التعلم</h1>
          <h3 className="text-secondary">(خاص بصعوبات تعلم الحساب)</h3>
          <p className="mt-3">إعداد: ياسمين خالد عبدالمنعم</p>
        </header>

        {/* Main Instructions */}
        <section className="card mb-4 shadow">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">مستوى الطالب في الحساب</h2>
            <p className="alert alert-info">
              تلميذك لديه <strong>{mathLevel}</strong> في الحساب و حصل علي درجة <strong>{mathGrade}</strong>
            </p>
          </div>
        </section>

        {/* Instructions Section */}
        <section className="card mb-4 shadow">
          <div className="card-body">
            <h2 className="card-title text-primary mb-4">تعليمات</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                عزيزي المُعلّم مرفق إليك مجموعة من التوجيهات التعليمية التي تساعدك في التعامل مع تلميذك من ذوي صعوبات تعلم الحساب.
              </li>
              <li className="list-group-item">
                المطلوب من سيادتكم الاستعانة بها في تقديم التوجيه التعليمي المناسب.
              </li>
              <li className="list-group-item">
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
              <h5 className="text-success">استراتيجيات عامة:</h5>
              <ul className="list-group list-group-flush">
                {[
                  'البدء بالمحسوسات (المكعبات، العملات)',
                  'التدريب المتكرر مع تمارين متنوعة',
                  'الربط بالحياة اليومية',
                  'التشجيع الإيجابي',
                  'التعلم التعاوني'
                ].map((item, index) => (
                  <li key={index} className="list-group-item">{item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h5 className="text-success">أنشطة تعليمية:</h5>
              <div className="row">
                {[
                  { title: 'الألعاب التعليمية', items: ['دومينو الأرقام', 'السلم والثعبان'] },
                  { title: 'الأنشطة الحركية', items: ['القفز على الأرقام', 'تكوين الأشكال'] },
                  { title: 'الأنشطة الفنية', items: ['الرسم بالأرقام', 'صنع نماذج'] },
                  { title: 'التكنولوجية', items: ['التطبيقات التعليمية', 'الألعاب الإلكترونية'] }
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
              <h5 className="text-success">صعوبات محددة:</h5>
              {[
                { title: 'القيمة المكانية', solutions: ['استخدام العداد', 'الألواح المرئية'] },
                { title: 'جدول الضرب', solutions: ['بطاقات الضرب', 'الأغاني والقصائد'] },
                { title: 'المسائل اللفظية', solutions: ['رسم المشكلة', 'الكلمات المفتاحية'] }
              ].map((item, index) => (
                <div key={index} className="mb-3">
                  <h6 className="text-info">{item.title}</h6>
                  <ul className="list-group list-group-flush">
                    {item.solutions.map((sol, i) => (
                      <li key={i} className="list-group-item">{sol}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MathGuides;