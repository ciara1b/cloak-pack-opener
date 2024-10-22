const ListStockComponent = (props) => {

  return (
    <div>
      <table>
        <tr>
          <th>Card Name</th>
          <th>Power</th>
          <th>Number Owned</th>
        </tr>
        {Object.entries(props.cardsStock).map(([card, numOwned], i) => (
          <tr key={i} eventKey={i}>
            <td>{card.split(",")[0]}</td>
            <td>{card.split(",")[1]}</td>
            <td>{numOwned}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ListStockComponent;
