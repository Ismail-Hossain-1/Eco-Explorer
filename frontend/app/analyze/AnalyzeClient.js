'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { useAuth } from '../context/AuthContext';
import BarChart from '../pages/barChart';

const AnalyzeClient = () => {
  const [scores, setScores] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchScores = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('testscores')
        .select('*')
        .eq('user_id', user.id);

      if (error) console.error('Error fetching scores:', error.message);
      else setScores(data);
    };

    fetchScores();
  }, [user]);

  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold text-center mt-10">Analyze</h1>
      <div className="flex justify-center items-center h-screen w-full px-4">
        <div className="w-full max-w-3xl">
          <BarChart scores={scores} />
        </div>
      </div>
    </div>
  );
};

export default AnalyzeClient;
