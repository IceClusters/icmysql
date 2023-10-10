@echo off
pushd Server
dotnet publish -c Release
popd

rmdir /s /q dist
mkdir dist

xcopy /y /e Server\bin\Release\netstandard2.0\publish dist\
xcopy dist\MySQL.net.dll ..\