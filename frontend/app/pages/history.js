'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

const HistoryPage = () => {
    const [testscores, setTestScores] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const router = useRouter()

    const getTestScores = async () => {
        setLoading(true)

        const { data: scores, error } = await supabase
            .from('testscores')
            .select('*')
            .eq('user_id', user.id)

        if (error) {
            console.error("Error fetching test scores:", error.message)
        } else {
            setTestScores(scores)
        }

        setLoading(false)
    }

    useEffect(() => {
        if (user) {
            getTestScores()
        }
    }, [user])

    const handleRetake = (score) => {
        router.push(`/test?flower=${score.flower}&scoreId=${score.id}`)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">🧠 Your Test History</h1>

                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <p className="text-slate-600 text-lg animate-pulse">Loading test scores...</p>
                    </div>
                ) : testscores.length === 0 ? (
                    <div className="text-center text-slate-600 text-lg">No test scores found yet.</div>
                ) : (
                    <ul className="space-y-6">
                        {testscores.map((score, index) => (
                            <li
                                key={index}
                                className="border border-slate-200 rounded-xl p-6 bg-white hover:shadow-lg transition"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-sm text-slate-500">
                                            <span className="font-semibold">Test Taken:</span>{" "}
                                            {new Date(score.inserted_at).toLocaleString()}
                                        </p>
                                        <p className="text-lg text-slate-800 mt-2">
                                            <span className="font-semibold">Score:</span> {score.testscore}
                                        </p>
                                        <p className="text-lg text-slate-800">
                                            <span className="font-semibold">Flower:</span> {score.flower}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleRetake(score)}
                                        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 shadow-md transition"
                                    >
                                        Retake Test
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default HistoryPage
