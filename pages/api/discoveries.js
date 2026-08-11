import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dataFile = path.join(process.cwd(), 'data', 'discoveries.json');
  
  if (!fs.existsSync(dataFile)) {
    return res.json([]);
  }
  
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  res.json(data);
}