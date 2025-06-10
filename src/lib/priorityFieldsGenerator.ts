export const priorityFieldsGenerator = (value: string): {
    label: string;
    color: string;
} => {
    switch (value) {
      case 'very_low':
        return {
          label: 'Very Low',
          color: 'bg-gray-300 text-black hover:bg-gray-500 cursor-pointer',
        };
      case 'low':
        return {
          label: 'Low',
          color: 'bg-lime-400 text-black hover:bg-lime-600 cursor-pointer',
        };
      case 'medium':
        return {
          label: 'Medium',
          color: 'bg-yellow-400 text-gray-800 hover:bg-yellow-600 cursor-pointer',
        };
      case 'high':
        return {
          label: 'High',
          color: 'bg-orange-500 text-white hover:bg-orange-600',
        };
      case 'very_high':
        return {
          label: 'Very High',
          color: 'bg-red-500 text-white hover:bg-red-600 cursor-pointer',
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-400 hover:bg-gray-500 cursor-pointer',
        };
    }
  };
  