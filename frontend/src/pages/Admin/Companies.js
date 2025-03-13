

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminfetchAllCompany } from '../../operations/adminapi';
import AccessToken from './AccessToken';

function Companies() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
 
  const dispatch = useDispatch();
  const token = useSelector((state) => state.admin.token);
  const allcompanies = useSelector((state) => state.admin.allCompany);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(adminfetchAllCompany(token));
      } catch (err) {
        setError('Failed to fetch companies');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, token]);
 
  const handleViewDetails = (companyId) => {
    setSelectedCompanyId(companyId);
    setModalOpen(true);
  };
 
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCompanyId(null);
  };
 
  if (loading) {
    return <div>Loading companies...</div>;
  }
 
  if (error) {
    return <div>{error}</div>;
  }
 
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Our Companies</h2>
      <div className="space-y-4">
        {allcompanies.map((company) => (
          <div
            key={company.id}
            className="flex items-center bg-white shadow-md rounded-lg cursor-pointer p-4 hover:shadow-lg transition-shadow"
          >
            {/* Company Image */}
            <Link 
              to={`/company-profile/${company._id}`}
              className="flex items-center flex-grow"
            >
              <img
                src={company.logo || '/default-company-logo.png'}
                alt={`${company.name} logo`}
                className="w-16 h-16 object-contain mr-4 rounded-full border"
              />
              {/* Company Name */}
              <div className="flex-grow">
                <div className="text-lg font-semibold hover:text-blue-500">
                  {company.name}
                </div>
                <p className="text-gray-500 text-sm">{company.email}</p>
              </div>
            </Link>
           
            {/* Access Token Button */}
            <button
              onClick={() => handleViewDetails(company._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Access Token
            </button>
          </div>
        ))}
      </div>
      {/* Show message if no companies */}
      {allcompanies.length === 0 && (
        <div className="text-center text-gray-500">
          No companies found
        </div>
      )}
     
      {/* Access Token Modal */}
      <AccessToken
        isOpen={modalOpen}
        onClose={handleCloseModal}
        companyId={selectedCompanyId}
      />
    </div>
  );
}

export default Companies;