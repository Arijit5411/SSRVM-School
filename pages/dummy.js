import React, { useEffect, useState } from 'react';

const Dummy = () => {
  const data = [
    {
      award_name: "Reading Competition May 2024",
      award_type: "school award",
      year: "year 2024",
    },
    {
      award_name: "Reading Competition June 2024",
      award_type: "individual award",
      year: "year 2024",
    },
    {
      award_name: "Reading Competition January 2023",
      award_type: "individual award",
      year: "year 2023",
    },
    {
      award_name: "Reading Competition December 2022 Best",
      award_type: "individual award",
      year: "year 2022",
    },
    {
      award_name: "Reading Competition May 2020 New Award",
      award_type: "school award",
      year: "year 2020",
    },
    {
      award_name: "Reading Competition February 2020",
      award_type: "school award",
      year: "year 2020",
    },
  ];

  const extractYear = (yearString) => parseInt(yearString.replace("year ", ""), 10);

  const latestYear = Math.max(...data.map(award => extractYear(award.year)));
  const latestYearAwards = data.filter(award => extractYear(award.year) === latestYear);
  const initialAwardType = latestYearAwards.length > 0 ? latestYearAwards[0].award_type : 'individual award';

  const [awardTypeFilter, setAwardTypeFilter] = useState(initialAwardType);
  const [yearFilter, setYearFilter] = useState(latestYear);

  const filteredData = data.filter(
    (award) => award.award_type === awardTypeFilter && extractYear(award.year) === yearFilter
  );

  const uniqueAwardTypes = [...new Set(data.map(award => award.award_type))];
  const uniqueYears = [
    ...new Set(data.filter(award => award.award_type === awardTypeFilter).map(award => extractYear(award.year)))
  ];

  // Update yearFilter to a valid year if the current yearFilter is no longer available
  useEffect(() => {
    if (!uniqueYears.includes(yearFilter)) {
      setYearFilter(uniqueYears[0]);
    }
  }, [awardTypeFilter, uniqueYears]);


  

  return (
    <div>
      <div>
        <label>
          Award Type:
          <select value={awardTypeFilter} onChange={(e) => setAwardTypeFilter(e.target.value)}>
            {uniqueAwardTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Year:
          <select value={yearFilter} onChange={(e) => setYearFilter(Number(e.target.value))}>
            {uniqueYears.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ul>
        {filteredData.map((award, index) => (
          <li key={index}>
            {award.award_name} - {award.award_type} - {award.year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dummy;


// import React, { useEffect, useState } from 'react';

// const Dummy = () => {
//   const data = [
//     {
//       award_name: "Reading Competition May 2024",
//       award_type: "school award",
//       year: "year 2024",
//     },
//     {
//       award_name: "Reading Competition June 2024",
//       award_type: "individual award",
//       year: "year 2024",
//     },
//     {
//       award_name: "Reading Competition January 2023",
//       award_type: "individual award",
//       year: "year 2023",
//     },
//     {
//       award_name: "Reading Competition December 2022 Best",
//       award_type: "individual award",
//       year: "year 2022",
//     },
//     {
//       award_name: "Reading Competition May 2020 New Award",
//       award_type: "school award",
//       year: "year 2020",
//     },
//     {
//       award_name: "Reading Competition February 2020",
//       award_type: "school award",
//       year: "year 2020",
//     },
//   ];

//   const latestYear = Math.max(...data.map(award => award.year));
//   const latestYearAwards = data.filter(award => award.year === latestYear);
//   const initialAwardType = latestYearAwards.length > 0 ? latestYearAwards[0].award_type : 'individual award';

//   const [awardTypeFilter, setAwardTypeFilter] = useState(initialAwardType);
//   const [yearFilter, setYearFilter] = useState(latestYear);

//   const filteredData = data.filter(
//     (award) => award.award_type === awardTypeFilter && award.year === yearFilter
//   );

//   const uniqueAwardTypes = [...new Set(data.map(award => award.award_type))];
//   const uniqueYears = [
//     ...new Set(data.filter(award => award.award_type === awardTypeFilter).map(award => award.year))
//   ];

//   // Update yearFilter to a valid year if the current yearFilter is no longer available
//   useEffect(() => {
//     if (!uniqueYears.includes(yearFilter)) {
//       setYearFilter(uniqueYears[0]);
//     }
//   }, [awardTypeFilter, uniqueYears]);

//   return (
//     <div>
//       <div>
//         <label>
//           Award Type:
//           <select value={awardTypeFilter} onChange={(e) => setAwardTypeFilter(e.target.value)}>
//             {uniqueAwardTypes.map((type, index) => (
//               <option key={index} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Year:
//"year //  "         <select value={yearFilter} onChange={(e) => setYearFilter(Number(e.target.value))}>
//             {uniqueYears.map((year, index) => (
//               <option key={index} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>
//       <ul>
//         {filteredData.map((award, index) => (
//           <li key={index}>
//             {award.award_name} - {award.award_type} - {award.year}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Dummy;
