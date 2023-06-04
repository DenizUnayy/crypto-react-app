import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import './App.css'
import Coins from './components/Coins'
import ScrollToTopButton from './components/ScrollToTopButton'
import ReactSwitch from "react-switch"

export const ThemeContext = createContext(null);

function App() {
  const [coins, setCoins] = useState([])

  const [theme, setTheme] = useState('dark')

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=30&page=1&sparkline=false&locale=en'

  useEffect(()=>{
    axios.get(url, { headers: { 'Access-Control-Allow-Origin': '*' }})
    .then((res) => {
      setCoins(res.data)
      console.log(res.data[0]);
    }).catch((e) => {
      console.log(e)
    })
  }, [])

  return (
    <>
    <ThemeContext.Provider value={{theme, switchTheme}}>
      <div className='app' id={theme}>
        <div className='switchStyle'>
          <p>Dark Theme</p>
          <ReactSwitch onChange={switchTheme} checked={theme === 'dark'} />
        </div>
        <Coins coins={coins}/>
        <ScrollToTopButton />
      </div>
    </ThemeContext.Provider>
    </>
  )   
}

export default App
