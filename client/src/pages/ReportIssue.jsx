// Report Issue Page - Submit new civic complaints
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { issuesAPI } from '../api/api';
import { toast } from 'react-toastify';                          // was missing before
import { addNotification } from '../utils/notifications';
      // ADD these two imports at the top


function ReportIssue() {
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // State for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Category options
  const categories = [
    'Road Damage',
    'Garbage',
    'Water Leakage',
    'Street Light',
    'Drainage',
    'Other'
  ];

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form
    if (!title || !description || !category || !location) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('location', location);
      formData.append('userId', user.id);

      // Append image if selected
      if (image) {
        formData.append('image', image);
      }

      // Call API to create issue
      const data = await issuesAPI.create(formData);



// REPLACE the success block inside handleSubmit:
if (data.message === 'Issue submitted successfully') {
  // Notify the user who submitted
  addNotification({
    message: `Your issue "${title}" has been submitted successfully!`,
    type: 'success',
    userId: user.id,
    forAdmin: false
  });

  // Notify admin
  addNotification({
    message: `New issue "${title}" reported at ${location}`,
    type: 'info',
    forAdmin: true
  });

  toast.success('Issue reported successfully');
  setSuccess('Issue reported successfully!');
  setTimeout(() => navigate('/issues'), 1500);
} else {
  setError(data.message || 'Failed to submit issue');
}
    } catch (err) {
      setError('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
 
        <div className="relative min-h-screen bg-[#0B0F4D] overflow-hidden">

    
      {/* Background Glow */}
      <div className="absolute top-[-120px] right-[-200px] w-96 h-96 rounded-full bg-[#CD9B3B]/10 blur-3xl"></div>

      <div className="absolute bottom-0 left-[-110px] w-72 h-72 rounded-full bg-[#CD9B3B]/10 blur-3xl"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Wave 1 */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-20"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#CD9B3B"
          d="M0,192L80,186C160,180,320,160,480,144C640,128,800,120,960,140C1120,160,1280,210,1440,220V320H0Z"
        />
      </svg>

      {/* Wave 2 */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#F4D58D"
          d="M0,250L120,230C240,210,480,170,720,160C960,150,1200,190,1440,230V320H0Z"
        />
      </svg>

      {/* Wave 3 */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-5"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#FFFFFF"
          d="M0,280L100,260C200,240,400,220,600,210C800,200,1000,220,1200,240C1300,250,1380,260,1440,270V320H0Z"
        />
      </svg>
</div>
 

    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#F0CD8B]/20 to-[#15184D] border border-[#CD9B3B] rounded-xl shadow-lg p-8 mb-7 mt-3 text-white">
        <h1 className="text-3xl text-[#CD9B3B] font-bold mb-2">Report an Issue</h1>
        <p className="text-gray-300">Submit a civic complaint and help improve your community</p>
      </div>

      {/* Form Card */}
       <div className="bg-[#15184D]/ backdrop-blur-sm border border-[#CD9B3B] rounded-xl shadow-md">
      <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-lg p-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Issue Title */}
          <div>
            <label className="block text-[#CD9B3B] font-medium mb-2">
              Issue Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 text-gray-200 py-3 bg-[#15184D] border border-[#CD9B3B] rounded-lg focus:ring-2 focus:ring-[#CD9B3B] focus:border-transparent transition"
              placeholder="Brief title of the issue"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#CD9B3B] font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-[#15184D] text-gray-200 border border-[#CD9B3B] rounded-lg focus:ring-2 focus:ring-[#CD9B3B]  transition resize-none"
              rows="5"
              placeholder="Describe the issue in detail..."
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[#CD9B3B] font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-gray-200 px-4 py-3 bg-[#15184D] border border-[#CD9B3B] rounded-lg focus:ring-2 focus:ring-[#CD9B3B] focus:border-transparent transition"
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[#CD9B3B] font-medium mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 text-gray-200 py-3 bg-[#15184D] border border-[#CD9B3B] rounded-lg focus:ring-2 focus:ring-[#CD9B3B] focus:border-transparent transition"
              placeholder="Enter the location (e.g., Main Street, Sector 5)"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-[#CD9B3B] font-medium mb-2">
              Upload Image (Optional)
            </label>
            <div className="mt-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-[#CD9B3B] rounded-lg cursor-pointer hover:border-[#CD9B3B] transition"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain rounded"
                  />
                ) : (
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#CD9B3B] hover:bg-[#B8860B]'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Issue'}
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}

export default ReportIssue;
