import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PlanningSection from './components/PlanningSection';
import MottoSection from './components/MottoSection';
import StatsSection from './components/StatsSection';
import CollagePage1 from './components/CollagePage1';
import CollagePage2 from './components/CollagePage2';

import AgencySection from './components/AgencySection';
import BlankPage from './components/BlankPage';
import EmptyPage from './components/EmptyPage';




function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <PlanningSection />
        <MottoSection />
        <CollagePage1 />
        <CollagePage2 />

        <StatsSection />
        <BlankPage />
        <EmptyPage />
        <AgencySection />
      </main>
    </div>
  );
}

export default App;
