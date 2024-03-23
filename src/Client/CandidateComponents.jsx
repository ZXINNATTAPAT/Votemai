import React from 'react';

const CandidateCard = ({ candidate, onSelectCandidate }) => {
  return (
    <div className="card shadow-sm" style={{border:"none"}}>
      <div className="card-body">
        <h5 className="card-title">{candidate.name}</h5>
        <p className="card-text">Votes: {candidate.voteCount}</p>
        <button className="btn btn-primary" onClick={() => onSelectCandidate(candidate)}>
          Select
        </button>
      </div>
    </div>
  );
};

const CandidateList = ({ candidates, onSelectCandidate }) => {
  return (
    <div className="row">
      {candidates.map((candidate, index) => (
            <CandidateCard
                key={index}
                candidate={candidate}
                onSelectCandidate={onSelectCandidate}
            />
      ))}
    </div>
  );
};

export { CandidateCard, CandidateList };
