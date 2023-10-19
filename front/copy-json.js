const fs = require('fs');
const path = require('path');

function copyJsonFiles(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  entries.forEach((entry) => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyJsonFiles(srcPath, destPath);
    } else if (entry.isFile() && path.extname(entry.name) === ".json") {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

const srcDir = "src";
const destDir = "src";
fs.mkdirSync(destDir, { recursive: true });
copyJsonFiles(srcDir, destDir);
