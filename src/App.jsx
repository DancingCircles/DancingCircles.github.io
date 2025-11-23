import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PlanningSection from './components/PlanningSection';
import MottoSection from './components/MottoSection';

import CollagePage1 from './components/CollagePage1';
import CollagePage2 from './components/CollagePage2';

import AgencySection from './components/AgencySection';
import BlankPage from './components/BlankPage';
import EmptyPage from './components/EmptyPage';

import CustomScrollbar from './components/CustomScrollbar';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
      <div className="App">
        <CustomCursor />
        <CustomScrollbar />
        <Header />
        <main>
          <HeroSection />
          <PlanningSection />
          <MottoSection />
          <CollagePage1 />
          <CollagePage2 />


          <BlankPage />
          <EmptyPage />
          <AgencySection />
        </main>
      </div>
    </SmoothScroll>
  );
}

export default App;
