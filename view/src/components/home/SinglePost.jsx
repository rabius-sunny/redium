import moment from "moment";
import Spinner from "../others/Spinner";
import ReactHtmlParser from 'react-html-parser'


export default function SinglePost({ post }) {

    return !post.title ? <Spinner loading={true} /> :
        <div className="home__posts__holder">
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
        </div>
}
