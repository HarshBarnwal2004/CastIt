import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidateList = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('/candidate');
                setCandidates(response.data.candidates);
            } catch (err) {
                setError('Failed to fetch candidates');
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Candidate List</h2>
            <ul>
                {candidates.map(candidate => (
                    <li key={candidate._id}>
                        <h3>{candidate.name}</h3>
                        <p>Party: {candidate.party}</p>
                        <p>Vote Count: {candidate.voteCount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CandidateList;