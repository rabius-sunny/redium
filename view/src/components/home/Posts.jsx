import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { homePosts } from '../../redux/async/Post';
import Pagination from '../../utils/Pagination';

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

    return (
        <div>
            {
                posts.map((post, i) => <div style={{ borderBottom: '2px solid white', margin: '10px 0', padding: '10px 0' }} key={i}>
                    <h5>{post.userName}</h5>
                    <p>{moment(post.updatedAt).format('MMM Do YY')}</p>
                    <p>{post.title}</p>
                </div>)
            }
            <Pagination
                path='home'
                page={page}
                perPage={perPage}
                count={count}
            />
        </div>
    )
}
