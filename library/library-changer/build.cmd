@echo off
pushd library-changer
dotnet publish -c Release
popd

rmdir /s /q dist
mkdir dist

xcopy /y /e bin\Release\net6.0\publish dist\
xcopy dist\library-changer.exe ..\
xcopy dist\library-changer.dll ..\
xcopy dist\library-changer.runtimeconfig.json ..\