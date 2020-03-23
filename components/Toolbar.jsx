import React from "react";

export const Toolbar = props => {
  return (
    <React.Fragment>
      <span>
        <button className="mr10" onClick={props.fetchMasterData}>
          Home
        </button>
      </span>
      <label>Sort By: </label>
      <select
        className="mr10"
        name="sort"
        onChange={props.selectChange}
        value={props.sortType}
      >
        <option value="hot">Hot</option>
        <option value="ascending">Votes Ascending</option>
        <option value="descending">Votes Descending</option>
      </select>
      <label>Subreddit Search: </label>
      <input
        className="mr10"
        value={props.subreddit}
        onChange={props.subredditChange}
      />
      <button className="mr10" onClick={props.subredditSearch}>
        Submit
      </button>
      {props.undo.length ? (
        <button className="mr10" onClick={props.callUndo}>
          Undo
        </button>
      ) : (
        ""
      )}
      {props.redo.length ? <button onClick={props.callRedo}>Redo</button> : ""}
    </React.Fragment>
  );
};
