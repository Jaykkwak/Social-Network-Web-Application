import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const textRef = useRef("");

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addPost({ text: textRef.current.value }));
          textRef.current.value = "";
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          ref={textRef}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default PostForm;
