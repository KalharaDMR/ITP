import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className='rounded-lg bg-white bg-opacity-20 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300'>
      <div className={`flex items-center p-6 ${color} rounded-t-lg`}>
        <div className='text-4xl text-white'>{icon}</div>
      </div>
      <div className='p-6'>
        <p className='text-xl font-semibold text-white'>{text}</p>
        <p className='text-2xl font-bold text-white mt-2'>{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;