import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const VotingChart = ({ votingData }) => {
    const chartContainer = useRef(null);
    const keys = votingData ? Object.keys(votingData.votes[0].votes) : []; // Extract keys if votingData is not null
    const setlabels = keys.map(key => `${key}`); // Map keys to labels
    console.log(votingData)
    console.log(setlabels);

    useEffect(() => {
        if (!votingData || !votingData.votes) return; // Add a null check

        const ctx = chartContainer.current.getContext('2d');

        // Create data for the chart
        const data = {
            labels: setlabels,
            datasets: [{
                label: 'Votes',
                data: Object.values(votingData.votes[0].votes),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        };

        // Define options for the chart
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        // Create the bar chart
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });

        // Return a cleanup function to destroy the chart when the component unmounts
        return () => {
            myChart.destroy();
        };
    }, [votingData, setlabels]); // Include setlabels in the dependency array

    return <canvas ref={chartContainer} />;
};

export default VotingChart;


