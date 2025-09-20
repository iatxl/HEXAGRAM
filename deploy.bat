@echo off
echo Building frontend...
cd frontend
npm run build
cd ..

echo Creating dist directory...
if not exist "dist" mkdir dist

echo Copying build files...
xcopy /E /I /Y frontend\dist\* dist\

echo Build completed successfully!
echo.
echo Next steps:
echo 1. Install Vercel CLI: npm i -g vercel
echo 2. Login to Vercel: vercel login
echo 3. Deploy: vercel --prod
