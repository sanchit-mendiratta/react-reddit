import React from "react";
import { Post } from "./Post";

export const Favorites = props => {
  return (
    <React.Fragment>
      <h2 className="header">Favorites</h2>
      <ol className="posts">
        {props.data.map(item => (
          <Post post={item} {...props} panel={"fav"} />
        ))}
      </ol>
    </React.Fragment>
  );
};
