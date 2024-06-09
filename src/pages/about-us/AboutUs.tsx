import React from 'react';
import './AboutUs.css';

const AboutUs: React.FC = () => {
    return (
        <div className="about-us-container">
            <section>
                <h1>About Us</h1>
                <p>Welcome to Flixer! We are a streaming platform dedicated to offering an unparalleled entertainment experience. Discover our story, our mission, and our passionate team.</p>
            </section>

            <section>
                <h2>Our Story</h2>
                <p>Flixer was founded in 2024 by a team of cinema and technology enthusiasts. Since our beginnings, we have grown to become one of the leading streaming platforms, offering a wide selection of quality films, series, and documentaries.</p>
            </section>

            <section>
                <h2>Our Mission and Vision</h2>
                <p>Our mission is to make the best entertainment accessible to everyone, everywhere, and at any time. We strive to offer an exceptional user experience through innovative features and diverse content. We believe in the future of streaming as the main means of consuming audiovisual content.</p>
            </section>

            <section>
                <h2>Our Values</h2>
                <ul>
                    <li><strong>Innovation:</strong> We constantly seek to improve our platform and introduce new features.</li>
                    <li><strong>Quality:</strong> We offer a selection of high-quality content, carefully curated for our users.</li>
                    <li><strong>Accessibility:</strong> We believe that everyone should have access to quality entertainment.</li>
                    <li><strong>Commitment:</strong> We are dedicated to providing the best customer service and building an engaged community.</li>
                </ul>
            </section>

            <section>
                <h2>Our Team</h2>
                <p>Behind Flixer is a diverse and talented team of professionals from cinema, technology, and customer service. We work together to bring you the best in entertainment.</p>
                <div className="team-members">
                    <div className="member">
                        <div className="circle"></div>
                        <h3>Prasanaa VINGADASSAMY</h3>
                        <p>DevOps Engineer</p>
                    </div>
                    <div className="member">
                        <div className="circle"></div>
                        <h3>Ivan MILOSAVLJEVIC</h3>
                        <p>Full Stack Developer</p>
                    </div>
                    <div className="member">
                        <div className="circle"></div>
                        <h3>Edouard YU</h3>
                        <p>Full Stack Developer</p>
                    </div>
                    <div className="member">
                        <div className="circle"></div>
                        <h3>Gregory Bonneto</h3>
                        <p>Front-End Developer</p>
                    </div>
                </div>
            </section>

            <section>
                <h2>Our Partnerships</h2>
                <p>We collaborate with various studios, independent producers, and content creators to bring you a rich selection of films and series. Our partners share our vision of quality and innovation.</p>
            </section>

            <section>
                <h2>Community Engagement</h2>
                <p>At Flixer, we believe in the importance of giving back to the community. We support various charitable initiatives and educational programs to promote access to culture and education for all.</p>
            </section>
        </div>
    );
};

export default AboutUs;
