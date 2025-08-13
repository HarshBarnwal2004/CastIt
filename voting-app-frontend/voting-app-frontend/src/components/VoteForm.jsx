import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { castVote } from '../api';

const VoteForm = () => {
    const { candidateID } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const handleVote = async () => {
        try {
            await castVote(candidateID);
            setSuccess(true);
        } catch (err) {
            setError('Failed to cast vote. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div>
            <h2>Vote for Candidate</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success ? (
                <p style={{ color: 'green' }}>Vote cast successfully!</p>
            ) : (
                <button onClick={handleVote} disabled={loading}>
                    Cast Vote
                </button>
            )}
        </div>
    );
};

export default VoteForm;