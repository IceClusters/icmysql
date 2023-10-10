@echo off
setlocal

choice /c yn /m "Do you want to build all projects? (y/n) "
if errorlevel 2 (
    echo Continuing without building other projects...
    echo ------------------------------------------------
) else (
    echo ------------------------------------------------
    echo Building MySQL csharp project...
    echo ------------------------------------------------
    cd library\csharp
    .\build.cmd | more

    echo ------------------------------------------------
    cd ..\library-changer
    echo Building library changer project...
    echo ------------------------------------------------
    .\build.cmd | more
    cd ..\
    echo ------------------------------------------------
)

echo Installing dependencies
npm install | more
echo ------------------------------------------------
echo Building main nodejs project...
echo ------------------------------------------------
npm run build | more

pause

endlocal
