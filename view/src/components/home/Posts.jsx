import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser'
import { homePosts } from '../../redux/async/Post';
import Pagination from '../../utils/Pagination';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Spinner from '../others/Spinner'

export default function Posts() {

    let { page } = useParams();
    if (page === undefined) {
        page = 1;
    }
    const { loading } = useSelector((state) => state.Post);
    const { posts, count, perPage } = useSelector((state) => state.FetchPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(homePosts(page));
    }, [dispatch, page]);
    console.log(posts)
    return (
        <div className="home__posts__holder">
            {loading && <Spinner loading={loading} />}
            {!loading &&
                posts.map((post, i) => <div className="home__posts" key={i}>
                    <div className="home__posts__header">
                        <div className="avatar"><AccountCircleIcon fontSize="large" color="primary"/></div>
                        <div className="home__posts__header__info">
                            <p className="name">{post.userName}</p>
                            <p className="time">{moment(post.updatedAt).format('MMM Do YY')}</p>
                        </div>
                    </div>
                    <p className="title"><strong>{post.title}</strong></p>
                    <p className="post">{ReactHtmlParser(post.body.slice(0, 150))}...See more</p>
                    <div className="home__posts__image">
                        <img src={`/images/${post.image}`} alt="thumbnail" />
                    </div>
                </div>)
            }
            <Pagination
                path='posts'
                page={page}
                perPage={perPage}
                count={count}
            />
        </div>
    )
}
