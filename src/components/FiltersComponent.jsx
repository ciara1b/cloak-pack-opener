const FiltersComponent = (props) => {

  const filterFormattedCards = (rarity) => {
    let filtered = props.cardList;
    if (rarity === "premium") {
      filtered = Object.fromEntries(Object.entries(props.cardList).filter(([k, v]) => v[0].some(p => (p >= 11))));
    } else if (rarity === "normal") {
      filtered = Object.fromEntries(Object.entries(props.cardList).filter(([k, v]) => v[0].some(p => (p <= 10))));
    }

    props.setFilteredList(filtered);
  }

  return (
    <div>
      <button onClick={() => filterFormattedCards("premium")}>Premium</button>
      <button onClick={() => filterFormattedCards("normal")}>Normal</button>
      <button onClick={() => filterFormattedCards("")}>All</button>
    </div>
  );
};

export default FiltersComponent;
