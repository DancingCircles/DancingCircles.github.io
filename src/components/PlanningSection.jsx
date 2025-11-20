import React from 'react';
import './PlanningSection.css';

const PlanningSection = () => {
    return (
        <section className="planning-section">
            <div className="container">
                <h2 className="planning-title">HOW TO GET TO HAWAII?</h2>

                <div className="cards-container">
                    {/* Card 1 */}
                    <div className="info-card">
                        <div className="card-badge">1</div>
                        <h3 className="card-title">CHOOSE AN ISLAND</h3>
                        <ul className="card-list">
                            <li>Oaxy</li>
                            <li>Maui</li>
                            <li>Big Island of Hawaii</li>
                            <li>Kauai</li>
                            <li>Lanai</li>
                            <li>Molokai</li>
                        </ul>
                    </div>

                    {/* Card 2 */}
                    <div className="info-card">
                        <div className="card-badge">2</div>
                        <h3 className="card-title">FIND A HOTEL</h3>
                        <ul className="card-list">
                            <li>Meet & Transfer</li>
                            <li>Island Selection</li>
                            <li>Hotels</li>
                            <li>Tour Packages (flight+hotel)</li>
                            <li>Cruises</li>
                            <li>Ready-made Programs</li>
                            <li>Special Offers</li>
                        </ul>
                    </div>

                    {/* Card 3 */}
                    <div className="info-card">
                        <div className="card-badge">3</div>
                        <h3 className="card-title">BOOK EXCURSIONS</h3>
                        <ul className="card-list">
                            <li>Excursions</li>
                            <li>Adventures</li>
                            <li>Restaurants</li>
                            <li>Literature & Cinema</li>
                            <li>Photo Gallery</li>
                            <li>Q&A</li>
                            <li>Wedding in Hawaii</li>
                            <li>Island News</li>
                        </ul>
                    </div>
                </div>
            </div>

            <img src="/assets/tree.png" alt="Tree Decoration" className="deco-tree" />
        </section>
    );
};

export default PlanningSection;
