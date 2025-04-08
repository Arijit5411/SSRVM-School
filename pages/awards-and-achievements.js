// import React, { useEffect, useState } from 'react';
// import { determineStrapiUrl } from "@/utils/strapiUtils";
// import Seo from "@/components/Seo";
// import NavBar from '@/components/NavBar';
// import Footer from '@/components/Footer';

// export const getServerSideProps = async (context) => {
//   try {
//     const siteUrl = determineStrapiUrl(context);
//     const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
//     const res1 = await fetch(
//       `${siteUrl}/api/awards-and-achievements?sort=id:desc&populate=*`
//     );

//     const data = await res.json();
//     const data1 = await res1.json();

//     return {
//       props: {
//         seodata: data?.data?.attributes?.Pages ?? {},
//         awardsData: data1.data ?? [],
//         siteUrl
//       },
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error.message);

//     return {
//       props: {
//         seodata: {},
//         awardsData: [],
//         siteUrl: ""
//       },
//     };
//   }
// };

// const extractYear = (yearString) => parseInt(yearString.replace("year ", ""), 10);

// const AwardAch = ({ seodata, awardsData, siteUrl }) => {
//   const latestYear = Math.max(...awardsData.map(award => extractYear(award.attributes.year)));
//   const latestYearAwards = awardsData.filter(award => extractYear(award.attributes.year) === latestYear);
//   const initialAwardType = latestYearAwards.length > 0 ? latestYearAwards[0].attributes.award_type : 'individual award';

//   const [awardTypeFilter, setAwardTypeFilter] = useState(initialAwardType);
//   const [yearFilter, setYearFilter] = useState(latestYear);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   // Filtered data based on awardTypeFilter and yearFilter
//   const filteredData = awardsData.filter(
//     (award) => award.attributes.award_type === awardTypeFilter && extractYear(award.attributes.year) === yearFilter
//   );

//   useEffect(() => {
//     if (!filteredData.length) {
//       setCurrentPage(1); // Reset to first page when filtered data is empty
//     } else if (currentPage > Math.ceil(filteredData.length / itemsPerPage)) {
//       setCurrentPage(1); // Reset to first page when current page exceeds new total pages
//     }
//   }, [awardTypeFilter, yearFilter, filteredData.length, currentPage]);

//   // Calculate total pages based on filtered data length and items per page
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Slice paginated data based on currentPage and itemsPerPage
//   const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <>
//       <Seo SeoData={seodata} PageSlug={"awards-and-achievements"} />
//       <NavBar siteUrl={siteUrl} />
//       <main>
//         <section className='award-s1'>
//           <div className='container'>
//             <div className='d-md-flex justify-content-between'>
//               <h2 className=''>Awards and Achievements</h2>
//               <div>
//                 <div className='d-flex gap-4'>
//                   <label>
//                     <select value={awardTypeFilter} onChange={(e) => {
//                       setAwardTypeFilter(e.target.value);
//                       setCurrentPage(1); // Reset to first page whenever filters change
//                     }}>
//                       {awardsData.map((award, index) => (
//                         <option key={index} value={award.attributes.award_type}>
//                           {award.attributes.award_type}
//                         </option>
//                       ))}
//                     </select>
//                   </label>
//                   <label>
//                     <select value={yearFilter} onChange={(e) => {
//                       setYearFilter(Number(e.target.value));
//                       setCurrentPage(1); // Reset to first page whenever filters change
//                     }}>
//                       {awardsData.map((award, index) => (
//                         <option key={index} value={extractYear(award.attributes.year)}>
//                           {extractYear(award.attributes.year)}
//                         </option>
//                       ))}
//                     </select>
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div className='d-md-flex flex-wrap award-data-s1 pt-md-5'>
//               {paginatedData.map((award, index) => (
//                 <div key={index} className='col-lg-3'>
//                   <img src={`${siteUrl}${award.attributes.image.data.attributes.url}`} alt={award.attributes.award_name} />

//                   <h6 className='mt-md-4'>
//                     {award.attributes.award_name} - {award.attributes.award_type} - {award.attributes.year}
//                   </h6>
//                   <p className='mt-md-2'>
//                     {award.attributes.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//             <div className='pagination'>
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               >
//                 Previous
//               </button>
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handlePageChange(index + 1)}
//                   className={currentPage === index + 1 ? 'active' : ''}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//               <button
//                 disabled={currentPage === totalPages}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer siteUrl={siteUrl} />
//     </>
//   );
// }

