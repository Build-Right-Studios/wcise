import React, { useState } from 'react';
const predefinedTags = [
  'AI', 'Machine Learning', 'Deep Learning', 'NLP', 'Data Science',
  'IoT', 'Cybersecurity', 'Blockchain', 'Cloud Computing', 'Big Data',
  'Computer Vision', 'Robotics', 'Embedded Systems', 'Software Engineering', 'Web Development',
  'Mobile Computing', 'Image Processing', 'Neural Networks', 'Fuzzy Logic', 'Quantum Computing',
  'Bioinformatics', 'AR/VR', 'Digital Signal Processing', 'Wireless Networks', '5G Technology',
  'Data Mining', 'Natural Language Generation', 'Ethical AI', 'Edge Computing', 'Autonomous Vehicles',
  'Smart Cities', 'Sustainable Computing', 'Reinforcement Learning', 'GPU Computing', 'Operating Systems',
  'Compiler Design', 'Cyber Law', 'HCI', 'Game Development', 'Distributed Systems',
  'E-Learning', 'Information Retrieval', 'Database Systems', 'Data Structures', 'Algorithms',
  'Pattern Recognition', 'Knowledge Representation', 'Semantic Web', 'Virtual Reality', 'Speech Recognition'
];
function Authorcomponent() {
    const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: [],
    file: null,
  });

  const toggleKeyword = (tag) => {
    setFormData((prev) => {
      const alreadySelected = prev.keywords.includes(tag);
      return {
        ...prev,
        keywords: alreadySelected
          ? prev.keywords.filter((t) => t !== tag)
          : [...prev.keywords, tag],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Form submitted!');
  };
  return (
    <div>
 <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-[#1d3b58] mb-6">Submit Your Research Paper</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1 text-[#1d3b58]">Paper Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-[#1d3b58]">Abstract</label>
          <textarea
            name="abstract"
            required
            rows="5"
            value={formData.abstract}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>
         <div>
          <label className="block font-medium mb-2 text-[#1d3b58]">Select Tags (Keywords)</label>
          <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
            {predefinedTags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => toggleKeyword(tag)}
                className={`px-3 py-1 text-sm rounded-full border transition-all ${
                  formData.keywords.includes(tag)
                    ? 'bg-[#1d3b58] text-white'
                    : 'bg-white text-[#1d3b58] border-[#1d3b58]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1 text-[#1d3b58]">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            required
            className="w-full border p-3 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#1d3b58] hover:bg-[#163048] text-white py-3 rounded-lg font-semibold transition-all"
        >
          Submit Paper
        </button>
      </form>
    </div>
    </div>
  );
}

export default Authorcomponent;
