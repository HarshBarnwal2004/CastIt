import React, { useEffect, useState } from 'react';
import { getCandidates, deleteCandidate } from '../api/index';

const AdminPanel = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            const response = await getCandidates();
            setCandidates(response.data.candidates);
        };

        fetchCandidates();
    }, []);

    const handleDelete = async (candidateId) => {
        await deleteCandidate(candidateId);
        setCandidates(candidates.filter(candidate => candidate._id !== candidateId));
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <h2>Manage Candidates</h2>
            <ul>
                {candidates.map(candidate => (
                    <li key={candidate._id}>
                        {candidate.name} - {candidate.party}
                        <button onClick={() => handleDelete(candidate._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;