'use client'

import React, { useState } from 'react'
import {supabase} from '../supabase/supabaseClient'
import {useAuth} from '../context/AuthContext'

const GenerateMCQ = ({ mcq, flower }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const { user } = useAuth(); 
    console.log(user.id)

    const handleOptionChange = (questionIndex, option) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: option,
        });
    };

    const handleSubmit = () => {
        let calculatedScore = 0;
        mcq.forEach((item, index) => {
            if (selectedAnswers[index] === item.answer) {
                calculatedScore++;
            }
        });
        setScore(calculatedScore);
        saveScore();
        setShowResults(true);
    };

    async function saveScore() {
        const { data, error } = await supabase
            .from('testscores')
            .insert([
                { testscore: score, user_id: user.id , flower:flower}
            ])
        if (error) {
            console.error('Error saving score:', error);
        } else {
            console.log('Score saved successfully:', data);
        }
    }

    return (
        <div className="p-4 bg-gray-100 rounded shadow-md">
            {mcq.map((item, index) => (
                <div key={index} className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">{index + 1}. {item.question}</h2>
                    <div className="space-y-2">
                        {['a', 'b', 'c', 'd'].map((option) => (
                            <label key={option} className="block">
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    checked={selectedAnswers[index] === option}
                                    onChange={() => handleOptionChange(index, option)}
                                    className="mr-2"
                                />
                                {item[option]}
                            </label>
                        ))}
                    </div>
                    {showResults && (
                        <div className={`mt-2 text-sm ${selectedAnswers[index] === item.answer ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedAnswers[index] === item.answer
                                ? 'Correct!'
                                : `Incorrect! Correct answer: ${item[item.answer]}`}
                        </div>
                    )}
                </div>
            ))}
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Submit
            </button>
            {score !== null && (
                <div className="mt-4 text-lg font-semibold">
                    Your Score: {score} / {mcq.length}
                </div>
            )}
        </div>
    );
};

export default GenerateMCQ;