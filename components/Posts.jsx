import React from "react";
import { Post } from "./Post";
import { Toolbar } from "./Toolbar";

export const Posts = props => {
  return (
    <React.Fragment>
      <h2 className="header">Posts</h2>
      <Toolbar {...props} />
      {props.error && <div className="error">{props.error}</div>}
      <ol className="posts">
        {props.data.map(item => (
          <Post key={item.id} post={item} {...props} />
        ))}
      </ol>
    </React.Fragment>
  );
};
