import React from 'react';
import "../styles/counsellor-filters.css"
import ServiceFilter from "./ServiceFilter"
import LanguageFilter from "./LanguageFilter"
import HourlyRateSlider from './HourlyRateSlider';
import GenderRadioButtons from './GenderRadioButtons';
import YearsOfExperienceSlider from './YearsOfExperienceSlider';

function CounsellorFilters() {

  return (
  
    <form className="counsellor-filters">
      <div className="service-filter">
        <ServiceFilter />
      </div>
      <div className="language-filter">
        <LanguageFilter />
      </div>
      <div className="gender">
        <GenderRadioButtons />
      </div>
      <div className="years-of-experience">
        <YearsOfExperienceSlider />
      </div>
      <div className="hourly-rate">
        <HourlyRateSlider />
      </div>
    </form>
  )} 

export default CounsellorFilters
  

