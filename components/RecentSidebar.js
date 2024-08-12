import Link from "next/link";

const RecentSidebar = ({ Page, PageSlug, RelData, Slug, siteUrl, slugName="slug", Title="title" }) => {

    const currUrl = siteUrl && siteUrl.replace("/_s", "");

    return (

        <div className='blog-side-bar'>
            <div className='siderbar-item item-1'>
                <div className='sidebar-title'>
                    <h4>Share {Page} post</h4>
                </div>
                <div className='sidebar-content'>
                    {/* Social share links */}

                    <ul className='social-share'>
                        <li>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${currUrl}/${Slug}`} target='_blank'>
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                        </li>
                        <li>
                            <a href={`https://twitter.com/intent/tweet?url=${currUrl}/${Slug}`} target='_blank'>
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href={`https://www.linkedin.com/shareArticle?url=${currUrl}/${Slug}`} target='_blank'>
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </li>
                    </ul>

                </div>
            </div>

            <div className='siderbar-item item-2'>
                <div className='sidebar-content'>
                    <ul className='similar-posts'>
                        {RelData && RelData.map(item => (
                            <li key={item.id}>
                                <Link className="d-block" href={`/${PageSlug}/${item?.attributes?.[slugName]}`}>
                                    {item?.attributes?.[Title]}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default RecentSidebar;
