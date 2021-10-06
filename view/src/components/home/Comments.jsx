import moment from "moment";

export default function Comments({ comments }) {
    console.log(comments);

    return !comments.length ?
        <div>
            <p>No comments</p>
        </div> :
        <div className="comments__holder">
            <hr />
            <h3>Comments</h3>
            <hr />
            {
                comments.map((c, i) => <div className="comments">
                        <div className="avatar" key={i}><span className="avatarText">{c.userName[0]}</span></div>
                        <div className="comment">
                            <p><strong>{c.userName}</strong></p>
                            <p className="time">{moment(c.updatedAt).format('MMM Do YY')} at {moment(c.updatedAt).format('h:mm a')}</p>
                            <p className="text">{c.comment}</p>

                        </div>
                </div>)
            }
        </div>

}
