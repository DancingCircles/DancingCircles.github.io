import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PlanningSection from './components/PlanningSection';
import MottoSection from './components/MottoSection';
import StatsSection from './components/StatsSection';
import CollagePage1 from './components/CollagePage1';
import CollagePage2 from './components/CollagePage2';
import CollagePage3 from './components/CollagePage3';
import AgencySection from './components/AgencySection';
import BlankPage from './components/BlankPage';
import InFullBloomSection from './components/InFullBloomSection';

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
        <CollagePage3 />
        <StatsSection />
        <BlankPage />
        <AgencySection />
        <InFullBloomSection />
      </main>
    </div>
  );
}

export default App;