// export default AwardAch;








// import React, { useEffect, useState } from 'react';
// import { determineStrapiUrl } from "@/utils/strapiUtils";
// import Seo from "@/components/Seo";
// import NavBar from '@/components/NavBar';
// import Footer from '@/components/Footer';

// export const getServerSideProps = async (context) => {
//   try {
//     const siteUrl = determineStrapiUrl(context);
//     const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
//     const res1 = await fetch(
//       `${siteUrl}/api/awards-and-achievements?sort=id:desc&populate=*`
//     );

//     const data = await res.json();
//     const data1 = await res1.json();

//     return {
//       props: {
//         seodata: data?.data?.attributes?.Pages ?? {},
//         awardsData: data1.data ?? [],
//         siteUrl
//       },
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error.message);

//     return {
//       props: {
//         seodata: {},
//         awardsData: [],
//         siteUrl: ""
//       },
//     };
//   }
// };

// const extractYear = (yearString) => parseInt(yearString.replace("year ", ""), 10);

// const AwardAch = ({ seodata, awardsData, siteUrl }) => {
//   const latestYear = Math.max(...awardsData.map(award => extractYear(award.attributes.year)));
//   const latestYearAwards = awardsData.filter(award => extractYear(award.attributes.year) === latestYear);
//   const initialAwardType = latestYearAwards.length > 0 ? latestYearAwards[0].attributes.award_type : 'individual award';

//   const [awardTypeFilter, setAwardTypeFilter] = useState(initialAwardType);
//   const [yearFilter, setYearFilter] = useState(latestYear);

//   const filteredData = awardsData.filter(
//     (award) => award.attributes.award_type === awardTypeFilter && extractYear(award.attributes.year) === yearFilter
//   );

//   const uniqueAwardTypes = [...new Set(awardsData.map(award => award.attributes.award_type))];
//   const uniqueYears = [
//     ...new Set(awardsData.filter(award => award.attributes.award_type === awardTypeFilter).map(award => extractYear(award.attributes.year)))
//   ];

//   useEffect(() => {
//     if (!uniqueYears.includes(yearFilter)) {
//       setYearFilter(uniqueYears[0]);
//     }
//   }, [awardTypeFilter, uniqueYears]);

//   return (
//     <>
//       <Seo SeoData={seodata} PageSlug={"awards-and-achievements"} />
//       <NavBar siteUrl={siteUrl} />
//       <main>
//         <section className='award-s1'>
//           <div className='container'>
//             <div className='d-md-flex justify-content-between'>
//               <h2 className=''>Awards and Achievements</h2>
//               <div>
//                 <div className='d-flex gap-4'>
//                   <label>
//                     <select value={awardTypeFilter} onChange={(e) => setAwardTypeFilter(e.target.value)}>
//                       {uniqueAwardTypes.map((type, index) => (
//                         <option key={index} value={type}>
//                           {type}
//                         </option>
//                       ))}
//                     </select>
//                   </label>
//                   <label>
//                     <select value={yearFilter} onChange={(e) => setYearFilter(Number(e.target.value))}>
//                       {uniqueYears.map((year, index) => (
//                         <option key={index} value={year}>
//                           {year}
//                         </option>
//                       ))}
//                     </select>
//                   </label>
//                 </div>
//               </div>
//             </div>
//                 <div className='d-sm-flex flex-wrap award-data-s1 pt-md-5 justify-around'>
//                   {filteredData.map((award, index) => (
//                     <div key={index} className='col-sm-3 col-md-3'>
//                       <img src={`${siteUrl}${award.attributes.image.data.attributes.url}`} alt={award.attributes.award_name} />

//                       <h6 className='mt-4'>
//                         {award.attributes.award_name} - {award.attributes.award_type} - {award.attributes.year}
//                       </h6>
//                       <p className=' mt-2'>
//                         {award.attributes.description}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//           </div>
//         </section>
//       </main>
//       <Footer siteUrl={siteUrl} />
//     </>
//   )
// }

// export default AwardAch;






import React, { useEffect, useState } from 'react';
import { determineStrapiUrl } from "@/utils/strapiUtils";
import Seo from "@/components/Seo";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ModalAward from '@/components/Popups/ModalAward';
import Image from "next/image";

