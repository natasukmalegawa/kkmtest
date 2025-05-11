// Create utils.ts file for helper functions
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Options for formatting
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return date.toLocaleDateString('en-US', options);
}
