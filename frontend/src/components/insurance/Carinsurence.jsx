import React, { useState } from 'react';

const CarInsuranceChecker = () => {
  const [plateNumber, setPlateNumber] = useState('');
  const [insuranceDetails, setInsuranceDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setPlateNumber(e.target.value.toUpperCase());
  };

  const handleSubmit = () => {
    if (!plateNumber) {
      alert('Please enter a valid plate number.');
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setInsuranceDetails(response);
          setError(null);
        } else if (xhr.status === 403) {
          setError('Access denied (403). Check your API key or plan.');
        } else if (xhr.status === 429) {
          setError('Rate limit exceeded (429). Try again later.');
        } else {
          setError('Failed to fetch insurance details.');
        }
      }
    };

    xhr.open(
      'GET',
      `https://check-car-insurance-italy-controllo-assicurazione-targa-italia.p.rapidapi.com/insurance?plateNumber=${plateNumber}&vehicleType=car`
    );
    xhr.setRequestHeader('x-rapidapi-key', 'e60395275fmsh26266b3cd8b26bfp140692jsn20d4b2df6552');
    xhr.setRequestHeader('x-rapidapi-host', 'check-car-insurance-italy-controllo-assicurazione-targa-italia.p.rapidapi.com');
    xhr.send(null);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Car Insurance Checker</h2>

      <input
        type="text"
        placeholder="Enter Plate Number (e.g., FA223EH)"
        value={plateNumber}
        onChange={handleInputChange}
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button onClick={handleSubmit} style={{ padding: '8px 16px' }}>
        Check Insurance
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {insuranceDetails && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Insurance Details</h3>
          <p><strong>Plate:</strong> {insuranceDetails.licencePlate}</p>
          <p><strong>Description:</strong> {insuranceDetails.description}</p>
          <p><strong>Insured:</strong> {insuranceDetails.hasInsurance ? 'Yes' : 'No'}</p>
          <p><strong>Company:</strong> {insuranceDetails.insuranceCompany}</p>
          <p><strong>Policy No:</strong> {insuranceDetails.insuranceNumber}</p>
          <p><strong>Insurance Expired:</strong> {insuranceDetails.insuranceExpiryDate ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default CarInsuranceChecker;
