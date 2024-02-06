import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../utils/formatDate";
import { deleteComment } from "../../actions/post";

const CommentItem = ({ postId, comment }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { _id, text, name, avatar, user, date } = comment;
  console.log(comment);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {formatDate(date)}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => dispatch(deleteComment(postId, _id))}
            type="button"
            className="btn btn-danger"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default CommentItem;
