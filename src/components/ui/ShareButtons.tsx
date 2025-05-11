'use client'

import { useState } from 'react'
import { FaTwitter, FaFacebook, FaLinkedin, FaEnvelope, FaLink } from 'react-icons/fa'

type ShareButtonsProps = {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  const shareLinks = [
    {
      name: 'Twitter',
      icon: <FaTwitter size={16} />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#1DA1F2] hover:bg-[#0c85d0]'
    },
    {
      name: 'Facebook',
      icon: <FaFacebook size={16} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#4267B2] hover:bg-[#365899]'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin size={16} />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: 'bg-[#0077B5] hover:bg-[#006099]'
    },
    {
      name: 'Email',
      icon: <FaEnvelope size={16} />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      color: 'bg-[#DD4B39] hover:bg-[#C23321]'
    }
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 p-1.5 shadow-sm">
      {shareLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${link.color} text-white p-2 rounded-full mx-1 transition-transform hover:scale-110`}
          aria-label={`Share on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        className={`${copied ? 'bg-green-500' : 'bg-gray-600 hover:bg-gray-700'} text-white p-2 rounded-full mx-1 transition-all duration-300 hover:scale-110`}
        aria-label="Copy link"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <FaLink size={16} />
        )}
      </button>
    </div>
  );
}
