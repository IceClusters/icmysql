const { build } = require('esbuild');

build({
    entryPoints: ['./src/index.js'],
    outfile: 'dist/build.js',
    bundle: true,
    platform: 'node',
    logLevel: 'info',
});