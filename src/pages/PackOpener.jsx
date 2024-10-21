import '../styles/PackOpener.css'
import raw_normals from '../assets/normal.txt'
import raw_premiums from '../assets/premium.txt'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import ListPacksComponent from '../components/ListPacksComponent';
import FileReaderComponent from '../components/FileReaderComponent';

const PackOpener = () => {
    const [normals, setNormals] = useState([]);
    const [premiums, setPremiums] = useState([]);
    const [packs, setPacks] = useState([]);
    const [totalSP, setTotalSP] = useState();
    const [charName, setCharName] = useState("");
    const [num, setNum] = useState();
    const [saved, setSaved] = useState({});

    const fr = new FileReader();

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const loadData = () => {
        [raw_normals, raw_premiums].forEach(data =>
            fetch(data)
            .then(r => r.text())
            .then(text => {
                if (data === raw_normals) {
                    setNormals(text.split("\n"))
                } else {
                    setPremiums(text.split("\n"))
                }
            })
        );
    }

    const handleSave = () => {
        for (let i = 0; i < packs.length; i++) {
            for (let j = 0; j < 5; j++) {
                if (packs[i][j] in saved) {
                    saved[packs[i][j]]++;
                } else {
                    saved[packs[i][j]] = 1;
                }
            }
        }
        console.log("Current Stock:");
        console.log(saved);
        console.log("Packs Contents:");
        console.log(packs);
        setPacks([]);
    }

    const handleClick = () => {
        let lessSP = 0;

        for (let i=1; i <= num; i++){
            if ((totalSP - lessSP) !== 0) {
                openPacks()
                lessSP++
            } else {
                break;
            }
        }
        setTotalSP(totalSP - lessSP)
    }

    const openPacks = () => {
        const rarities = [];
        for (let i=0; i < 5; i++){
            rarities.push(randomNumberInRange(1, 100));
        }

        const pulls = []
        for (let i=0; i < 5; i++){
            if (rarities[i] < 100){
                pulls.push([normals[(Math.floor(Math.random() * normals.length))], randomNumberInRange(1, 10)]);
            } else {
                pulls.push([premiums[(Math.floor(Math.random() * premiums.length))], randomNumberInRange(11, 14)]);
            }
        }

        packs.push(pulls);
    }

    useEffect(() => {
        loadData()
    }, [num]);

    return (
        <div className='pack-opener-content'>
            <h2>Pack Opener</h2>
            <Container fluid>
                <Row>
                    <Col xs={2} className='text-center'>
                        <form>
                            <input type="number" value={num} onChange={(e) => setNum(e.target.value)} placeholder="Number of packs..." />
                            <input type="number" value={totalSP} onChange={(e) => setTotalSP(e.target.value)} placeholder="Total sp..." />
                            <input type="text" value={charName} onChange={(e) => setCharName(e.target.value)} placeholder="Character name..." />
                        </form>
                        <br />
                        <Button variant="primary" onClick={handleClick}>Open Packs</Button>{' '}
                        <Button variant="success" onClick={handleSave}>Save Cards</Button>{' '}
                        <FileReaderComponent savedCards={saved} fileReader={fr} cn={charName} />
                    </Col>
                    <Col xs={9}>
                        <ListPacksComponent openedPacks={packs} normArr={normals} premArr={premiums} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PackOpener;