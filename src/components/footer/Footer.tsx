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
                <h3>You and us</h3>
                <ul>
                    <li><a href="#">Contact us</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Who are we ?</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <img src={tropheeImage} alt="Icon" className="footer-icon" />
                <h3>Current hits</h3>
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
                    <li><a href="/profile">My profile</a></li>
                    <li><a href="#">Our offers</a></li>
                    <li><a href="#">Catalogue</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <img src={balancedImage} alt="Icon" className="footer-icon" />
                <h3>Legal</h3>
                <ul>
                    <li><a href="#">Terms and sales</a></li>
                    <li><a href="/charteDonnées">Data privacy and protection</a></li>
                    <li><a href="#">Legal mentions</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
