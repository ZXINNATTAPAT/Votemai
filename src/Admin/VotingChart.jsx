import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const VotingChart = ({ votingData }) => {
    const chartContainer = useRef(null);
    
    // console.log(votingData)
    // console.log(setlabels);

    useEffect(() => {
        if (!votingData || !votingData.votes) return; // ตรวจสอบว่าข้อมูลไม่มีค่าหรือไม่มีข้อมูล votes
    
        const keys = Object.keys(votingData.votes);
        const setlabels = keys.map(key => `${key}`);
    
        const ctx = chartContainer.current.getContext('2d');
    
        const data = {
            labels: setlabels,
            datasets: [{
                label: 'Votes',
                data: Object.values(votingData.votes),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };
    
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
    
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    
        return () => {
            myChart.destroy();
        };
    }, [votingData]);
    
    //clude setlabels in the dependency array

    return <canvas ref={chartContainer} />;
};

export default VotingChart;


