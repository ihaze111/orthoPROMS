import React from 'react';
import RangeEpisodeScores from './NationalStatisticsComponents/RangeEpisodeScores';
import GenderDistribution from './NationalStatisticsComponents/GenderDistribution';
import AgeDistribution from './NationalStatisticsComponents/AgeDistribution';

export function RangeEpisodeScoresGraph() {
  return <div><RangeEpisodeScores /></div>;
}

export function GenderDistributeGraph() {
  return <div><GenderDistribution /></div>;
}

export function AgeDistributeGraph() {
  return <div><AgeDistribution /></div>;
}
