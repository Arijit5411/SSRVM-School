import React from 'react';

const Seo = ({ title, metaTitle, metaDescription }) => {
  // Set the document title based on the 'title' prop
  document.title = title;

  // Create a meta tag for 'metaTitle' and 'metaDescription'
  const metaTitleTag = <meta name="title" content={metaTitle} />;
  const metaDescriptionTag = <meta name="description" content={metaDescription} />;

  // You can add more meta tags or customize this as needed

  return (
    <head>
      {metaTitleTag}
      {metaDescriptionTag}
      {/* Add more meta tags here if needed */}
    </head>
  );
};

export default Seo;
