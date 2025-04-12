'use client'

import React, { useEffect, useState } from 'react'
import {supabase} from '../supabase/supabaseClient'
import {useAuth} from '../context/AuthContext'

const HistoryPage = () => {

    const [testscores, setTestScores] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth();
    
    const getTestScores = async () => {
        setLoading(true);
      
        const { data: scores, error } = await supabase
          .from('testscores')
          .select('*')
          .eq('user_id', user.id);
          // .order('inserted_at', { ascending: false }); // optional
      
        if (error) {
          console.error("Error fetching test scores:", error.message);
        } else {
          console.log("User ID:", user.id);
          console.log("Scores:", scores);
          setTestScores(scores); // assuming this sets state in React
        }
      
        setLoading(false);
      };

    useEffect(()=>{
        getTestScores()
    },[user])
return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Test Scores</h1>
            {loading ? (
                <div className="flex justify-center items-center">
                    <p className="text-gray-600">Loading...</p>
                </div>
            ) : (
                <ul className="space-y-4">
                    {testscores.map((score, index) => (
                        <li
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
                        >
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold"> Test Taken:</span>{" "}
                                {new Date(score.inserted_at).toLocaleString()}
                            </p>
                            <p className="text-lg text-gray-800">
                                <span className="font-semibold">Test Score:</span> {score.testscore}
                            </p>
                            <p className="text-lg text-gray-800">
                                <span className="font-semibold">Flower:</span> {score.flower}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
)
}

export default HistoryPage