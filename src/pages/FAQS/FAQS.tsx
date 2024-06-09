import React, { useState } from 'react';
import './FAQS.css';

const FAQs: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        { question: "Q1: What is Flixer?", answer: "Flixer is an online streaming platform that offers a vast library of movies, TV series, documentaries, and exclusive shows. We are committed to providing an exceptional viewing experience with personalized recommendations and interactive features." },
        { question: "Q2: How can I sign up for Flixer?", answer: "To sign up, go to our homepage and click on 'Sign Up'. Follow the instructions to create an account using your email address or via social media." },
        { question: "Q3: Can I download content to watch offline?", answer: "Yes, with Flixer, you can download your favorite content to watch without an Internet connection. This feature is available on our mobile and tablet apps." },
        { question: "Q4: How does Flixer's recommendation system work?", answer: "Our system uses artificial intelligence algorithms to analyze your viewing habits and suggest personalized content based on your tastes and preferences." },
        { question: "Q5: How do I manage my account and profile settings?", answer: "Log in to your Flixer account, then go to the 'Profile' section to update your personal information, manage your payment settings, and configure your family's profiles." },
        { question: "Q6: How can I contact Flixer customer support?", answer: "If you have any questions or need assistance, you can contact our customer support team via: Email: support@flixer.com" },
        { question: "Q7: Does Flixer offer content in foreign languages and subtitles?", answer: "Yes, Flixer offers a wide selection of content in different languages with subtitle and dubbing options for an optimal viewing experience." }
    ];

    return (
        <section>
            <h2 className="title">FAQs</h2>
            {faqData.map((faq, index) => (
                <div className={`faq ${activeIndex === index ? 'active' : ''}`} key={index} onClick={() => toggleFAQ(index)}>
                    <div className="question">
                        <h3>{faq.question}</h3>
                        <svg width="15" height="10" viewBox="0 0 42 25">
                            <path
                                d="M3 3L21 21L39 3"
                                stroke="white"
                                strokeWidth="7"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    {activeIndex === index && (
                        <div className="answer">
                            <p>{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};

export default FAQs;
