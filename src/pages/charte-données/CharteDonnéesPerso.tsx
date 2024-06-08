import React from 'react';
import './CharteDonnéesPerso.css';
import logoImage from './../assets/flixer_logo.jpg';

interface ChartePageProps {}

const ChartePage: React.FC<ChartePageProps> = () => {
    return (
        <div className="charte-container">
            <main className="charte-main">
                <h1>Charte pour la Protection des Données Personnelles</h1>
                <ul className="charte-list">
                    <li id="introduction">
                        <h2>Introduction</h2>
                        <p>
                            Chez <strong>FLIXER</strong>, nous nous engageons à protéger vos données personnelles.
                            Cette charte explique comment nous collectons, utilisons et protégeons vos informations personnelles.
                        </p>
                    </li>
                    <li id="collecte-donnees">
                        <h2>Collecte des Données</h2>
                        <ul className="inner-list">
                            <li>Informations fournies par l'utilisateur: nom, adresse e-mail, numéro de téléphone.</li>
                            <li>Informations collectées automatiquement: adresse IP, type de navigateur, pages visitées.</li>
                            <li>Informations provenant de tiers: réseaux sociaux, partenaires commerciaux.</li>
                        </ul>
                    </li>
                    <li id="utilisation-donnees">
                        <h2>Utilisation des Données</h2>
                        <ul className="inner-list">
                            <li>Fournir nos services et améliorer l'expérience utilisateur.</li>
                            <li>Personnaliser le contenu et les offres promotionnelles.</li>
                            <li>Répondre aux demandes des utilisateurs et assurer le support client.</li>
                            <li>Respecter les obligations légales.</li>
                        </ul>
                    </li>
                    <li id="droits-utilisateurs">
                        <h2>Droits des Utilisateurs</h2>
                        <p>Les utilisateurs disposent des droits suivants concernant leurs données personnelles:</p>
                        <ul className="inner-list">
                            <li>Droit d'accès: obtenir une copie de vos données personnelles.</li>
                            <li>Droit de rectification: corriger toute information inexacte.</li>
                            <li>Droit de suppression: demander la suppression de vos données.</li>
                            <li>Droit d'opposition: s'opposer au traitement de vos données pour des motifs légitimes.</li>
                            <li>Droit à la portabilité: transférer vos données vers un autre prestataire.</li>
                        </ul>
                        <p>
                            Pour exercer ces droits, veuillez nous contacter à l'adresse e-mail:
                            <a href="mailto:protection-donnees@flixer.fr">protection-donnees@flixer.fr</a>.
                        </p>
                    </li>
                    <li id="contact">
                        <h2>Contact</h2>
                        <p>
                            Si vous avez des questions concernant cette charte ou le traitement de vos données personnelles,
                            veuillez nous contacter à l'adresse suivante:
                        </p>
                        <address>
                            <strong>FLIXER</strong><br/>
                            28 Rue Notre Dame des Champs<br/>
                            75006 Paris, France<br/>
                            <a href="mailto:contact@flixer.fr">contact@flixer.fr</a><br/>
                            Tél: +33 1 00 00 00 00
                        </address>
                    </li>
                </ul>
            </main>
        </div>
    );
};

export default ChartePage;
