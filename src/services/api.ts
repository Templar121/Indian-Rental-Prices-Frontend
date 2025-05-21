import { useState, useEffect } from 'react';

const API_BASE_URL = 'https://indian-housing-prices-backend.onrender.com';
const KOLKATA_API_URL = 'http://0.0.0.0:8001'; // Separate API for Kolkata

export const useApiStatus = (isKolkata = false) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setIsLoading(true);
        const baseUrl = isKolkata ? KOLKATA_API_URL : API_BASE_URL;
        
        // Check API status
        const statusResponse = await fetch(`${baseUrl}/`);
        const statusData = await statusResponse.json();
        
        if (statusData.status !== 'success') {
          throw new Error('API is not ready');
        }

        // Train model
        const trainResponse = await fetch(`${baseUrl}/train`);
        const trainData = await trainResponse.json();
        
        if (trainData.status !== 'success') {
          throw new Error('Model training failed');
        }

        setIsReady(true);
        setError(null);
      } catch (err) {
        setIsReady(false);
        setError('Service initialization failed');
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
  }, [isKolkata]);

  return { isReady, isLoading, error };
};

export const predictPrice = async (data: any, isKolkata = false) => {
  try {
    const baseUrl = isKolkata ? KOLKATA_API_URL : API_BASE_URL;
    
    const response = await fetch(`${baseUrl}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Prediction failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Failed to get prediction');
  }
};