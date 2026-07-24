# ============================================================
# how to run 
# cd "C:\dev\shopping-app-react\Scripts"
# .\Export-Frontend-Code.ps1
#-----
#if errro then run this first: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
# Export-Frontend-Code.ps1
#
# Exports React or Next.js project source code into one file.
# Existing output file is deleted and recreated on every run.
# ============================================================

$ErrorActionPreference = "Stop"

# ------------------------------------------------------------
# CHANGE THESE PATHS
# ------------------------------------------------------------

# Root folder of your React or Next.js project
$ProjectPath = "C:\dev\shopping-app-react"

# Folder where the generated output file will be stored
$OutputFolder = "C:\dev\shopping-app-react\Scripts\output"

# Generated output file name
$OutputFileName = "frontend-source.txt"

# Complete output file path
$OutputFile = Join-Path $OutputFolder $OutputFileName

# ------------------------------------------------------------
# SOURCE-CODE AND IMPORTANT CONFIGURATION FILE EXTENSIONS
# ------------------------------------------------------------

$IncludeExtensions = @(
    # JavaScript and TypeScript
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".mjs",
    ".cjs",

    # Styling
    ".css",
    ".scss",
    ".sass",
    ".less",

    # Web files
    ".html",

    # Configuration and data
    ".json",
    ".jsonc",
    ".yml",
    ".yaml",

    # Environment example files
    ".env",

    # GraphQL
    ".graphql",
    ".gql",

    # Markdown documentation
    ".md",
    ".mdx"
)

# ------------------------------------------------------------
# FOLDERS TO IGNORE
# ------------------------------------------------------------

$IgnoreFolders = @(
    # Dependencies
    "node_modules",

    # Next.js generated folders
    ".next",
    "out",

    # React/build generated folders
    "dist",
    "build",

    # Package manager caches
    ".npm",
    ".yarn",
    ".pnpm-store",

    # Testing and coverage
    "coverage",
    "test-results",
    "playwright-report",
    "cypress",
    ".nyc_output",

    # Source control
    ".git",

    # IDE folders
    ".vs",
    ".vscode",
    ".idea",

    # Framework caches
    ".cache",
    ".turbo",
    ".parcel-cache",

    # Hosting platform folders
    ".vercel",
    ".netlify",

    # Temporary folders
    "tmp",
    "temp",

    # Script output folder
    "output"
)

# ------------------------------------------------------------
# SPECIFIC FILES TO IGNORE
# ------------------------------------------------------------

$IgnoreFiles = @(
    # Generated output
    "frontend-source.txt",
    "api-source.txt",

    # Package manager lock files
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "bun.lock",
    "bun.lockb",

    # Logs
    "npm-debug.log",
    "yarn-debug.log",
    "yarn-error.log",
    "pnpm-debug.log",

    # OS files
    ".DS_Store",
    "Thumbs.db",

    # TypeScript generated information
    "tsconfig.tsbuildinfo",

    # Next.js generated environment definition
    "next-env.d.ts"
)

# ------------------------------------------------------------
# FILE NAME PATTERNS TO IGNORE
# ------------------------------------------------------------

$IgnorePatterns = @(
    # Minified files
    "*.min.js",
    "*.min.css",
    "*.bundle.js",

    # Source maps
    "*.map",

    # Logs and temporary files
    "*.log",
    "*.tmp",
    "*.temp",
    "*.cache",

    # Backup files
    "*.bak",
    "*.backup",

    # TypeScript build information
    "*.tsbuildinfo",

    # Test snapshots
    "*.snap",

    # Generated declaration files
    "*.d.ts",

    # Secret environment files
    ".env.local",
    ".env.development.local",
    ".env.test.local",
    ".env.production.local"
)

# ------------------------------------------------------------
# BINARY AND NON-CODE FILE EXTENSIONS TO IGNORE
# ------------------------------------------------------------

$IgnoreExtensions = @(
    # Images
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".webp",
    ".svg",
    ".ico",
    ".avif",

    # Fonts
    ".woff",
    ".woff2",
    ".ttf",
    ".otf",
    ".eot",

    # Audio
    ".mp3",
    ".wav",
    ".ogg",
    ".aac",
    ".flac",

    # Video
    ".mp4",
    ".avi",
    ".mov",
    ".mkv",
    ".webm",

    # Documents
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",

    # Archives
    ".zip",
    ".rar",
    ".7z",
    ".tar",
    ".gz",

    # Executables and binaries
    ".exe",
    ".dll",
    ".bin",

    # Certificates and keys
    ".pem",
    ".key",
    ".cer",
    ".crt",
    ".pfx",

    # Database files
    ".db",
    ".sqlite",
    ".sqlite3"
)

# ------------------------------------------------------------
# VALIDATE PROJECT PATH
# ------------------------------------------------------------

if (-not (Test-Path -Path $ProjectPath -PathType Container))
{
    Write-Host ""
    Write-Host "Project folder was not found:" -ForegroundColor Red
    Write-Host $ProjectPath -ForegroundColor Yellow
    exit 1
}

