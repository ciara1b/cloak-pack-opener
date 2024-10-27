import { useEffect, useState } from "react";

const ListStockComponent = (props) => {
  const [cardList, setCardList] = useState({});
  const [rowToHover, setRowToHover] = useState([]);

  let formattedCards = {};
  const formattedCardsTest = {"Cactuar": [[3, 4], [2, 1]],
                          "Golden Dodger (Midfielder)": [[6], [1]],
                          "Tiefling (Purple)": [[10], [1]],
                          "Warrior": [[1], [1]]};

  const formatCardsStock = () => {
    formattedCards = {};
    Object.entries(props.cardsStock).map(([key, value]) => {
        let pair = key.split(",");
        if (pair[0] in formattedCards) {
          if (pair[1] in formattedCards[pair[0]][0]) {
            let i = formattedCards[pair[0]][0].findIndex(ele => ele === parseInt(pair[1]));
            formattedCards[pair[0]][1][i] += 1;
          } else {
            formattedCards[pair[0]][0].push(parseInt(pair[1]));
            formattedCards[pair[0]][1].push(1);
          }
        } else {
          formattedCards[pair[0]] = [[parseInt(pair[1])], [value]];
        }
    });
    setCardList(formattedCards);
  }

  useEffect(() => {
    console.log(cardList);
    formatCardsStock();
  }, [props.cardsStock]);

  return (
    <div>
      <table className="top-table" cellPadding={0}>
        <thead>
          <tr>
            <th>Card Name</th>
            <th>Power</th>
            <th>Number Owned</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(cardList).map(([card, [powers, numOwneds]], i) => (
            <tr key={i} eventKey={i}>
              <td>{card}</td>
              <td>
                <table className="nested-data">
                  {powers.map((power, j) => {
                    return(
                      <tr className={rowToHover.toString() === [i, j].toString() ? "hover-class" : ""}
                      onMouseEnter={() => setRowToHover([i, j])} onMouseLeave={() => setRowToHover([])}
                      key={j} eventKey={j}>{power}</tr>
                    )
                  })}
                </table>
              </td>
              <td>
                <table className="nested-data">
                  {numOwneds.map((numOwned, k) => {
                    return(
                      <tr className={rowToHover.toString() === [i, k].toString() ? "hover-class" : ""}
                      onMouseEnter={() => setRowToHover([i, k])}
                      onMouseLeave={() => setRowToHover([])}
                      key={k} eventKey={k}>{numOwned}</tr>
                    )
                  })}
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListStockComponent;
