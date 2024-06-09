import React from 'react';
import './CharteDonnéesPerso.css';

interface ChartePageProps {}

const ChartePage: React.FC<ChartePageProps> = () => {
    return (
        <div className="charte-container">
            <main className="charte-main">
                <h1>Personal Data Protection Charter</h1>
                <ul className="charte-list">
                    <li id="introduction">
                        <h2>Introduction</h2>
                        <p>
                            At <strong>FLIXER</strong>, we are committed to protecting your personal data.
                            This charter explains how we collect, use, and protect your personal information.
                        </p>
                    </li>
                    <li id="data-collection">
                        <h2>Data Collection</h2>
                        <ul className="inner-list">
                            <li>Information provided by the user: name, email address, phone number.</li>
                            <li>Information collected automatically: IP address, browser type, pages visited.</li>
                            <li>Information from third parties: social networks, business partners.</li>
                        </ul>
                    </li>
                    <li id="data-usage">
                        <h2>Data Usage</h2>
                        <ul className="inner-list">
                            <li>Provide our services and improve user experience.</li>
                            <li>Personalize content and promotional offers.</li>
                            <li>Respond to user requests and provide customer support.</li>
                            <li>Comply with legal obligations.</li>
                        </ul>
                    </li>
                    <li id="user-rights">
                        <h2>User Rights</h2>
                        <p>Users have the following rights regarding their personal data:</p>
                        <ul className="inner-list">
                            <li>Right of access: obtain a copy of your personal data.</li>
                            <li>Right to rectification: correct any inaccurate information.</li>
                            <li>Right to erasure: request the deletion of your data.</li>
                            <li>Right to object: object to the processing of your data on legitimate grounds.</li>
                            <li>Right to data portability: transfer your data to another provider.</li>
                        </ul>
                        <p>
                            To exercise these rights, please contact us at the email address:
                            <a href="mailto:protection-donnees@flixer.fr">protection-donnees@flixer.fr</a>.
                        </p>
                    </li>
                    <li id="contact">
                        <h2>Contact</h2>
                        <p>
                            If you have any questions regarding this charter or the processing of your personal data,
                            please contact us at the following address:
                        </p>
                        <address>
                            <strong>FLIXER</strong><br/>
                            28 Rue Notre Dame des Champs<br/>
                            75006 Paris, France<br/>
                            <a href="mailto:contact@flixer.fr">contact@flixer.fr</a><br/>
                            Tel: +33 1 00 00 00 00
                        </address>
                    </li>
                </ul>
            </main>
        </div>
    );
};

export default ChartePage;
