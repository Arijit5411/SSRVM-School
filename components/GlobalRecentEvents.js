import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GlobalRecentEvents = () => {
    const [recentPosts, setRecentPosts] = useState([]);
    const isProduction = process.env.NODE_ENV === "production";

    const siteUrl = isProduction
        ? process.env.REACT_APP_MAIN_SSRVM_SITE_URL
        : process.env.REACT_APP_LOCAL_SSRVM_SITE_URL;

    const GlobalSiteUrl = "https://globalstrapiapi.ssrvmtrust.org.in"

    useEffect(() => {
        fetch(`${GlobalSiteUrl}/api/global-events?_limit=3&_sort=createdAt:desc`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("API Response:", data); // Log the API response for debugging
                if (data.error) {
                    console.error("Error:", data.error.message);
                } else if (data.data) {
                    const sortedBlogs = data.data.sort(
                        (a, b) => new Date(b.attributes.date) - new Date(a.attributes.date)
                    );
                    // Use slice to limit to the first three recent posts
                    setRecentPosts(
                        sortedBlogs.slice(0, 3).map(post => ({ ...post.attributes, id: post.id })));

                }
            })
            .catch((error) => {
                console.error("Fetch Error:", error);
            });
    }, []);
    console.log("Recent Posts:", recentPosts);

    return (
        <div className="blog-side-bar">
            <div className="siderbar-item item-1">
                <div className="sidebar-title">
                    <h4>Share Event post</h4>
                </div>
                <div className="sidebar-content">
                    {/* Social share links */}

                    <ul className="social-share">
                        <li>
                            <a href="" target="_blank">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                        </li>
                        <li>
                            <a href="" target="_blank">
                                <i class="fa-brands fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="" target="_blank">
                                <i class="fa-brands fa-linkedin-in"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="siderbar-item item-2">
                <div className="sidebar-content">
                    <ul className="similar-posts">
                        {recentPosts.map((post) => (
                            <li key={post.id}>
                                <Link to={`/global-individual-events/${post.id}`}>{post.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GlobalRecentEvents;
