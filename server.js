import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));

const publicFiles = {
    '/': {
        filename: 'index.html',
        contentType: 'text/html; charset=utf-8',
    },
    '/style.css': {
        filename: 'style.css',
        contentType: 'text/css; charset=utf-8',
    },
    '/processor.js': {
        filename: 'processor.js',
        contentType: 'text/javascript; charset=utf-8',
    }
};

