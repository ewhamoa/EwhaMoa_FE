import { Link } from 'react-router-dom';

export function PostItem({ postId, title, text, createdAt, due, link }) {
  return (
    <div id="post-item">
      <div className="badge">
        <p>D-{due}</p>
      </div>
      <div className="align-column">
        <img src={`/club-img/${postId}`} alt={`${postId}`} />
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="align-row">
          <p>{createdAt}</p>
          <Link to={`${link}`} target="_blank">
            <button>지원하기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
