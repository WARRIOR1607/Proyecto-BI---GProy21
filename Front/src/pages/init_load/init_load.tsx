import React, {useState, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import '../../building.css'
import {CuadradoProps} from '../../interfaces'

const CuadradoPequeno: React.FC<CuadradoProps> = ({ left, top, width, height, backgroundColor }) => {
  return <div className="cuadrado-pequeno" style={{ left, top, width, height, backgroundColor}}></div>;
};


const InitLoadingScreen: React.FC = () => {

  const history = useNavigate();
  const [showContent, setShowcontent] = useState(true);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setShowcontent(false);
      history('/home');
    },2000);

    return()=> clearTimeout(timer);
    
  },[history]);

    return (
      <div className="init-loading-screen">
        <div className="edificio">
          <CuadradoPequeno top='50%' left='60%' width='90px' height='70px' backgroundColor='rgb(174, 214, 241)'/>
          <CuadradoPequeno top='50%' left='10%' width='90px' height='70px' backgroundColor='rgb(174, 214, 241)'/>
          <CuadradoPequeno top='20%' left='60%' width='90px' height='70px' backgroundColor='rgb(174, 214, 241)'/>
          <CuadradoPequeno top='20%' left='10%' width='90px' height='70px' backgroundColor='rgb(174, 214, 241)'/>
          <CuadradoPequeno top='82%' left='35%' width='90px' height='70px' backgroundColor='rgb(135, 54, 0 )'/>
        </div>
      <h1 className="title">ReviewAndes</h1>
      </div>
    );
}
export default InitLoadingScreen;
