// API Configuration
// Base URL for the backend server
const API_BASE_URL = 'http://localhost:5001/api';

// Authentication API calls
export const authAPI = {
  // Signup - Create new user account
  signup: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return response.json();
  },

  // Login - Authenticate user
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  }
};

// Issues API calls
export const issuesAPI = {
  // Get all issues (with optional filters)
  getAll: async (filters = {}) => {
    // Build query string from filters
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.status) params.append('status', filters.status);

    const queryString = params.toString();
    const url = `${API_BASE_URL}/issues${queryString ? '?' + queryString : ''}`;

    const response = await fetch(url);
    return response.json();
  },

  // Get single issue by ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/issues/${id}`);
    return response.json();
  },

  // Create new issue
  create: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/issues`, {
      method: 'POST',
      body: formData // FormData for file upload
    });
    return response.json();
  },

  // Update issue status
  updateStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/issues/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response.json();
  },

  // Delete issue
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/issues/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};
