import { useEffect, useState } from "react";

// Create a formatter for formatting currency values
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Define the props for the Currency component
interface CurrencyProps {
  value?: string | number; // The numeric value to be formatted as currency
}

const Currency: React.FC<CurrencyProps> = ({
  value = 0 // Default value is 0 if not provided
}) => {
  const [isMounted, setIsMounted] = useState(false);

  // When the component mounts, set isMounted to true
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If the component is not mounted, return null
  if (!isMounted) {
    return null;
  }

  // Render the formatted currency value using the formatter
  return ( 
    <div className="font-semibold">
      {formatter.format(Number(value))}
    </div>
  );
}

export default Currency;
