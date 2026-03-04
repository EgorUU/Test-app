'use client'
import React, { useEffect } from 'react'
import "@/scss/blocks/offer.scss"
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'

interface IRate {
    id: string,
    period: string,
    price: number,
    full_price: number,
    is_best: boolean,
    text: string
}
const Page: React.FC = () => {
    const [rateActive, setRateActive]  = useState<number>()
    const [data, setData] = useState<any>()
    const [timerMinutes, setTimerMinutes]  = useState(1)
    const [timerSeconds, setTimerSeconds]  = useState(59)
    const [timeActive, setTimeActive]= useState(false)
    const [timeEnd, setTimeEnd] = useState(false)
    useEffect(() => {
    const time = setInterval(() => {
        setTimerSeconds(prev => prev - 1)
    }, 1000)
    

    return () => clearInterval(time)
    }, [])
    
    useEffect(() => {
        if (timerSeconds < 0) {
            setTimerSeconds(59)
            setTimerMinutes(prev => prev - 1)
        }
        else if (timerSeconds === 0 && timerMinutes === 0) {
            const intervals = window.setInterval(() => {})
            for (let i = 1; i < intervals; i++) {
                window.clearInterval(i)
            }
            setTimeEnd(true)
        }
        if (timerSeconds === 30 && timerMinutes === 0) {
            setTimeActive(true)
        }
        // console.log(timerMinutes + timerSeconds);
        
    }, [timerSeconds])



    const [checkbox, setCheckbox] = useState<boolean>(false)
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios("https://t-core.fit-hub.pro/Test/GetTariffs")
            setData(data.data)     
            console.log();
                   
        }
        fetchData()
    }, [])
    const [buyButton, setButButton] = useState<boolean>(false)
    return (
        <>
            <div className="offer">
                <div className="offer-header">
                    <h1>Выбери подходящий для себя <span>тариф</span></h1>
                </div>
                <div className="offer-main flex">
                    <div className="offer-main__image">
                        <Image src="/freepik-export-20240531103402atHS12.png" alt="image" width={380.72772216796875} height={767} />
                    </div>
                    <div className="offer-main__content">
                        <div className="offer-main__content--rates">
                            <div className={`offer-main__content--rates-main flex items-center ${rateActive === 4 ? "rate-active" : ""}`} id="4" onClick={() => setRateActive(4)}>
                                <div className="offer-main__content--rates-main-container flex items-center">
                                    <div className="offer-main__content--rates-main-container-price">
                                        <h1>{data && data.find((rate: any) => rate.is_best === true).period}</h1>
                                            <h2>{data && data.find((rate: any) => rate.is_best === true).price} ₽</h2>
                                            <h3 style={{display: timeEnd ? "none" : ""}}>{data && data.find((rate: any) => rate.is_best === true).full_price} ₽</h3>
                                    </div>
                                    <div className="offer-main__content--rates-main-container-text">
                                         <p>{data && data.find((rate: any) => rate.is_best === true).text}</p>
                                    </div>
                                </div>
                                <div className="offer-main__content--rates-others-item-discount" style={{display: timeEnd ? "none" : ""}}>
                                    <h1>-{(((data && data.find((rate: any) => rate.is_best === true).price)/(data && data.find((rate: any) => rate.is_best === true).full_price))*100).toFixed(0)}%</h1>
                                </div>
                                <h1 className='offer-main__content--rates-others-item-hit'>хит!</h1>
                            </div>
                            <div className="offer-main__content--rates-others flex">
                                
                                <div className={`offer-main__content--rates-others-item item-1 ${rateActive === 4 ? "rate-active" : ""}`} id="4" onClick={() => setRateActive(4)}>
                                    <div className="offer-main__content--rates-others-item-container">
                                        <div>
                                            <h1>{data && data.find((rate: any) => rate.is_best === true).period}</h1>
                                            <h2>{data && data.find((rate: any) => rate.is_best === true).price} ₽</h2>
                                            <h3 style={{display: timeEnd ? "none" : ""}}>{data && data.find((rate: any) => rate.is_best === true).full_price} ₽</h3>
                                        </div>
                                        <p>{data && data.find((rate: any) => rate.is_best === true).text}</p>
                                    </div>
                                    <h1 className='offer-main__content--rates-others-item-hit'>хит!</h1>
 <div className="offer-main__content--rates-others-item-discount" style={{display: timeEnd ? "none" : ""}}>
                                    <h1>-{(((data && data.find((rate: any) => rate.is_best === true).price)/(data && data.find((rate: any) => rate.is_best === true).full_price))*100).toFixed(0)}%</h1>
                                </div>
                                </div>
                                
                                {
                                    data ? data.filter((el: IRate) => el.is_best !== true).reverse().map((rate: any, index: any) => (
                                        <>
                                            <div className={`offer-main__content--rates-others-item ${index === rateActive ? "rate-active" : ""}`} id={index} key={index} onClick={() => setRateActive(index)}>
                                                <div className="offer-main__content--rates-others-item-container">
                                                    <div>
                                                        <h1>{rate.period}</h1>
                                                        <h2>{rate.price} ₽</h2>
                                                        <h3  style={{display: timeEnd ? "none" : ""}}>{rate.full_price} ₽</h3>
                                                    </div>
                                                    <p>{rate.text}</p>
                                                </div>
                                                <div className="offer-main__content--rates-others-item-discount" style={{display: timeEnd ? "none" : ""}}>
                                                    <h1>-{((rate.price/rate.full_price)*100).toFixed(0)}%</h1>
                                                </div>
                                            </div>
                                        </>
                                    )) : <></>
                                }
                                
                            </div>
                        </div>

                        <div className="offer-main__content--result">
                            <div className="offer-main__content--result-warning">
                                <div className="offer-main__content--result-warning-container flex justify-center">
                                    <Image src="/alert1.svg" alt="image" width={24} height={26} />
                                    <p>Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц</p>
                                </div>
                            </div>

                            <div className="offer-main__content--result-checkbox flex">
                                <button className="checkbox"><Image src={checkbox ? "/check_box.png" : "/Vector.png"} width={32} height={32} alt="checkbox" onClick={() => setCheckbox(!checkbox)}/></button>
                                <p>Я согласен с <span>офертой рекуррентных платежей</span> и <span>Политикой конфиденциальности</span></p>
                            </div>

                            <div className="offer-main__content--result-purchase">
                                <button onClick={() => {
                                    if (checkbox === false) {
                                        console.log('dsds');
                                        
                                        setButButton(true)
                                        setTimeout(() => {
                                            setButButton(false)
                                        }, 1500)
                                    }
                                }} style={{background: buyButton ? "red" : "", color: buyButton ? "black": ""}}>Купить</button>
                                <p>Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.</p>
                            </div>

                        </div>


                    </div>
                </div>
                <div className="offer-warranty">
                    <div className="offer-warranty-header flex justify-center items-center">
                        <h1>гарантия возврата 30 дней</h1>
                    </div>
                    <p className="offer-warranty-desc">
                        Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Page