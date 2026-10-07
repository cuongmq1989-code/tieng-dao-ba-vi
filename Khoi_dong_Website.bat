@echo off
title Khoi dong Di San So Ba Vi
echo ===================================================
echo   DANG KHOI DONG HE THONG "DI SAN SO BA VI"
echo ===================================================
echo.
echo 1. He thong dang mo trinh duyet...
start http://localhost:3000

echo 2. Dang bat may chu (Backend) de luu file Excel...
echo.
echo VUI LONG KHONG TAT CUA SO NAY TRONG SUOT QUA TRINH SU DUNG WEB!
echo (Ban co the thu nho cua so nay xuong)
echo ===================================================
echo.
node server.js
pause
