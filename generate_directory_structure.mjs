import { readdirSync, statSync, writeFileSync, readFileSync } from 'fs';
import { join, relative } from 'path';
import ignore from 'ignore';

function generateDirectoryStructure(dirPath, indent = '', ignore) {
  const files = readdirSync(dirPath);
  let structure = '';

  for (const file of files) {
    const filePath = join(dirPath, file);
    const stats = statSync(filePath);

    if (!stats.isDirectory()) {
      // Exclude ignored files
      if (ignore.ignores(file)) {
        continue;
      }
    }

    const relativePath = relative(dirPath, filePath);

    // Exclude specific directories
    if (stats.isDirectory() && (file === 'node_modules' || file === '.git')) {
      continue;
    }

    structure += `${indent}- ${relativePath}${stats.isDirectory() ? '/' : ''}\n`;

    if (stats.isDirectory()) {
      structure += generateDirectoryStructure(filePath, `${indent}  |`, ignore);
    }
  }

  return structure;
}

const projectDirectory = 'D:/mcr-template';
const ignoreFilePath = 'D:/mcr-template/.gitignore'; // Path to the .gitignore file
const ignoreContent = readFileSync(ignoreFilePath, 'utf8');
const ignoreRules = ignore().add(ignoreContent);
const directoryStructure = generateDirectoryStructure(projectDirectory, '', ignoreRules);
const markdownContent = `\`\`\`\n${directoryStructure}\`\`\``;
writeFileSync('project_directory.md', markdownContent);
