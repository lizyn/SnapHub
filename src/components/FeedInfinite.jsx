import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { useEffect } from 'react';
// import Feed from './Feed';

// function FeedInfinite() {
//   const style = {
//     height: 30,
//     border: '1px solid green',
//     margin: 6,
//     padding: 8
//   };
//   const [items, setItems] = useState(Array.from({ length: 20 }));
//   const [hasMore, setHasMore] = useState(true);

//   const fetchMoreData = () => {
//     if (items.length >= 500) {
//       setHasMore(false);
//       return;
//     }
//     // a fake async api call like which sends 20 more records in .5 secs
//     setTimeout(() => {
//       setItems(items.concat(Array.from({ length: 20 })));
//     }, 500);
//   };

function FeedInfinite(props) {
  FeedInfinite.propTypes = {
    feeds: PropTypes.arrayOf(PropTypes.element).isRequired
  };

  const { feeds } = props;
  const [items, setItems] = useState(feeds.slice(0, 2));
  // console.log(feeds);
  // console.log(items);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setHasMore(items.length < feeds.length);
    // if (items.length < 1) {
    setItems(feeds.slice(0, 2));
    // }
  }, [feeds.length]);

  // useEffect(() => {
  //   fetchData();
  //   fetchUserData();
  //   setInterval(() => {
  //     fetchData();
  //     fetchUserData();
  //   }, 3000);
  // }, []);

  const fetchMoreData = () => {
    if (items.length >= feeds.length) {
      // console.log(1);
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(feeds.slice(items.length, items.length + 2)));
    }, 500);
  };
  return (
    <div
      id="scrollableDiv"
      style={{
        height: '70vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        scrollableTarget="scrollableDiv"
      >
        {/* {items.map((i, index) => (
          <div style={style} key={Math.random()}>
            div - #{index}
          </div>
        ))} */}
        {/* {items.map(i, index) => (
          <div key=items[i].props>{items[i]}</div>
        )} */}
        {items}
      </InfiniteScroll>
    </div>
  );
}

// return (
//   <div
//     id="scrollableDiv"
//     style={{
//       height: '70vh',
//       overflow: 'auto',
//       display: 'flex',
//       flexDirection: 'column'
//     }}
//   >
//     {/* Put the scroll bar always on the bottom */}
//     <InfiniteScroll
//       dataLength={num}
//       next={fetchMoreData}
//       // next={() => {}}
//       style={{ display: 'flex', flexDirection: 'column-reverse' }} // To put endMessage and loader to the top.
//       inverse
//       hasMore={true || hasMore}
//       loader={<h4>Loading...</h4>}
//       endMessage={
//         <p style={{ textAlign: 'center' }}>
//           <b>Yay! You have seen it all</b>
//         </p>
//       }
//       // below props only if you need pull down functionality
//       // refreshFunction={React.useCallback(() => updateState({}), [])}
//       refreshFunction={() => {
//         console.log(`resfresh${new Date()}`);
//       }}
//       pullDownToRefresh
//       pullDownToRefreshThreshold={50}
//       pullDownToRefreshContent={
//         <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
//       }
//       releaseToRefreshContent={
//         <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
//       }
//       scrollableTarget="scrollableDiv"
//     >
//       {items}
//     </InfiniteScroll>
//   </div>
//   );
// }

export default FeedInfinite;
