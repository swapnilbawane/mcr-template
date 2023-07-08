const { execSync } = require('child_process');
const readline = require('readline-sync');
const fs = require('fs');
const path = require('path');

// Prompt the user for the desired directory name
const directoryName = readline.question('Enter the directory name for your project: ');

// Create the project directory
fs.mkdirSync(directoryName);

// Navigate into the project directory
process.chdir(directoryName);

// Initialize Git repository
execSync('git init', { stdio: 'inherit' });

// Create package.json file
fs.writeFileSync('package.json', JSON.stringify({
  name: directoryName,
  version: '1.0.0',
  private: true
}, null, 2));

// Create additional files and directories
const filesAndDirectories = [
    '.eslintrc.cjs',
    '.gitignore',
    'index.html',
    'package-lock.json',
    'README.md',
    'vite.config.js',
    'public/',
    'src/App.css',
    'src/App.jsx',
    'src/assets/',
    'src/Home/Home.jsx',
    'src/index.css',
    'src/main.jsx'
  ];

for (const fileOrDir of filesAndDirectories) {
  const filePath = path.join(process.cwd(), fileOrDir);
  
  if (fileOrDir.endsWith('/')) {
    // Create directory
    fs.mkdirSync(filePath);
  } else {
    // Create file
    fs.writeFileSync(filePath, '', 'utf-8');
  }
}

console.log('Project initialization complete!');