import React from 'react';
import { Blink } from './blink-creator';

interface BlinkListProps {
  blinks: Blink[];
}

export const BlinkList: React.FC<BlinkListProps> = ({ blinks }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 font-syne mb-4">Your Blinks</h2>
      {blinks.length === 0 ? (
        <p className="text-gray-600">No blinks created yet.</p>
      ) : (
        <ul className="space-y-4">
          {blinks.map((blink, index) => (
            <li key={index} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">{blink.id}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${blink.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {blink.status}
                </span>
              </div>
              <p className="text-gray-600 mt-2">Amount: {blink.amount} SOL</p>
              <p className="text-gray-600">Recipient: {blink.recipient}</p>
              {blink.memo && <p className="text-gray-600 mt-2">Memo: {blink.memo}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};