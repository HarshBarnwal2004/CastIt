import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

// User authentication
export const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/user/signup`, userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/user/login`, credentials);
    return response.data;
};

// Fetch candidates
export const fetchCandidates = async () => {
    const response = await axios.get(`${API_URL}/candidate/candidate`);
    return response.data.candidates;
};

// Vote for a candidate
export const voteForCandidate = async (candidateID, token) => {
    const response = await axios.post(`${API_URL}/candidate/vote/${candidateID}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Fetch vote count
export const fetchVoteCount = async () => {
    const response = await axios.get(`${API_URL}/candidate/vote/count`);
    return response.data.voteRecord;
};