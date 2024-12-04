import Link from "next/link";


const GlobalRecentBlogs = ({ recentBlogs, siteUrl }) => {

    // console.log("tgreee", recentBlogs)
    const currUrl = siteUrl && siteUrl.replace("/_s", "");

    return (

        <div className='blog-side-bar'>
            <div className='siderbar-item item-1'>
                <div className='sidebar-title'>
                    <h4>Share blog post</h4>
                </div>
                <div className='sidebar-content'>
                    {/* Social share links */}

                    <ul className='social-share'>
                        <li>
                            <Link href='#' target='_blank'>
                                <i className="fa-brands fa-facebook-f"></i>
                            </Link>
                        </li>
                        <li>
                            <Link href='#' target='_blank'>
                                <i className="fa-brands fa-twitter"></i>
                            </Link>
                        </li>
                        <li>
                            <Link href='#' target='_blank'>
                                <i className="fa-brands fa-linkedin-in"></i>
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>

            <div className='siderbar-item item-2'>
                <div className='sidebar-content'>
                    <ul className='similar-posts'>
                        {recentBlogs && recentBlogs.map(post => (
                            <li key={post.id}>
                                <Link href={`/global-individual-blogs/${post?.attributes?.slug}`} target='_blank'>
                                    {post?.attributes?.Title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default GlobalRecentBlogs;
