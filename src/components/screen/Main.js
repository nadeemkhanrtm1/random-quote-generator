import React, {useEffect, useState} from 'react';
import styles from "./main.module.scss";
import {getCall} from "../../api/getCall";

const TOKEN = process.env.REACT_APP_TOKEN
const Main = () => {
  const [quote,
    setQuote] = useState("Loading...")
  const [theme,
    setTheme] = useState();
  useEffect(() => {
    getCall({path: "https://timezoneapi.io/api/ip/?token=" + TOKEN}).then((result) => {
      var s = new Date().toLocaleString(undefined, {timeZone: result.data.data.timezone.id});
      const hours = s
        .split(", ")[1]
        .split(":")[0];
        if(hours >= 16 || hours<=5 ){
            setTheme(false)
        }else{
            setTheme(true)
        }

    }).catch((error) => {
      console.log(error)
    });
    getCall({path: "https://api.quotable.io/random"}).then((item) => setQuote(item.data.content)).catch((error) => {
      console.log(error)
    })
  }, [])

  const handleClick = () => {
    setQuote("Loading...")
    getCall({path: "https://api.quotable.io/random"}).then((item) => setQuote(item.data.content)).catch((error) => {
      console.log(error)
    })
  }
  if(theme===null){
      return(null)
  }else{
  return (
    <section
      className={[
      styles.main,
      (theme
        ? styles.day_mode
        : styles.night_mode)
    ].join(' ')}>
        <div>
        <h1
        className={[
        styles.main_title,
        (theme
          ? styles.day_mode_title
          : styles.night_mode_title)
      ].join(" ")}>Quote Generator</h1>
      <span>Theme is decided as per the local time.<br/> Theme is {theme ? "day theme" : "night theme"} supports all country</span>
        </div>
      <div
        className={[
        styles.quote_generator,
        (theme
          ? styles.night_mode
          : styles.day_mode)
      ].join(" ")}>
        {quote}
      </div>
      <button
        className={[
        styles.button,
        (theme
          ? styles.night_mode
          : styles.day_mode)
      ].join(' ')}
        onClick={handleClick}>Generate Quote</button>
    </section>
  )
}
}

export default Main
