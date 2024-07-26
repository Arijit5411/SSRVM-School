import React from 'react';
const GlobalSiteUrl = process.env.GSURL;
const Test3 = ({ events }) => {
  return (
    <div>
        <h1>Hello</h1>
      {/* Render your data here */}
      {events.map(event => (
        <div key={event.id}>
          <h3>{event.attributes.title}</h3>
          <p>{event.attributes.content}</p>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = async () => {
  const ge_res = await fetch(`${GlobalSiteUrl}/api/global-events`);
  const ge_data = await ge_res.json();
  console.log("ge_data", ge_data.data)

  return {
    props: {
      events: ge_data.data,
    },
  };
};

export default Test3;
