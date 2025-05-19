import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../style/NewCardPage.css';
import axios from 'axios';

const socialPlatforms = [
  'facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'snapchat', 'pinterest', 'tiktok',
  'reddit', 'tumblr', 'whatsapp', 'telegram', 'discord', 'twitch', 'medium', 'github', 'behance',
  'dribbble', 'flickr', 'vimeo'
];

function NewCardPage() {
  const [selectedSection, setSelectedSection] = useState('design');
  const [selectedFrame, setSelectedFrame] = useState('frame1');
  const [colorType, setColorType] = useState('solid');
  const [formData, setFormData] = useState({
    prefix: '', firstName: '', lastName: '', suffix: '', preferredName: '',
    title: '', department: '', company: '', headline: '',
    color: '#ff5722',
    gradientStart: '#ff5722',
    gradientEnd: '#ff9800',
    logo: '',
    coverImage: '',
    shape: 'rectangle',
    socialLinks: socialPlatforms.reduce((links, platform) => ({
      ...links,
      [platform]: ''
    }), {}),
  });

  const [showSocialDialog, setShowSocialDialog] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/login');
      return;
    }

    if (location.state?.card) {
      const existingSocialLinks = location.state.card.socialLinks || {};
      const mergedSocialLinks = socialPlatforms.reduce((links, platform) => ({
        ...links,
        [platform]: existingSocialLinks[platform] || ''
      }), {});

      if (isMounted) {
        setFormData({
          ...location.state.card,
          socialLinks: mergedSocialLinks
        });
        setSelectedFrame(location.state.card.selectedFrame || 'frame1');
        setColorType(location.state.card.colorType || 'solid');
      }
    }

    return () => { isMounted = false; };
  }, [location, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, logo: reader.result });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCoverImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, coverImage: reader.result });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    setError('');

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First name and last name are required to save the card.');
      setIsSaving(false);
      return;
    }

    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('Authentication token is missing.');
      navigate('/login');
      setIsSaving(false);
      return;
    }

  const requestBodyCardInfo = {
      Oid: location.state?.card?.Oid || 0,
      Photo: formData.coverImage,
      Logo: formData.logo,
      Displaydesign: selectedFrame,
      Color: colorType === 'solid' 
        ? formData.color 
        : `${formData.gradientStart},${formData.gradientEnd}`,
      firstname: formData.firstName,
      middlename: '',
      Lastname: formData.lastName,
      prefix: formData.prefix,
      sufix: formData.suffix,
      Accreditations: '',
      PreferredName: formData.preferredName,
      MaidenName: '',
      Pronouns: '',
      Title: formData.title,
      Department: formData.department,
      Company: formData.company,
      Headline: formData.headline
    };

    try {
      const method = location.state?.card ? 'put' : 'post';
      const url = location.state?.card 
        ? `/api/odata/cardsinfo(${location.state.card.Oid})`
        : '/api/odata/cardsinfo';

      const response = await axios[method](url, requestBodyCardInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if (!location.state?.card) {
        await axios.post('/api/odata/Cards', {
          Name: formData.firstName || 'Unnamed',
          totalview: 0,
          totalsaves: 0,
          pausecard: false
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
          }
        });
      }

      navigate('/home');
    } catch (error) {
      console.error('Error saving card:', error);
      setError(`Failed to save card: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => navigate('/home');

  const handleShapeChange = (shape) => {
    setFormData({ ...formData, shape });
  };

  const handleSocialIconClick = (platform) => {
    setCurrentPlatform(platform);
    setCurrentUrl(formData.socialLinks[platform] || '');
    setShowSocialDialog(true);
  };

  const handleSocialSave = () => {
    if (!currentUrl.startsWith('http')) {
      setError('Please enter a valid URL starting with http/https.');
      return;
    }
    
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [currentPlatform]: currentUrl
      }
    });
    setShowSocialDialog(false);
    setError('');
  };

  const handleFrameChange = (frame) => {
    setSelectedFrame(frame);
  };

  const getDarkerColor = (color) => {
    let colorInt = parseInt(color.slice(1), 16);
    let r = (colorInt >> 16) - 30;
    let g = ((colorInt >> 8) & 0x00FF) - 30;
    let b = (colorInt & 0x0000FF) - 30;
    r = Math.max(0, r);
    g = Math.max(0, g);
    b = Math.max(0, b);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const getGradientColor = () => {
    return `linear-gradient(135deg, ${formData.gradientStart}, ${formData.gradientEnd})`;
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const setRandomGradient = () => {
    const start = getRandomColor();
    const end = getRandomColor();
    setFormData({ ...formData, gradientStart: start, gradientEnd: end });
  };
  

  return (
    <div className="new-card-page">
      <Sidebar />
      <div className="new-card-layout">
      <div className={`new-card-card ${selectedFrame} ${formData.shape}`}>
  
  
      <div
        className="card-header"
        style={{
          backgroundColor: colorType === 'solid' ? formData.color : undefined,
          background: colorType === 'gradient' ? getGradientColor() : undefined
        }}
          >
            {formData.logo && <img src={formData.logo} alt="Logo" className="card-logo" />}
            {/* Cover image if uploaded */}
            {formData.coverImage && (
              <div className="card-cover">
                <img src={formData.coverImage} alt="Cover" className="card-cover-image" />
              </div>
            )}
  </div>

  <div className="new-card-content">
    {/* Vertical dashed line */}
    <div className="dashed-line"></div>
    
    <h1 className="new-card-title">
      {`${formData.prefix} ${formData.firstName} ${formData.lastName} ${formData.suffix}`}
    </h1>
    <p className="new-card-title-extra">{formData.title}</p>
    <p
        className="new-card-department"
        style={{ color: formData.color }} // Apply the selected color
      >
        {formData.department}
      </p>    
    <p className="new-card-company">{formData.company}</p>
  </div>
  <p className="new-card-headline">{formData.headline}</p>
    <p className="new-card-preferredName">
      <i className="fas fa-user-circle"></i> {/* Example icon for preferred name */}
      {formData.preferredName}
    </p>
    {/* Social Links */}
    <div className="social-links-container">
            {Object.entries(formData.socialLinks).map(([platform, url]) => (
              url && (
                <div key={platform} className="social-link-item">
                  <div className="social-icon-circle">
                    <i className={`fab fa-${platform}`}></i>
                  </div>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="social-link-url">
                    {url}
                  </a>
                </div>
              )
            ))}
          </div>
        </div>

        <div className="new-card-details-container">
          <div className="new-card-tabs">
            <button
              className={selectedSection === 'design' ? 'active' : ''}
              onClick={() => setSelectedSection('design')}
            >
              Design
            </button>
            <button
              className={selectedSection === 'info' ? 'active' : ''}
              onClick={() => setSelectedSection('info')}
            >
              Info
            </button>
            <button
              className={selectedSection === 'widget' ? 'active' : ''}
              onClick={() => setSelectedSection('widget')}
            >
              Widget
            </button>
            <button
              className={selectedSection === 'other' ? 'active' : ''}
              onClick={() => setSelectedSection('other')}
            >
              Other
            </button>
          </div>

          <div className="new-card-section11">
            {selectedSection === 'design' && (
              <div className="design-options">
                <h3>Choose Frame</h3>
                <div className="frame-selector">
                  <div className="frame" onClick={() => handleFrameChange('frame1')}>
                    <img src="/assets/1.png" alt="Frame 1" className="frame-image" />
                  </div>
                  <div className="frame" onClick={() => handleFrameChange('frame2')}>
                    <img src="/assets/1.2.png" alt="Frame 2" className="frame-image" />
                  </div>
                  <div className="frame" onClick={() => handleFrameChange('frame3')}>
                    <img src="/assets/1.3.png" alt="Frame 3" className="frame-image" />
                  </div>
                  <div className="frame" onClick={() => handleFrameChange('frame4')}>
                    <img src="/assets/1.4.png" alt="Frame 4" className="frame-image" />
                  </div>
                  <div className="frame" onClick={() => handleFrameChange('frame5')}>
                    <img src="/assets/1.png" alt="Frame 5" className="frame-image" />
                  </div>
                </div>


                <h3>Card Color</h3>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
                <div>
                  <label>
                    <input type="radio" name="colorType" value="solid" checked={colorType === 'solid'} onChange={() => setColorType('solid')} /> Solid Color
                  </label>
                  <br></br>
                  <label>
                    <input type="radio" name="colorType" value="gradient" checked={colorType === 'gradient'} onChange={() => setColorType('gradient')} /> Gradient Color
                  </label>
                </div>
                {colorType === 'gradient' && (
                  <div className="gradient-controls">
                    <input
                      type="color"
                      value={formData.gradientStart}
                      onChange={(e) =>
                        setFormData({ ...formData, gradientStart: e.target.value })
                      }
                    />
                    <input
                      type="color"
                      value={formData.gradientEnd}
                      onChange={(e) =>
                        setFormData({ ...formData, gradientEnd: e.target.value })
                      }
                    />
                    <button onClick={setRandomGradient}>🎨 Random Gradient</button>
                  </div>
                )}


                <h3>Upload Logo</h3>
                <input type="file" accept="image/*" onChange={handleLogoChange} />

                {/* New section for uploading cover image */}
                <h3>Upload Cover Image</h3>
                <input type="file" accept="image/*" onChange={handleCoverImageChange} />

                <h3>Card Shape</h3>
                <div className="shape-selector">
                  <button onClick={() => handleShapeChange('rectangle')}>Rectangle</button>
                  <button onClick={() => handleShapeChange('rounded')}>Rounded</button>
                </div>
              </div>
            )}

            {selectedSection === 'info' && (
              <div className="info-options">
                <h3>Card Information</h3>
                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                <form>
                  <label>Prefix: <input type="text" name="prefix" value={formData.prefix} onChange={handleChange} /></label>
                  <label>First Name: <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} /></label>
                  <label>Last Name: <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} /></label>
                  <label>Suffix: <input type="text" name="suffix" value={formData.suffix} onChange={handleChange} /></label>
                  <label>Preferred Name: <input type="text" name="preferredName" value={formData.preferredName} onChange={handleChange} /></label>
                  <label>Title: <input type="text" name="title" value={formData.title} onChange={handleChange} /></label>
                  <label>Department: <input type="text" name="department" value={formData.department} onChange={handleChange} /></label>
                  <label>Company: <input type="text" name="company" value={formData.company} onChange={handleChange} /></label>
                  <label>Headline: <input type="text" name="headline" value={formData.headline} onChange={handleChange} /></label>
                </form>
              </div>
            )}

          {selectedSection === 'widget' && (
            <div className="widget-options">
              <h3>Social Links</h3>
              <div className="social-icons">
                {socialPlatforms.map((platform) => (
                  <button 
                    key={platform} 
                    className={`social-icon-button ${formData.socialLinks[platform] ? 'active' : ''}`}
                    onClick={() => handleSocialIconClick(platform)}
                  >
                    <i className={`fab fa-${platform}`}></i>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}            

            {selectedSection === 'other' && (
              <div className="other-options">
                <h3>Other Settings</h3>
                {/* Add other settings fields as needed */}
              </div>
            )}
          </div>
          {showSocialDialog && (
  <div className="zingster-modal-overlay">
    <div className="zingster-modal">
      <button className="zingster-modal-close" onClick={() => setShowSocialDialog(false)}>×</button>
      <h3>Add {currentPlatform} URL</h3>
      <input
        type="text"
        className="zingster-modal-input"
        value={currentUrl}
        onChange={(e) => setCurrentUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <div className="zingster-modal-actions">
        <button className="zingster-save-btn" onClick={handleSocialSave}>Save</button>
        <button className="zingster-cancel-btn" onClick={() => setShowSocialDialog(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}



          <div className="new-card-actions">
            <button 
              className="save-button" 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Card'}
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCardPage;
