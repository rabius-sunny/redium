import moment from "moment";
import Helmet from 'react-helmet'
import ReactHtmlParser from 'react-html-parser'
import Spinner from "../others/Spinner";


export default function SinglePost({ post }) {
    console.log(post);

    return post.userName !== undefined ? <div className="home__posts__holder">
        <Helmet>
            <title>{post.title} | Redium</title>
            <meta property="og:title" content={` ${post.title} | Redium`} />
            <meta property="og:description" content={post.body.slice(0, 150)} />
            <meta property="og:url" content={`https://redium.herokuapp.com/detail-post/${post.slug}`} />
            <meta property="og:image" content={post.image} />
        </Helmet>
        <div className="home__posts detail__post">
            <div className="home__posts__header ps-1">
                <div className="avatar"><span className="avatarText">{post.userName[0]}</span></div>
                <div className="home__posts__header__info">
                    <p className="name">{post.userName}</p>
                    <p className="time">{moment(post.updatedAt).format('MMM Do YY')} at {moment(post.updatedAt).format('h:mm a')}</p>
                </div>
            </div>
            <div className="home__posts__image">
                <img src={`/images/${post.image}`} alt="thumbnail" />
            </div>
            <p className="title"><strong>{post.title.toUpperCase()}</strong></p>
            <p className="post p-1">{ReactHtmlParser(post.body)}</p>
        </div>
    </div> : <Spinner />
}
