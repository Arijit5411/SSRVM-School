import { Fragment, useState } from "react";
import Seo from "@/components/Seo";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { determineStrapiUrl } from "@/utils/strapiUtils";
import Image from "next/image";

export async function getServerSideProps(context) {
  const siteUrl = determineStrapiUrl(context);

  const [categoriesRes, seoRes] = await Promise.all([
    fetch(
      `${siteUrl}/api/blog-categories?sort=id:desc&populate=deep,10`
    ),
    fetch(`${siteUrl}/api/seo?populate=deep,10`),
  ]);

  const data = await categoriesRes.json();
  const SeoData = await seoRes.json();

  return {
    props: {
      blgCats: data?.data || [],
      SeoData: SeoData?.data?.attributes?.Pages || null,
      siteUrl,
    },
  };
}

function Blog({ blgCats, SeoData, siteUrl }) {
  const [visibleBlogs, setVisibleBlogs] = useState(
    blgCats.reduce((acc, category) => {
      acc[category.id] = 3;
      return acc;
    }, {})
  );

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

  const renderBlogs = (blog, categoryId) => {
    const visibleCount = visibleBlogs[categoryId] || 3;
    const totalBlogs = blog.length;
    const visibleItems = blog
      .sort((a, b) => b.id - a.id)
      .slice(0, visibleCount);

    // const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "";

    return (
      <>
        <div className="row">
          {visibleItems.map((item) => {

            const imageUrl = item?.attributes?.image?.data?.attributes?.url
              ? `${siteUrl}${item.attributes.image.data.attributes.url}`
              : "/default.jpg";

            return (
              <div className="col-md-4 mb-4" key={item?.id}>
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
            <button
              className="def-btn"
              onClick={() => handleLoadMore(categoryId, totalBlogs)}
            >
              Load More
            </button>
          )}

          {visibleCount > 3 && visibleCount >= totalBlogs && (
            <button
              className="def-btn"
              onClick={() => handleShowLess(categoryId)}
            >
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
        <div className="" style={{ padding: "160px 0 60px 0" }}>
          <section className="section section-p13s1 position-relative">
            <div className="container position-relative zi-3">
              <div className="section-title">
                <h1 className="fs-50 fs-lg-80 fw-700 color-1 text-capitalize">
                  Blog
                </h1>
              </div>

              {blgCats.map((category) => {
                const blogData =
                  category?.attributes?.blog?.data ||
                  category?.attributes?.blogs?.data;

                return (
                  <div className="blogs-wrap mt-5 mt-lg-5" key={category.id}>
                    <div className="sub-title">
                      <h4 className="fs-30 fs-md-34 fs-lg-38 fw-700 color-1">
                        {category?.attributes?.Title}
                      </h4>
                    </div>

                    {Array.isArray(blogData) && blogData.length > 0 ? (
                      <div className="p13s1-slider-f1 norm-3">
                        {renderBlogs(blogData, category.id)}
                      </div>
                    ) : (
                      <p className="text-muted">No blogs available in this category.</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
        <Footer siteUrl={siteUrl} />
      </Fragment>
    </>
  );
}

export default Blog;
