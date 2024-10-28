import { useState, useEffect } from "react";

const FiltersComponent = (props) => {
    const [searchTarget, setSearchTarget] = useState("");
    const [localFilteredList, setLocalFilteredList] = useState({});
    const [allState, setAllState] = useState(true);

    const filterFormattedCards = (rarity) => {
        let filtered = props.cardList;
        if (rarity === "premium") {
            filtered = Object.fromEntries(Object.entries(props.cardList).filter(([k, v]) => v[0].some(p => (p >= 11))));
            setAllState(false);
        } else if (rarity === "normal") {
            filtered = Object.fromEntries(Object.entries(props.cardList).filter(([k, v]) => v[0].some(p => (p <= 10))));
            setAllState(false);
        } else {
            setAllState(true);
        }

        setSearchTarget("");
        setLocalFilteredList(filtered);
        props.setFilteredList(filtered);
    }

    const searchName = () => {
        let searched = props.cardList;
        if (Object.keys(localFilteredList).length === 0 && allState) {
            setLocalFilteredList(props.cardList);
            searched = Object.fromEntries(Object.entries(props.cardList).filter(([k, v]) => k.toLocaleLowerCase().includes(searchTarget)));
        } else {
            searched = Object.fromEntries(Object.entries(localFilteredList).filter(([k, v]) => k.toLocaleLowerCase().includes(searchTarget)));
        }

        props.setFilteredList(searched);
    }

    useEffect(() => {
      searchName();
    }, [searchTarget]);

    return (
        <div>
            <button onClick={() => filterFormattedCards("premium")}>Premium</button>
            <button onClick={() => filterFormattedCards("normal")}>Normal</button>
            <button onClick={() => filterFormattedCards("")}>All</button>
            <input type="text" placeholder="Search..." value={searchTarget} onChange={(e) => setSearchTarget(e.target.value)} />
        </div>
    );
};

export default FiltersComponent;
