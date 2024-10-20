import '../styles/Header.css'
import { memo } from 'react';

const Header = () => {
    return (
        <header>
            <h1 style={{fontWeight: "bold"}}>Cloak</h1>
        </header>
    );
  }
  
  export default memo(Header);
  