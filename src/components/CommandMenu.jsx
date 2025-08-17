import React from 'react';
import { Command } from 'cmdk';
import { 
  FaRegLightbulb, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter,
  FaLink
} from 'react-icons/fa';

const CommandMenu = ({ open, setOpen }) => {

  // A helper function to open links and close the menu
  const openLink = (url) => {
    window.open(url, '_blank');
    setOpen(false);
  };
  
  // Define your links in an array for cleaner code
  const links = [
    {
      url: '#', // Replace with your actual portfolio link if different
      label: 'Personal Website',
      icon: <FaLink className="mr-3 text-slate-400" />,
    },
    {
      url: 'https://github.com/mohitv7891', // Replace with your GitHub URL
      label: 'GitHub',
      icon: <FaGithub className="mr-3 text-slate-400" />,
    },
    {
      url: 'https://linkedin.com/in/mohitvishwkarma', // Replace with your LinkedIn URL
      label: 'LinkedIn',
      icon: <FaLinkedin className="mr-3 text-slate-400" />,
    },
    {
      url: 'https://x.com/mohitv7891', // Replace with your X/Twitter URL
      label: 'X',
      icon: <FaTwitter className="mr-3 text-slate-400" />,
    }
  ];

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu">
      {/* The search icon and input field */}
      <div className="flex items-center px-4 border-b border-slate-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <Command.Input placeholder="Type a command or search..." />
      </div>

      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        {/* This item is not in a group to appear at the top */}
        <Command.Item onSelect={() => alert("Theme Toggled!")}>
          <FaRegLightbulb className="mr-3 text-slate-400" />
          <span>Toggle Theme</span>
        </Command.Item>

        <Command.Group heading="Links">
          {links.map((link) => (
            <Command.Item key={link.url} onSelect={() => openLink(link.url)}>
              {link.icon}
              <span>{link.label}</span>
            </Command.Item>
          ))}
        </Command.Group>

      </Command.List>
    </Command.Dialog>
  );
};

export default CommandMenu;