export const getServerSideProps = async (context) => {
  try {
    const siteUrl = determineStrapiUrl(context);
    const res = await fetch(`${siteUrl}/api/seo?populate=deep,10`);
    const res1 = await fetch(
      `${siteUrl}/api/awards-and-achievements?sort=id:desc&populate=*`
    );

    const data = await res.json();
    const data1 = await res1.json();

    return {
      props: {
        seodata: data?.data?.attributes?.Pages ?? {},
        awardsData: data1.data ?? [],
        siteUrl
      },
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: {
        seodata: {},
        awardsData: [],
        siteUrl: ""
      },
    };
  }
};

const extractYear = (yearString) => parseInt(yearString.replace("year ", ""), 10);

const AwardAch = ({ seodata, awardsData, siteUrl }) => {
  const initialPageSize = 8; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [awardTypeFilter, setAwardTypeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  // Filtering logic based on filters
  const filteredData = awardsData.filter(
    (award) => (!awardTypeFilter || award.attributes.award_type === awardTypeFilter) &&
      (!yearFilter || extractYear(award.attributes.year) === yearFilter)
  );

  // Pagination logic
  const pageSize = initialPageSize;
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Calculate data to display based on pagination
  const startIndex = (currentPage - 1) * pageSize;
  const displayedData = filteredData.slice(startIndex, startIndex + pageSize);

  // Unique filter options
  const uniqueAwardTypes = [...new Set(awardsData.map(award => award.attributes.award_type))];
  const uniqueYears = [
    ...new Set(awardsData.filter(award => award.attributes.award_type === awardTypeFilter).map(award => extractYear(award.attributes.year)))
  ];

  // Effect to reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [awardTypeFilter, yearFilter]);


  const scrollTo = () => {
    const section = document.getElementById('section-id');

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const [showModal, setShowModal] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);

  const handleAwardClick = (award) => {
    setSelectedAward({
      award_name: award.attributes.award_name,
      award_type: award.attributes.award_type,
      year: award.attributes.year,
      description: award.attributes.description,
      imageUrl: `${siteUrl}${award.attributes.image.data.attributes.url}`,
    });
    setShowModal(true);
  };



  return (
    <>
      <Seo SeoData={seodata} PageSlug={"awards-and-achievements"} />
      <NavBar siteUrl={siteUrl} />
      <main>
        <section className='award-s1' id='section-id' style={{ backgroundImage: `url('/assets/img/award_bg.jpg')`, width: `100%`, backgroundPosition: 'top-center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
          <div className='container'>
            <div className='d-md-flex justify-content-between mb-4 mb-md-5'>
              <h2 className=''>Awards and Achievements</h2>
              <div className='d-flex justify-content-center justify-content-md-start align-items-center gap-4'>
                <label>
                  <select className='text-capitalize' value={awardTypeFilter} onChange={(e) => setAwardTypeFilter(e.target.value)}>
                    <option value="">All Types</option>
                    {uniqueAwardTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <select value={yearFilter} onChange={(e) => setYearFilter(Number(e.target.value))}>
                    <option value="">All Years</option>
                    {uniqueYears.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <div className='row g-4 award-data-s1 justify-around'>
              {displayedData.map((award, index) => (
                <div key={index} className='col-sm-3 cursor-pointer col-md-3' onClick={() => handleAwardClick(award)}>
                  <Image width={304} height={382} src={`${siteUrl}${award.attributes.image.data.attributes.url}`} alt={award.attributes.award_name} />

                  <h6 className='mt-4'>
                    {award.attributes.award_name} - {award.attributes.award_type} - {award.attributes.year}
                  </h6>
                  {/* <p className=' mt-2'>
                    {award.attributes.description}
                  </p> */}
                </div>
              ))}
            </div>

            <ModalAward showModal={showModal} setShowModal={setShowModal} award={selectedAward} />

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="pagination d-flex justify-content-center align-items-center gap-4">
                <button
                  className={`${currentPage === 1 ? 'btn-disabled' : ''} page-btn-d2`}
                  onClick={() => { scrollTo(); setCurrentPage(currentPage - 1); }}
                >
                  <i className="fa-solid fa-arrow-left-long"></i>
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  className={`${currentPage === totalPages ? 'btn-disabled' : ''} page-btn-d2`}
                  onClick={() => { scrollTo(); setCurrentPage(currentPage + 1); }}
                >
                  <i className="fa-solid fa-arrow-right-long"></i>
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer siteUrl={siteUrl} />
    </>
  )
}

export default AwardAch;
