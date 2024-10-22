import { Button } from 'react-bootstrap';
import { useRef, useState } from "react";

const FileReaderComponent = (props) => {
    const [importMsg, setImportMsg] = useState("");

    const fileInputRef = useRef();
    const fr = new FileReader();

    const exportToCsv = () => {
        var CsvString = "Name,Value,Total Owned,\r\n";
        Object.entries(props.savedCards).map(([key, value]) => {
            let pair = key.split(",");
            CsvString += pair[0].split("\r")[0] + "," + pair[1] + "," + value + "," + "\r\n";
        });
        CsvString = "data:application/csv," + encodeURIComponent(CsvString);
        var x = document.createElement("A");
        x.setAttribute("href", CsvString);
        x.setAttribute("download", (props.cn + ".csv"));
        document.body.appendChild(x);
        x.click();
    }

    const importFromCsv = (e) => {
        if (e.target.files[0]) {
            fr.onload = function (event) {
                const string = event.target.result;
                const csvRows = string.slice(string.indexOf("\n") + 1).split(",\r\n");
                const savedCards = {};
            
                for (let i = 0; i < csvRows.length-1; i++) {
                    let values = csvRows[i].split(",");
                    savedCards[[values[0], values[1]]] = parseInt(values[2]);
                }
                props.setSaved(savedCards);
            }
            setImportMsg("File imported!");
        }

        fr.readAsText(e.target.files[0]);
    }

    return (
        <div className="files">
            <br />
            {importMsg}
            <br />
            <Button variant="warning" onClick={()=>fileInputRef.current.click()}>Import Cards</Button>{' '}
            <input onChange={importFromCsv} multiple={false} ref={fileInputRef} type='file'hidden/>
            <br />
            <Button variant="warning" onClick={exportToCsv}>Export Cards</Button>{' '}
        </div>
    );
  }
  
  export default FileReaderComponent;
  