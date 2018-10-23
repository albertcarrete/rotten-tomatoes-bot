export function toSeoUrl(url) {
  return url.toString()               // Convert to string
      .replace(/\s+/g,'_')            // Change whitespace to dashes
      .toLowerCase()                  // Change to lowercase
      .replace(/[^a-z0-9\-\_]/g,'')     // Remove anything that is not a letter, number or dash
      .replace(/-+/g,'-')             // Remove duplicate dashes
      .replace(/^-*/,'')              // Remove starting dashes
      .replace(/-*$/,'');             // Remove trailing dashes
}