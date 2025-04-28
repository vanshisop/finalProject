import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const teamsData = {
  'Real Madrid': [
    { year: 1943, trophies: 1 },
    { year: 1953, trophies: 6 },
    { year: 1956, trophies: 8 },
    { year: 1960, trophies: 12 },
    { year: 1966, trophies: 16 },
    { year: 1978, trophies: 25 }
  ],
  'Barcelona': [
    { year: 1943, trophies: 0 },
    { year: 1953, trophies: 4 },
    { year: 1956, trophies: 6 },
    { year: 1960, trophies: 8 },
    { year: 1966, trophies: 10 },
    { year: 1978, trophies: 15 }
  ],
  'Atlético Madrid': [
    { year: 1943, trophies: 2 },
    { year: 1953, trophies: 5 },
    { year: 1956, trophies: 7 },
    { year: 1960, trophies: 9 },
    { year: 1966, trophies: 11 },
    { year: 1978, trophies: 13 }
  ],
  'Valencia': [
    { year: 1943, trophies: 1 },
    { year: 1953, trophies: 3 },
    { year: 1956, trophies: 5 },
    { year: 1960, trophies: 7 },
    { year: 1966, trophies: 9 },
    { year: 1978, trophies: 10 }
  ],
  'Athletic Bilbao': [
    { year: 1943, trophies: 3 },
    { year: 1953, trophies: 6 },
    { year: 1956, trophies: 8 },
    { year: 1960, trophies: 9 },
    { year: 1966, trophies: 10 },
    { year: 1978, trophies: 12 }
  ]
};

export default function BernabeuDominatio() {
  const [selectedTeam, setSelectedTeam] = useState('Barcelona');

  const newspaperBgStyle = {
    backgroundImage: `
      radial-gradient(at 50% 50%, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0) 70%),
      linear-gradient(0deg, rgba(214, 211, 209, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(214, 211, 209, 0.15) 1px, transparent 1px)
    `,
    backgroundSize: '100% 100%, 10px 10px, 10px 10px',
    backgroundPosition: 'center, center, center',
    backgroundColor: '#fff8e6',
  };

  return (
    <div className="relative min-h-full">
      <div 
        className="absolute inset-0 bg-amber-50" 
        style={{
          backgroundImage: `
            radial-gradient(at 50% 50%, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0) 70%),
            linear-gradient(0deg, rgba(214, 211, 209, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(214, 211, 209, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 15px 15px, 15px 15px',
          backgroundPosition: 'center, center, center'
        }}
      />

      <div className="relative border-4 border-stone-700 p-8 min-h-full shadow-xl bg-amber-50 bg-opacity-90">

        <div className="absolute left-0 top-0 w-full h-4 bg-gradient-to-b from-stone-300 to-transparent opacity-50" />
        <div className="absolute left-0 bottom-0 w-full h-4 bg-gradient-to-t from-stone-300 to-transparent opacity-50" />
        <div className="absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-stone-300 to-transparent opacity-50" />
        <div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-stone-300 to-transparent opacity-50" />
        
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-r from-transparent via-stone-400 to-transparent opacity-20" />

        <div className="absolute top-40 bottom-20 left-20 w-px bg-stone-300 opacity-30" />
        <div className="absolute top-40 bottom-20 right-20 w-px bg-stone-300 opacity-30" />

        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-stone-800 mb-1">REAL MADRID DOMINANCE</h2>
          <p className="text-base font-serif text-stone-700">Trophy count reveals unmatched success under Santiago Bernabeu</p>
        </div>

        <div 
          className="mx-auto max-w-4xl relative p-8 border-2 border-stone-700 shadow-md"
          style={newspaperBgStyle}
        >
          <div className="absolute right-5 top-5 font-serif text-sm text-stone-700">
            CONTINUED ON PAGE 6 ➔
          </div>
          
          <div className="flex justify-between items-center mb-6 border-b border-stone-400 pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-800 mb-1">Trophy Comparison (1943-1978)</h3>
              <p className="font-serif text-sm text-stone-600 italic">Source: Royal Spanish Football Federation Archives</p>
            </div>
            
            <div className="flex items-center">
              <label className="font-serif text-stone-700 mr-2 font-bold">COMPARE WITH:</label>
              <select 
                value={selectedTeam} 
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="py-1 px-3 border-2 border-stone-700 bg-amber-50 text-base font-serif appearance-none pr-8 shadow-sm"
              >
                {Object.keys(teamsData).filter(team => team !== 'Real Madrid').map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-center mb-4 space-x-8">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-black rounded-full mr-2"></div>
              <span className="font-serif font-bold">Real Madrid</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-800 rounded-full mr-2"></div>
              <span className="font-serif font-bold">{selectedTeam}</span>
            </div>
          </div>
          
          <div className="absolute -right-3 -top-3 transform rotate-6 bg-white px-3 py-1 border border-stone-600 text-xs font-serif shadow-sm">
            STATISTICAL ANALYSIS
          </div>

          <div className="relative bg-white bg-opacity-90 p-4 border border-stone-300 shadow-sm">
            <ResponsiveContainer width="100%" height={400} className="relative z-10">
              <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#78716c" opacity={0.2} />
                <XAxis 
                  dataKey="year"
                  type="number"
                  domain={[1943, 1978]}
                  tick={{ fill: '#44403c', fontFamily: 'serif' }}
                  tickCount={7}
                  label={{ 
                    value: 'Year', 
                    position: 'bottom',
                    fill: '#44403c',
                    fontSize: 16,
                    fontFamily: 'serif',
                    fontWeight: 'bold',
                    dy: 15
                  }}
                />
                <YAxis 
                  label={{ 
                    value: 'Trophies', 
                    angle: -90, 
                    position: 'left',
                    fill: '#44403c',
                    fontSize: 16,
                    fontFamily: 'serif',
                    fontWeight: 'bold',
                    dx: -10
                  }}
                  tick={{ fill: '#44403c', fontFamily: 'serif' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fef3c7',
                    border: '2px solid #44403c',
                    borderRadius: 0,
                    fontFamily: 'serif',
                    padding: '10px'
                  }}
                  formatter={(value, name) => [`${value} trophies`, name]}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Line
                  type="monotone"
                  data={teamsData['Real Madrid']}
                  dataKey="trophies"
                  name="Real Madrid"
                  stroke="#000000"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#000000', strokeWidth: 1 }}
                  activeDot={{ r: 7, stroke: '#000000', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  data={teamsData[selectedTeam]}
                  dataKey="trophies"
                  name={selectedTeam}
                  stroke="#991b1b"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#991b1b', strokeWidth: 1 }}
                  activeDot={{ r: 6, stroke: '#991b1b', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-sm text-stone-700 font-serif mt-4 text-justify border-t border-stone-300 pt-3">
            <span className="font-bold">Figure 1:</span> Trophy accumulation comparison between Real Madrid and {selectedTeam} 
            from 1943 to 1978. The dramatic rise of Real Madrid under Santiago Bernabeu's presidency 
            demonstrates unprecedented success, outpacing all domestic rivals in this 35-year period.
          </div>
        </div>
      </div>
    </div>
  );
}