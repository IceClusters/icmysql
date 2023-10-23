const fs = require('fs');
const { build } = require('esbuild');

// if dist directory doesn't exist, create it
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// The metabuild.js is for know if the file exist and know if the server is using a compiled version, we create a new file and don't find the build.js to avoid to load a full build in the server memory
fs.writeFileSync('dist/metabuild.js', '//DONT REMOVE THIS FILE', 'utf-8');
build({
    entryPoints: ['./src/index.js'],
    outfile: 'dist/build.js',
    bundle: true,
    platform: 'node',
    logLevel: 'info',
});