import React from "react";

export const Post = props => {
  return (
    <li key={props.post.id} className="post">
      <a href={props.post.url}>{props.post.title}</a>
      <span>▲</span>
      <span className="ups">{props.post.ups}</span>
      <span
        className={props.post.fav ? (props.panel == "fav" ? "cross" : "favorite") : "star"}
        onClick={e => props.markFavourite(props.post.id)}
      />
    </li>
  );
};
