import React, { useState } from 'react';

interface Person {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  isPublic: boolean;
  type: 'executive' | 'author' | 'commentator' | 'researcher';
}

interface PeopleManagerProps {
  people?: Person[];
}

const PeopleManager: React.FC<PeopleManagerProps> = ({ people = [] }) => {
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [editBio, setEditBio] = useState('');

  // Default executive team
  const defaultExecutives = [
    { id: '1', name: 'Karlo Definis', role: 'COO', bio: '', imageUrl: '', isPublic: true, type: 'executive' as const },
    { id: '2', name: 'Ezechiel Havrenne', role: 'Chair', bio: '', imageUrl: '', isPublic: true, type: 'executive' as const },
    { id: '3', name: 'Stéphane Lellis', role: 'Vice-Chair', bio: '', imageUrl: '', isPublic: true, type: 'executive' as const },
    { id: '4', name: 'Vlado Sutlovic', role: 'Treasurer', bio: '', imageUrl: '', isPublic: true, type: 'executive' as const },
  ];

  const executives = people.filter(p => p.type === 'executive').length > 0 
    ? people.filter(p => p.type === 'executive') 
    : defaultExecutives;

  const authors = people.filter(p => p.type === 'author');
  const commentators = people.filter(p => p.type === 'commentator');
  const researchers = people.filter(p => p.type === 'researcher');

  if (editingPerson) {
    return (
  <div className="bg-white rounded-lg shadow p-6 w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold">Edit Profile</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setEditingPerson(null)}
          >
            ✕
          </button>
        </div>
        <form className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              {editingPerson.imageUrl ? (
                <img src={editingPerson.imageUrl} alt="" className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <span className="text-gray-500 text-2xl">👤</span>
              )}
            </div>
            <input type="file" className="flex-1" />
          </div>
          <div>
            <label className="block text-base font-medium mb-1">Name</label>
            <input 
              type="text" 
              className="w-full border rounded p-2" 
              defaultValue={editingPerson.name}
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-1">Title</label>
            <input 
              type="text" 
              className="w-full border rounded p-2" 
              defaultValue={editingPerson.role}
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-1">Bio</label>
            <textarea 
              className="w-full border rounded p-2 min-h-[120px]" 
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              placeholder="Enter biography..."
            />
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="public-facing" 
              defaultChecked={editingPerson.isPublic}
              className="mr-2"
            />
            <label htmlFor="public-facing" className="text-base">Public-facing</label>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-[#0A0A23] text-white px-4 py-2 rounded">Save</button>
            <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => setEditingPerson(null)}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-base font-bold">People & Contributors Management</h2>

      {/* Executive Team */}
      <div>
        <h3 className="text-base font-semibold mb-4">Executive Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {executives.map((person) => (
            <div 
              key={person.id} 
              className="bg-white border rounded-lg p-4 text-center relative group cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setEditingPerson(person);
                setEditBio(person.bio);
              }}
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                {person.imageUrl ? (
                  <img src={person.imageUrl} alt="" className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <span className="text-gray-500 text-base">👤</span>
                )}
              </div>
              <h4 className="font-semibold text-base">{person.name}</h4>
              <p className="text-xs text-gray-600">{person.role}</p>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-gray-400 text-base">✏️</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contributors by Type */}
      <div className="space-y-4">
        {[
          { title: 'Authors', people: authors, type: 'author' },
          { title: 'Commentators', people: commentators, type: 'commentator' },
          { title: 'Researchers', people: researchers, type: 'researcher' }
        ].map(({ title, people, type }) => (
          <details key={type} className="bg-white border rounded-lg">
            <summary className="p-4 cursor-pointer font-semibold hover:bg-gray-50">
              {title} ({people.length})
            </summary>
            <div className="p-4 border-t">
              {people.length === 0 ? (
                <p className="text-gray-400 text-base">No {title.toLowerCase()} found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {people.map((person) => (
                    <div 
                      key={person.id} 
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => {
                        setEditingPerson(person);
                        setEditBio(person.bio);
                      }}
                    >
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {person.imageUrl ? (
                          <img src={person.imageUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <span className="text-gray-500 text-base">👤</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-base">{person.name}</div>
                        <div className="text-xs text-gray-600">{person.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default PeopleManager; 