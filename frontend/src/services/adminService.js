import apiClient from './apiService';

export const fetchSubmissions = async () => {
  try {
    const response = await apiClient.get('/admin/submissions');
    console.log(response);
    return response.data.data
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};

export const exportSubmissionsToCSV = async () => {
  try {
    const response = await apiClient.get('/admin/submissions/export', {
      responseType: 'blob', // This is important for downloading files
    });
    // Create a URL for the file blob and prompt the download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'submissions.csv'); // The filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting submissions to CSV:', error);
    throw error;
  }
};
