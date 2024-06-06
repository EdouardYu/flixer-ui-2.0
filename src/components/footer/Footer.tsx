import React from 'react';
import './Footer.css'; 
import bousoleImage from "@/assets/boussole.png";
import tropheeImage from "@/assets/trophee-sportif.png";
import silhouetteImage from "@/assets/silhouette.png";
import balancedImage from "@/assets/balance.png";



const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div className="footer-section">
                <img src={silhouetteImage} alt="Icon" className="footer-icon" />
                <h3>Vous et nous</h3>
                <ul>
                    <li><a href="#">Contactez-nous</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Qui sommes-nous ?</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <img src={tropheeImage} alt="Icon" className="footer-icon" />
                <h3>Succès du moment</h3>
                <ul>
                    <li><a href="#">Film n°1</a></li>
                    <li><a href="#">Film n°2</a></li>
                    <li><a href="#">Film n°3</a></li>
                    <li><a href="#">Film n°4</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <img src={bousoleImage} alt="Icon" className="footer-icon" />
                <h3>Navigation</h3>
                <ul>
                    <li><a href="#">Mon profil</a></li>
                    <li><a href="#">Nos offres</a></li>
                    <li><a href="#">Catalogue</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <img src={balancedImage} alt="Icon" className="footer-icon" />
                <h3>Légal</h3>
                <ul>
                    <li><a href="#">Condition générale de vente</a></li>
                    <li><a href="/charteDonnées">Charte pour la protection des données personnelles</a></li>
                    <li><a href="#">Mention légale</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
