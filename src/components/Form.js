import { useState, useEffect } from 'react';
import { postContentLocker } from '../utils/api';

const Form = () => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    background: 'https://i.postimg.cc/VLVcsYZD/admire-Bac.gif',
    sub_id: '',
  });

  const [shortLink, setShortLink] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const backgroundOptions = [
    { label: 'Admire', value: 'https://i.postimg.cc/VLVcsYZD/admire-Bac.gif' },
    { label: 'Custom', value: ' ' },
  ];

const subIdOptions = [
    { label: 'Superman - 1023190', value: '1023190' },
    { label: 'Aquaman - 1023195', value: '1023195' },
    { label: 'Atom - 1023193', value: '1023193' },
    { label: 'Psylocke - 1023196', value: '1023196' },
    { label: 'Spider-Man - 1023191', value: '1023191' }
];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);

    const handleChange = (e) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBackgroundChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      background: value === 'custom' ? '' : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCopySuccess(false);
    try {
      const result = await postContentLocker(formData);
      if (result.message && result.message.length > 0) {
        const { full_short } = result.message[0];
        if (full_short) {
          setShortLink(full_short);
        } else {
          console.error('Invalid response: Missing full_short');
        }
      } else {
        console.error('Invalid response: Missing or empty message array');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortLink)
      .then(() => setCopySuccess(true))
      .catch((err) => console.error('Failed to copy:', err));
  };

  return (
    <div className={`w-full max-w-md p-6 bg-white rounded-xl shadow-md dark:bg-gray-800 ${darkMode ? 'dark' : ''}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300"
            maxLength="30"
            required
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL</label>
          <input
            type="url"
            name="url"
            id="url"
            value={formData.url}
            onChange={handleChange}
            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300"
            required
          />
        </div>
        <div>
          <label htmlFor="background" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Background</label>
          <select
            name="background"
            id="background"
            value={formData.background}
            onChange={handleBackgroundChange}
            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300"
            required
          >
            {backgroundOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {formData.background === 'custom' && (
            <input
              type="url"
              name="background"
              id="customBackground"
              value={formData.background}
              onChange={handleChange}
              placeholder="Enter custom background URL"
              className="mt-2 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300"
              required
            />
          )}
        </div>
        <div>
          <label htmlFor="sub_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sub ID</label>
          <select
            name="sub_id"
            id="sub_id"
            value={formData.sub_id}
            onChange={handleChange}
            className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300"
            required
          >
            {subIdOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {shortLink && (
        <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow-md dark:bg-gray-700">
          <p className="text-lg font-semibold dark:text-gray-300">Short Link</p>
          <div className="mt-2 bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
            <a href={shortLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 break-all block dark:text-blue-400">{shortLink}</a>
            <button
              className="mt-2 w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
              onClick={handleCopy}
            >
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;