# Convert project path to an absolute path
$ProjectPath = (Resolve-Path $ProjectPath).Path.TrimEnd("\")

# ------------------------------------------------------------
# CREATE OUTPUT FOLDER
# ------------------------------------------------------------

if (-not (Test-Path -Path $OutputFolder -PathType Container))
{
    New-Item `
        -ItemType Directory `
        -Path $OutputFolder `
        -Force | Out-Null
}

# Convert output folder to an absolute path
$OutputFolder = (Resolve-Path $OutputFolder).Path.TrimEnd("\")

# Rebuild the output path after resolving the folder
$OutputFile = Join-Path $OutputFolder $OutputFileName

# ------------------------------------------------------------
# DELETE OLD OUTPUT FILE
# ------------------------------------------------------------

if (Test-Path -Path $OutputFile -PathType Leaf)
{
    Remove-Item `
        -Path $OutputFile `
        -Force
}

# UTF-8 encoding without BOM
$Utf8Encoding = New-Object System.Text.UTF8Encoding($false)

# ------------------------------------------------------------
# CREATE NEW OUTPUT FILE
# ------------------------------------------------------------

$InitialContent = @"
FRONTEND SOURCE-CODE EXPORT
PROJECT: $ProjectPath
GENERATED: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

"@

[System.IO.File]::WriteAllText(
    $OutputFile,
    $InitialContent,
    $Utf8Encoding
)

# ------------------------------------------------------------
# FIND SOURCE FILES
# ------------------------------------------------------------

$Files = Get-ChildItem `
    -Path $ProjectPath `
    -Recurse `
    -File `
    -Force `
    -ErrorAction SilentlyContinue |
Where-Object {

    $CurrentFile = $_

    # Ignore the generated output file
    if ($CurrentFile.FullName -eq $OutputFile)
    {
        return $false
    }

    # Ignore explicitly listed filenames
    if ($IgnoreFiles -contains $CurrentFile.Name)
    {
        return $false
    }

    # Ignore non-code and binary extensions
    if ($IgnoreExtensions -contains $CurrentFile.Extension.ToLowerInvariant())
    {
        return $false
    }

    # Include only approved source-code extensions
    if ($IncludeExtensions -notcontains $CurrentFile.Extension.ToLowerInvariant())
    {
        return $false
    }

    # Ignore matching filename patterns
    foreach ($Pattern in $IgnorePatterns)
    {
        if ($CurrentFile.Name -like $Pattern)
        {
            return $false
        }
    }

    # Get path relative to project root
    $RelativePath = $CurrentFile.FullName
    $RelativePath = $RelativePath.Substring($ProjectPath.Length)
    $RelativePath = $RelativePath.TrimStart("\")

    # Split path into folder components
    $PathParts = $RelativePath -split "\\"

    # Ignore excluded folders
    foreach ($Folder in $IgnoreFolders)
    {
        if ($PathParts -contains $Folder)
        {
            return $false
        }
    }

    return $true
} |
Sort-Object FullName

# ------------------------------------------------------------
# EXPORT FILE CONTENT
# ------------------------------------------------------------

$ExportedFileCount = 0
$SkippedFileCount = 0

foreach ($File in $Files)
{
    $RelativePath = $File.FullName
    $RelativePath = $RelativePath.Substring($ProjectPath.Length)
    $RelativePath = $RelativePath.TrimStart("\")

    $Header = @"

========================================================================================================================
FILE: $RelativePath
========================================================================================================================

"@

    [System.IO.File]::AppendAllText(
        $OutputFile,
        $Header,
        $Utf8Encoding
    )

    try
    {
        $Content = [System.IO.File]::ReadAllText(
            $File.FullName,
            $Utf8Encoding
        )

        [System.IO.File]::AppendAllText(
            $OutputFile,
            $Content + "`r`n",
            $Utf8Encoding
        )

        $ExportedFileCount++

        Write-Host "Exported: $RelativePath" -ForegroundColor DarkGray
    }
    catch
    {
        $ErrorText = @"
[FILE COULD NOT BE READ]

Reason: $($_.Exception.Message)

"@

        [System.IO.File]::AppendAllText(
            $OutputFile,
            $ErrorText,
            $Utf8Encoding
        )

        $SkippedFileCount++

        Write-Host "Skipped: $RelativePath" -ForegroundColor Yellow
    }
}

# ------------------------------------------------------------
# WRITE EXPORT SUMMARY INTO THE FILE
# ------------------------------------------------------------

$Footer = @"

========================================================================================================================
EXPORT COMPLETED
========================================================================================================================

FILES EXPORTED: $ExportedFileCount
FILES SKIPPED:  $SkippedFileCount
OUTPUT FILE:    $OutputFile

"@

[System.IO.File]::AppendAllText(
    $OutputFile,
    $Footer,
    $Utf8Encoding
)

# ------------------------------------------------------------
# DISPLAY RESULT
# ------------------------------------------------------------

Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host "Frontend source export completed successfully." -ForegroundColor Green
Write-Host "Files exported : $ExportedFileCount" -ForegroundColor Green
Write-Host "Files skipped  : $SkippedFileCount" -ForegroundColor Yellow
Write-Host "Output file    : $OutputFile" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Green
