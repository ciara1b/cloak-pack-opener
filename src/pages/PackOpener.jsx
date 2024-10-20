import '../styles/PackOpener.css'
import raw_normals from '../assets/normal.txt'
import raw_premiums from '../assets/premium.txt'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import ListPacksComponent from '../components/ListPacksComponent';

const PackOpener = () => {
    const [normals, setNormals] = useState([]);
    const [premiums, setPremiums] = useState([]);
    const [packs, setPacks] = useState([]);
    const [totalSP, setTotalSP] = useState();
    const [num, setNum] = useState();
    const [saved, setSaved] = useState({});

    const fileReader = new FileReader();

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const loadData = () => {
        fetch(raw_normals)
        .then(r => r.text())
        .then(text => {
            setNormals(text.split("\n"))
        });
        fetch(raw_premiums)
        .then(r => r.text())
        .then(text => {
            setPremiums(text.split("\n"))
        });
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

    const exportToCsv = () => {
        var CsvString = "Name,Value,Total Owned,\r\n";
        Object.entries(saved).map(([key, value]) => {
            let pair = key.split(",");
            CsvString += pair[0] + "," + pair[1] + "," + value + "," + "\r\n";
        });
        CsvString = "data:application/csv," + encodeURIComponent(CsvString);
        var x = document.createElement("A");
        x.setAttribute("href", CsvString);
        x.setAttribute("download", "somedata.csv");
        document.body.appendChild(x);
        x.click();
    }

    const importFromCsv = (e) => {
        if (e.target.files[0]) {
            fileReader.onload = function (event) {
                const string = event.target.result;
                const csvRows = string.slice(string.indexOf("\n") + 1).split(",\r\n");
            
                for (let i = 0; i < csvRows.length-1; i++) {
                    let values = csvRows[i].split(",");
                    saved[[values[0], values[1]]] = parseInt(values[2]);
                }
            }
        }

        fileReader.readAsText(e.target.files[0]);
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
            <h1>Pack Opener</h1>
            <Container fluid>
                <Row>
                    <Col className='options-content'>
                        <form>
                            <input type="number" value={num} onChange={(e) => setNum(e.target.value)} placeholder="Number of packs..." />
                            <br />
                            <input type="number" value={totalSP} onChange={(e) => setTotalSP(e.target.value)} placeholder="Total sp..." />
                        </form>
                        <Button variant="primary" onClick={handleClick}>Open Packs</Button>{' '}
                        <br />
                        <Button variant="success" onClick={handleSave}>Save Cards</Button>{' '}
                        <br />
                        <br />
                        <div className="files">
                            <input type={"file"} accept={".csv"} onChange={importFromCsv} />
                            <br />
                            <Button variant="warning" onClick={exportToCsv}>Export Saved</Button>{' '}
                        </div>
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