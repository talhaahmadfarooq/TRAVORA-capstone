const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/^import React from 'react';\r?\n/m, '');
    content = content.replace(/^import React, \{(.*?)\} from 'react';/m, 'import {$1} from \'react\';');

    content = content.replace(/import \{(.*?)HTMLAttributes(.*?)from 'react';/g, (match) => {
        if (!match.includes('type HTMLAttributes')) return match.replace('HTMLAttributes', 'type HTMLAttributes');
        return match;
    });

    content = content.replace(/import \{(.*?)ImgHTMLAttributes(.*?)from 'react';/g, (match) => {
        if (!match.includes('type ImgHTMLAttributes')) return match.replace('ImgHTMLAttributes', 'type ImgHTMLAttributes');
        return match;
    });
    
    content = content.replace(/import \{(.*?)ButtonHTMLAttributes(.*?)from 'react';/g, (match) => {
        if (!match.includes('type ButtonHTMLAttributes')) return match.replace('ButtonHTMLAttributes', 'type ButtonHTMLAttributes');
        return match;
    });

    content = content.replace(/import \{(.*?)ReactNode(.*?)from 'react';/g, (match) => {
        if (!match.includes('type ReactNode')) return match.replace('ReactNode', 'type ReactNode');
        return match;
    });

    if (filePath.endsWith('DestinationDetailPage.tsx')) {
        content = content.replace(', Thermometer', '');
    }
    if (filePath.endsWith('ExplorePage.tsx')) {
        content = content.replace('const matchesMood =', '// const matchesMood =');
    }
    if (filePath.endsWith('FlightsPage.tsx')) {
        content = content.replace(', mockJourneySearch', '');
        content = content.replace(', Clock, Filter', ', Filter');
        content = content.replace("import { Badge } from '../components/ui/Badge';", "");
    }
    if (filePath.endsWith('StaysPage.tsx')) {
        content = content.replace(', mockDestinations', '');
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
files.forEach(processFile);
console.log('Done');
