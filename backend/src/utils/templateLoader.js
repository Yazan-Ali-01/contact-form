import fs from 'fs';
import path from 'path';

export const loadTemplate = (templateName, replacements) => {
  const templatePath = path.join(__dirname, '../templates', `${templateName}.html`);
  let template = fs.readFileSync(templatePath, 'utf8');

  for (const key in replacements) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    template = template.replace(regex, replacements[key]);
  }

  return template;
};
