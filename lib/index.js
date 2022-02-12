#!/usr/bin/env node

import path from 'path';
import { execSync } from 'child_process';
import process from 'process';
import { createRequire } from 'module';
import parseArgs from 'minimist';

const require = createRequire(import.meta.url);

const args = parseArgs(process.argv.slice(2));
if (args.runtime !== undefined) {
    process.env.npm_config_runtime = args.runtime;
}
if (args.target !== undefined) {
    process.env.npm_config_target = args.target;
}
try {
    const fridaPath = require.resolve('frida', { paths : [ process.cwd() ] });
    const moduleDir = path.dirname(fridaPath);
    execSync('npm run install', {
        cwd: moduleDir,
        stdio: 'inherit',
        env: process.env,
    });
} catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
        throw error;
    }
}
