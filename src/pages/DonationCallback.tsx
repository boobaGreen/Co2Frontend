// src/components/DonationCallback/DonationCallback.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../elements/Loading";

interface DonationDetails {
  // Definisci la struttura dell'oggetto donationDetails
  // in base ai dati che ricevi dall'API
  amount: number;
  donorName: string;
  // Altri campi pertinenti
}

const DonationCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [donationDetails, setDonationDetails] =
    useState<DonationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const context = queryParams.get("context");
    const status = queryParams.get("don_status");

    if (!context || !status) {
      setError("Invalid context or status");
      return;
    }

    if (status !== "success") {
      setError("Donation failed");
      return;
    }

    const fetchDonationDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://app.plant-for-the-planet.org/app/donations/${context}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: DonationDetails = await response.json();
        setDonationDetails(data);
      } catch (error) {
        setError("Error fetching donation details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationDetails();
  }, [location]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (loading || !donationDetails) {
    return <Loading />;
  }

  return (
    <div className="donation-callback">
      <h1>Donation Successful!</h1>
      <p>Thank you for your donation. Here are the details:</p>
      <pre>{JSON.stringify(donationDetails, null, 2)}</pre>
      <button onClick={() => navigate("/")}>Return to landing page</button>
    </div>
  );
};

export default DonationCallback;
