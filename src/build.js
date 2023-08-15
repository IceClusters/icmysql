const fs = require('fs');
const { build } = require('esbuild');

build({
    entryPoints: ['./src/index.js'],
    outfile: 'dist/build.js',
    bundle: true,
    platform: 'node',
    logLevel: 'info',
});
fs.writeFileSync('dist/metabuild.js', '', 'utf-8');