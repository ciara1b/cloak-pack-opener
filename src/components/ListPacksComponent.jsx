import cardbg from '../assets/card-background.png';
import packbg from '../assets/pack-bg.png';
import { PeelWrapper, PeelBack, PeelBottom, PeelTop } from 'react-peel';

const ListPacksComponent = (props) => {

  return (
    <div className="peeler-grid">
      {props.openedPacks.map((pack, i) => (
        <PeelWrapper
          className="peel-wrapper"
          height={330} width={330}
          fadeThreshold={0.4}
          corner={"TOP_RIGHT"}
          peelPosition={{ x: 240, y: 40 }}
          handleDrag={(evt, x, y, peel) => {
            peel.setPeelPosition(x, y);
            if (peel.getAmountClipped() === 1) {
              peel.removeEvents();
            }
          }}
          key={i} eventKey={i}
          >
          <PeelTop style={{ backgroundImage: "url(" + packbg + ")" }}></PeelTop>
          <PeelBack style={{ backgroundColor: "rgb(207, 150, 120)" }}></PeelBack>
          <PeelBottom className="peeler" style={{ backgroundImage: "url(" + cardbg + ")" }}>
            {pack.map((cardValue, j) => {
                return cardValue[1] > 10 ?
                  <div key={j} eventKey={j} className="cards">
                    <b className="premium-card">{cardValue[0]}: </b>{cardValue[1]}
                    <br />
                  </div>
                :
                  <div key={j} eventKey={j} className="cards">
                    <b>{cardValue[0]}: </b>{cardValue[1]}
                    <br />
                  </div>
              })}
          </PeelBottom>
        </PeelWrapper>
      ))}
    </div>
  );
};

export default ListPacksComponent;
