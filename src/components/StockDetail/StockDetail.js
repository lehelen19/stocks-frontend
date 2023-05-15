const StockDetail = ({ quote }) => {
  const details = quote['Global Quote'];
  return (
    <>
      <h1>{details['01. symbol']}</h1>
      <div>Price: ${details['02. open']}</div>
      <div>Volume: {details['06. volume']}</div>
      <div>Change Percent: {details['10. change percent']}</div>
      <button>Add to watchlist</button>
    </>
  );
};

export default StockDetail;
