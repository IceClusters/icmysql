const fs = require('fs');
const path = require('path');
const { ParseError } = require('../errors/Parser.js');

async function FileExist(path) {
    return await fs.existsSync(path);
}

async function CreateFile(path, data) {
    await fs.writeFileSync(path, data);
}

async function ReadFile(path) {
    return (await fs.promises.readFile(path)).toString();
}

async function ReadDir(path) {
    return (await fs.readdirSync(path));
}

async function DeleteFile(path) {
    await fs.unlinkSync(path);
}

async function CreateDir(path) {
    await fs.mkdirSync(path);
}

async function DirExist(path) {
    return await fs.existsSync(path);
}

async function AppendData(path, data) {
    if (!(await FileExist(path))) return;
    await fs.appendFileSync(path, data);
}

async function ModifyData(path, data) {
    if (!(await FileExist(path))) return;
    await fs.promises.writeFile(path, data);
}

async function CreateDirRecursive(path) {
    await fs.mkdirSync(path, { recursive: true });
}

async function CreateIfNotExist(pathFile, data) {
    if (!(await FileExist(path))) {
        try {
            const directoryPath = path.dirname(pathFile);
            await fs.mkdirSync(directoryPath, { recursive: true });
            await fs.writeFileSync(pathFile, data);

        } catch (err) {
            ParseError(`Can't create file at "${pathFile}": ${err.message}`);
        }
    }
}

async function GetOldestFiles(dirPath, numFilesToKeep) {
    try {
        if (!(await DirExist(dirPath))) return [];
        const files = await ReadDir(dirPath);
        const fileDetails = [];

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stats = await fs.promises.stat(filePath);
            fileDetails.push({ name: file, date: stats.birthtime });
        }

        const sortedFiles = fileDetails.sort((a, b) => a.date - b.date);
        const filesToDelete = sortedFiles.slice(0, Math.max(0, sortedFiles.length - numFilesToKeep));
        return filesToDelete;
    } catch (err) {
        throw err;
    }
}

module.exports = { FileExist, CreateFile, ReadFile, ReadDir, DeleteFile, CreateDir, DirExist, AppendData, ModifyData, CreateDirRecursive, CreateIfNotExist, GetOldestFiles }