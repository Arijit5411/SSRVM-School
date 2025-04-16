import React, { Fragment, useState } from "react";
import Head from "next/head";
import Link from "next/link";


import Seo from "@/components/Seo";
import { determineStrapiUrl } from "@/utils/strapiUtils";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export async function getServerSideProps(context) {
  const siteUrl = determineStrapiUrl(context);

  const [categoriesRes, seoRes, allBlogsRes] = await Promise.all([
    fetch(`${siteUrl}/api/blog-categories?sort=id:desc&populate=deep,10`),
    fetch(`${siteUrl}/api/seo?populate=deep,10`),
    fetch(`${siteUrl}/api/blogs?sort=id:desc&populate=deep,10`),
  ]);

  const categoryData = await categoriesRes.json();
  const SeoData = await seoRes.json();
  const allBlogsData = await allBlogsRes.json();

  const blgCats = categoryData?.data || [];
  const allBlogs = allBlogsData?.data || [];

  // Gather all blog IDs that are categorized
  const categorizedBlogIds = new Set();

  blgCats.forEach((category) => {
    const blogData = category?.attributes?.blog?.data || category?.attributes?.blogs?.data || [];
    blogData.forEach((blog) => {
      categorizedBlogIds.add(blog.id);
    });
  });

  // Filter blogs that are NOT categorized
  const uncategorizedBlogs = allBlogs.filter(blog => !categorizedBlogIds.has(blog.id));

  return {
    props: {
      blgCats,
      SeoData: SeoData?.data?.attributes?.Pages || null,
      uncategorizedBlogs,
      siteUrl,
    },
  };
}

export default function Blog({ blgCats, SeoData, uncategorizedBlogs, siteUrl }) {
  const [visibleBlogs, setVisibleBlogs] = useState(() => {
    const defaultCount = 3;
    const init = {};
    blgCats.forEach((cat) => {
      init[cat.id] = defaultCount;
    });
    init["all"] = defaultCount;
    return init;
  });

  const handleLoadMore = (categoryId, totalBlogs) => {
    setVisibleBlogs((prev) => ({
      ...prev,
      [categoryId]: totalBlogs,
    }));
  };

  const handleShowLess = (categoryId) => {
    setVisibleBlogs((prev) => ({
      ...prev,
      [categoryId]: 3,
    }));
  };

  const renderBlogs = (blogs, categoryId) => {
    const visibleCount = visibleBlogs[categoryId] || 3;
    const totalBlogs = blogs.length;
    const visibleItems = blogs
      .sort((a, b) => b.id - a.id)
      .slice(0, visibleCount);

    return (
      <>
        <div className="row">
          {visibleItems.map((item) => {
            const imageUrl = item?.attributes?.image?.data?.attributes?.url
              ? `${siteUrl}${item.attributes.image.data.attributes.url}`
              : "/default.jpg";

            return (
              <div className="col-md-4 mb-4" key={item.id}>
                <Link href={`/blog/${item?.attributes?.slug}`} className="blog-item">
                  <div className="image-wrap">
                    <img
                      src={imageUrl}
                      alt={item?.attributes?.Title || "Blog Image"}
                    />
                  </div>
                  <div className="content-wrap">
                    <p>{item?.attributes?.Title}</p>
                    <button className="text-muted-news">Read more</button>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-3">
          {visibleCount < totalBlogs && (
            <button className="def-btn" onClick={() => handleLoadMore(categoryId, totalBlogs)}>
              Load More
            </button>
          )}
          {visibleCount > 3 && visibleCount >= totalBlogs && (
            <button className="def-btn" onClick={() => handleShowLess(categoryId)}>
              Show Less
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <Seo SeoData={SeoData} PageSlug={"blog"} />
      <Fragment>
        <NavBar siteUrl={siteUrl} />
        <div className="container" style={{ padding: "160px 0 60px 0" }}>
          <h1 className="principal-mess">Blog</h1>

          {/* Render category-specific blogs */}
          {blgCats?.length > 0 &&
            blgCats
              .filter((category) => {
                const blogData = category?.attributes?.blog?.data || category?.attributes?.blogs?.data || [];
                return Array.isArray(blogData) && blogData.length > 0;
              })
              .map((category) => {
                const blogData = category?.attributes?.blog?.data || category?.attributes?.blogs?.data || [];

                return (
                  <div className="blogs-wrap mt-5 mt-lg-5" key={category.id}>
                    <div className="sub-title">
                      <h4 className="fs-30 fs-md-34 fs-lg-38 fw-700 color-1">
                        {category?.attributes?.Title}
                      </h4>
                    </div>

                    <div className="p13s1-slider-f1 norm-3">
                      {renderBlogs(blogData, category.id)}
                    </div>
                  </div>
                );
              })}


          {/* Always show uncategorized blogs at the end */}
          {uncategorizedBlogs.length > 0 && (
            <div className="blogs-wrap mt-5 mt-lg-5" key="all-blogs">
              <div className="sub-title">
                <h4 className="fs-30 fs-md-34 fs-lg-38 fw-700 color-1">
                  All-Blogs
                </h4>
              </div>
              <div className="p13s1-slider-f1 norm-3">
                {renderBlogs(uncategorizedBlogs, "all")}
              </div>
            </div>
          )}
        </div>
        <Footer siteUrl={siteUrl} />
      </Fragment>


    </>
  );
}
