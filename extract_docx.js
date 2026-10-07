const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const AdmZip = require('adm-zip'); // Let's check if adm-zip is installed. If not, I can just use PowerShell to extract all to txt.
