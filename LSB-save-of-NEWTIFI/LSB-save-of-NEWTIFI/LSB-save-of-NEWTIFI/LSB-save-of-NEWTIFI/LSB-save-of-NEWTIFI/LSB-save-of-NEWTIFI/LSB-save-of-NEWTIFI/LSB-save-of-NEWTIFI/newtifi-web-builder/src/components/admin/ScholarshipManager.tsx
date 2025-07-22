import React, { useState } from 'react';

interface ScholarshipCall {
  id: string;
  title: string;
  deadline: string;
  status: 'active' | 'closed' | 'upcoming';
  applicants: number;
  description: string;
  fields: string[];
  flyerUrl?: string;
}

interface Applicant {
  id: string;
  name: string;
  field: string;
  contact: string;
  status: 'pending' | 'approved' | 'rejected';
  cvUrl?: string;
}

interface ScholarshipManagerProps {
  calls?: ScholarshipCall[];
  applicants?: Applicant[];
}

const ScholarshipManager: React.FC<ScholarshipManagerProps> = ({ calls = [], applicants = [] }) => {
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const getStatusColor = (status: string) => {
    if (status === 'active') return 'bg-green-100 text-green-800';
    if (status === 'closed') return 'bg-red-100 text-red-800';
    if (status === 'upcoming') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getProgressPercentage = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const total = deadlineDate.getTime() - new Date(deadline).setMonth(new Date(deadline).getMonth() - 3);
    const elapsed = now.getTime() - new Date(deadline).setMonth(new Date(deadline).getMonth() - 3);
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  if (showForm) {
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">New Scholarship Call</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setShowForm(false)}
          >
            ✕
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea className="w-full border rounded p-2 min-h-[120px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Deadline</label>
              <input type="date" className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fields</label>
              <select multiple className="w-full border rounded p-2">
                <option value="healthtech">HealthTech</option>
                <option value="foodtech">FoodTech</option>
                <option value="energytech">EnergyTech</option>
                <option value="fintech">FinTech</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Flyer</label>
            <input type="file" className="w-full border rounded p-2" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-[#0A0A23] text-white px-4 py-2 rounded">Create Call</button>
            <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Scholar Funding Program Manager</h2>
        <button 
          className="bg-[#0A0A23] text-white px-4 py-2 rounded shadow"
          onClick={() => setShowForm(true)}
        >
          + New Call
        </button>
      </div>

      {/* Scholarship Calls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {calls.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-8">No scholarship calls found.</div>
        ) : (
          calls.map((call) => (
            <div 
              key={call.id} 
              className="bg-white border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedCall(selectedCall === call.id ? null : call.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-sm">{call.title}</h3>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(call.status)}`}>
                  {call.status}
                </span>
              </div>
              <div className="text-xs text-gray-600 mb-2">Deadline: {call.deadline}</div>
              <div className="text-xs text-gray-600 mb-3">Applicants: {call.applicants}</div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-blue-600 h-1 rounded-full" 
                  style={{ width: `${getProgressPercentage(call.deadline)}%` }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Applicants Table */}
      {selectedCall && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Applicants</h3>
            <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Field</th>
                  <th className="p-2 text-left">Contact</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">CV</th>
                </tr>
              </thead>
              <tbody>
                {applicants.length === 0 ? (
                  <tr><td colSpan={5} className="text-center text-gray-400 py-4">No applicants found.</td></tr>
                ) : (
                  applicants.map((applicant) => (
                    <tr key={applicant.id} className="border-b">
                      <td className="p-2">{applicant.name}</td>
                      <td className="p-2">{applicant.field}</td>
                      <td className="p-2">{applicant.contact}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(applicant.status)}`}>
                          {applicant.status}
                        </span>
                      </td>
                      <td className="p-2">
                        {applicant.cvUrl ? (
                          <button className="text-blue-600 hover:underline text-xs">Download</button>
                        ) : (
                          <span className="text-gray-400 text-xs">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScholarshipManager; 