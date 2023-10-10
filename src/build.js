const fs = require('fs');
const { build } = require('esbuild');

// if dist directory doesn't exist, create it
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}
fs.writeFileSync('dist/metabuild.js', '//DONT REMOVE THIS FILE', 'utf-8');
build({
    entryPoints: ['./src/index.js'],
    outfile: 'dist/build.js',
    bundle: true,
    platform: 'node',
    logLevel: 'info',
});