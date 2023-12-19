import React, { useState } from 'react';
import "./questions.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {useTranslation} from "react-i18next"


const Questions = () => {
    const [t, ] = useTranslation()
    const [activeCardIndex, setActiveCardIndex] = useState(-1);

    const handleActive = (index) => {
        if (index === activeCardIndex) {
            setActiveCardIndex(-1);
        } else {
            setActiveCardIndex(index);
        }
    }

    return (
        <div className='question'>
            <div className="question-container">
                <div className="title">
                    <h1>{t( "Question-Title")}</h1>
                </div><br />
                <div className="text">
                    <h3>{t("Question-Text")}</h3>
                </div><br /><br /><br />
                <div className="cards">
                    <div className="ques">
                        <div className="type" onClick={() => handleActive(0)}>
                            <div className="left">
                                <h3>{t("Question-Ask-One")}</h3>
                            </div>
                            <div className="right">
                                {activeCardIndex === 0 ? <AiOutlineMinus size={20}/> : <AiOutlinePlus size={20}/>}
                            </div>
                        </div>
                        {activeCardIndex === 0 && 
                            <div className="card">
                                {t("Question-Answer-One")}
                            </div>
                        }
                    </div><br />
                    <div className="ques">
                        <div className="type" onClick={() => handleActive(1)}>
                            <div className="left">
                                <h3>{t("Question-Ask-Two")}</h3>
                            </div>
                            <div className="right">
                                {activeCardIndex === 1 ? <AiOutlineMinus size={20}/> : <AiOutlinePlus size={20}/>}
                            </div>
                        </div>
                        {activeCardIndex === 1 && 
                            <div className="card">
                                {t("Question-Answer-Two")}
                            </div>
                        }
                    </div><br />
                    <div className="ques">
                        <div className="type" onClick={() => handleActive(2)}>
                            <div className="left">
                                <h3>{t("Question-Ask-Three")}</h3>
                            </div>
                            <div className="right">
                                {activeCardIndex === 2 ? <AiOutlineMinus size={20}/> : <AiOutlinePlus size={20}/>}
                            </div>
                        </div>
                        {activeCardIndex === 2 && 
                            <div className="card">
                                {t("Question-Answer-Three")}
                            </div>
                        }
                    </div><br />
                    <div className="ques">
                        <div className="type" onClick={() => handleActive(3)}>
                            <div className="left">
                                <h3>{t("Question-Ask-Four")} </h3>
                            </div>
                            <div className="right">
                                {activeCardIndex === 3 ? <AiOutlineMinus size={20}/> : <AiOutlinePlus size={20}/>}
                            </div>
                        </div>
                        {activeCardIndex === 3 && 
                            <div className="card">
                                {t("Question-Answer-Four")}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions;
