import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PropertyDetails from './PropertyDetails';

const PropertyDetailsRoute: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();

  const property = (location.state as any)?.property || {
    id: slug || 'property-unknown',
    title: 'Dubai Marina Apartment',
    location: 'Dubai Marina',
    price: 2495000,
    image_url: '/view-modern-skyscrapers-shining-sunrise-lights-dubai-marina-dubai-uae-min.webp',
  };

  return (
    <PropertyDetails
      property={property}
      onClose={() => navigate(-1)}
    />
  );
};

export default PropertyDetailsRoute;