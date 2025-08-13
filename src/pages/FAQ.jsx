import React, { useState } from 'react';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What is the monthly plan?",
      answer: "STEAMFLIX starts from just ₹999 per month, giving you unlimited access to all content including premium originals, movies, and series."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time with no cancellation fees. Your access will continue until the end of your current billing cycle."
    },
    {
      question: "How many devices can I use with one account?",
      answer: "You can stream on up to 4 devices simultaneously depending on your subscription plan."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 7-day free trial for new users. No charges apply if you cancel before the trial ends."
    },
    {
      question: "Does STEAMFLIX offer 4K content?",
      answer: "Absolutely! Many of our movies and series are available in 4K Ultra HD for the best viewing experience."
    }
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='text-white my-5' style={{ padding: "20px", lineHeight: "1.6" }}>
      <h2 className="mb-4">
        Frequently Asked Questions – <span className="text-danger">STEAMFLIX</span>
      </h2>

      <div className='faq-container'>
        {faqData.map((faq, index) => (
          <div key={index} className='mb-3'>
            <div
              onClick={() => toggleAnswer(index)}
              style={{
                cursor: 'pointer',
                padding: '12px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '5px',
                transition: 'background-color 0.3s'
              }}
            >
              <h5 style={{ margin: 0 }}>{faq.question}</h5>
            </div>

            {openIndex === index && (
              <div
                className='text-secondary mt-2'
                style={{
                  padding: '10px 16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '0 0 5px 5px',
                }}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
