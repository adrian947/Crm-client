/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { TOP_SELLERS } from "./../gql/top";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const TopSellers = () => {
  const [stop, setStop] = useState(false);
  const {
    data: dataq,
    loading,
    startPolling,
    stopPolling,
  } = useQuery(TOP_SELLERS);

  useEffect(() => {
    if (!stop) {
      startPolling(1000);
    }

    setTimeout(() => {
      setStop(true);
      stopPolling();
    }, 10000);

    return () => {
      stopPolling();
      setStop(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startPolling, stopPolling]);

  if (loading) return null;

  const { betterSeller } = dataq;

  const topSellers = [];

  betterSeller.map((seller, index) => {
    topSellers[index] = {
      ...seller.seller[0],
      total: seller.total,
    };
  });

  return (
    <div>
      <h1 className='componentTitle'>Top sellers</h1>

      <BarChart
        width={700}
        height={500}
        data={topSellers}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#6A8CAF" />
      </BarChart>
    </div>
  );
};

export default TopSellers;
