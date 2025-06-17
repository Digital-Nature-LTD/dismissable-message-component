#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Debug utility
function debug(...args) {
    if (process.env.DEBUG || process.env.VERBOSE) {
        console.log('[inlinecss:debug]', ...args);
    }
}

// Recursively find all .html files in a directory
async function findHtmlFiles(dir) {
    debug('Searching for HTML files in:', dir);
    let results = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(await findHtmlFiles(fullPath));
        } else if (entry.isFile() && fullPath.endsWith('.html')) {
            debug('Found HTML file:', fullPath);
            results.push(fullPath);
        }
    }
    return results;
}

// Infer mime type from file extension
function getMimeType(filename) {
    if (/\.svg$/i.test(filename)) return 'image/svg+xml';
    if (/\.png$/i.test(filename)) return 'image/png';
    if (/\.jpe?g$/i.test(filename)) return 'image/jpeg';
    if (/\.gif$/i.test(filename)) return 'image/gif';
    if (/\.webp$/i.test(filename)) return 'image/webp';
    return 'application/octet-stream';
}

function encodeSvgForDataUri(svg) {
    return svg
        .replace(/[\r\n]+/g, '')
        .replace(/>\s+</g, '><')
        .replace(/"/g, '\"')
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
        .replace(/\?/g, '%3F')
        .replace(/&/g, '%26');
}

// Inline all url(...) assets in CSS content
async function inlineCssAssets(cssContent, baseDir) {
    debug('Inlining assets in CSS content for baseDir:', baseDir);
    const urlRegex = /url\(["']?([^)"']+)["']?\)/g;
    let result = cssContent;
    let match;
    while ((match = urlRegex.exec(cssContent)) !== null) {
        const assetRelPath = match[1];
        // Skip absolute/data URLs
        if (/^(data:|https?:|\/\/)/.test(assetRelPath)) {
            debug('Skipping already inlined or external asset:', assetRelPath);
            continue;
        }
        const projectRoot = process.cwd();
        const assetPath = path.resolve(projectRoot, assetRelPath);
        let assetContent;
        try {
            assetContent = await fs.readFile(assetPath);
        } catch (e) {
            console.warn(`Warning: Couldn't read asset ${assetPath}`);
            continue;
        }
        const mime = getMimeType(assetPath);
        let dataUri;

        if (mime === 'image/svg+xml') {
            let svgText = assetContent.toString('utf8');
            svgText = encodeSvgForDataUri(svgText);
            dataUri = `data:image/svg+xml,${svgText}`;
        } else {
            dataUri = `data:${mime};base64,${assetContent.toString('base64')}`;
            debug('Inlined asset:', assetRelPath, 'as', dataUri.slice(0, 80) + '...');
        }
        // Replace all occurrences of this url
        const urlPattern = new RegExp(
            `url\\(["']?${assetRelPath.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}["']?\\)`, 'g'
        );
        result = result.replace(urlPattern, `url('${dataUri}')`);
    }
    return result;
}

// Main function to process all HTML files in a directory
async function inlineCssInHtmlDir(htmlDir) {
    debug('Starting inlineCssInHtmlDir with directory:', htmlDir);
    const htmlFiles = await findHtmlFiles(htmlDir);
    debug('Processing total HTML files:', htmlFiles.length);
    for (const htmlFile of htmlFiles) {
        debug('Processing HTML file:', htmlFile);
        let html = await fs.readFile(htmlFile, 'utf8');
        // Find all <style>...</style> blocks
        const styleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
        let matches;
        let updatedHtml = html;
        let found = false;
        while ((matches = styleRegex.exec(html)) !== null) {
            found = true;
            const fullStyleTag = matches[0];
            const cssContent = matches[1];
            debug('Found <style> block in', htmlFile);
            const inlinedCss = await inlineCssAssets(cssContent, path.dirname(htmlFile));
            const newStyleTag = `<style>\n${inlinedCss}\n</style>`;
            updatedHtml = updatedHtml.replace(fullStyleTag, newStyleTag);
        }
        if (found && updatedHtml !== html) {
            await fs.writeFile(htmlFile, updatedHtml, 'utf8');
            debug('Updated file:', htmlFile);
            console.log(`Processed: ${htmlFile}`);
        } else {
            debug('No changes needed for:', htmlFile);
        }
    }
}

// --- CLI usage ---
const isMain =
    process.argv[1] &&
    fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isMain) {
    if (process.argv.length < 3) {
        console.error('Usage: node inline-images.js <directory>');
        process.exit(1);
    }
    const htmlDir = process.argv[2];
    debug('CLI invoked with directory:', htmlDir);
    inlineCssInHtmlDir(htmlDir).catch(err => {
        console.error(err);
        process.exit(1);
    });
}