import React from 'react';
import CandidateList from '../components/CandidateList';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Voting Application</h1>
            <p>Please select a candidate to vote for:</p>
            <CandidateList />
        </div>
    );
};

export default Home;