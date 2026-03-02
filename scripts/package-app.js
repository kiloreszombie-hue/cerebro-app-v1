'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const distRoot = path.join(projectRoot, 'dist');
const outputDir = path.join(distRoot, 'cerebro-app');
const zipName = 'cerebro-app.zip';
const zipPath = path.join(distRoot, zipName);

const itemsToCopy = ['index.html', 'css', 'js', 'README.md', 'LICENSE', 'package.json'];

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function removeIfExists(targetPath) {
    if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
    }
}

function copyRecursive(src, dest) {
    const stat = fs.statSync(src);

    if (stat.isDirectory()) {
        ensureDir(dest);
        const entries = fs.readdirSync(src);

        for (const entry of entries) {
            copyRecursive(path.join(src, entry), path.join(dest, entry));
        }

        return;
    }

    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
}

function createZip() {
    const hasZip = (() => {
        try {
            execSync('zip -v', { stdio: 'ignore' });
            return true;
        } catch (error) {
            return false;
        }
    })();

    if (!hasZip) {
        console.log('⚠️ zip no está disponible. Se creó la carpeta lista para usar, pero no el .zip.');
        return;
    }

    removeIfExists(zipPath);
    execSync(`cd "${distRoot}" && zip -rq "${zipName}" "${path.basename(outputDir)}"`);
    console.log(`✅ ZIP generado en: ${zipPath}`);
}

function run() {
    removeIfExists(outputDir);
    ensureDir(outputDir);

    for (const item of itemsToCopy) {
        const sourcePath = path.join(projectRoot, item);
        const destinationPath = path.join(outputDir, item);

        if (!fs.existsSync(sourcePath)) {
            console.log(`⚠️ No se encontró ${item}, se omite.`);
            continue;
        }

        copyRecursive(sourcePath, destinationPath);
    }

    console.log(`✅ Carpeta lista en: ${outputDir}`);
    createZip();
}

run();
