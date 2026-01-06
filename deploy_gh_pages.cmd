@echo off
setlocal

REM ============================================================
REM Deploy MkDocs site to GitHub Pages (Windows)
REM ------------------------------------------------------------
REM Usage:
REM   deploy_gh_pages.cmd
REM   deploy_gh_pages.cmd origin
REM   deploy_gh_pages.cmd origin gh-pages
REM
REM What it does:
REM   1) Ensures you're on a branch and working tree is clean
REM   2) Pushes your current branch to the remote
REM   3) Runs `mkdocs gh-deploy --clean` to publish to gh-pages
REM
REM Notes:
REM - You should commit first. This script will refuse to run if there are uncommitted changes.
REM - GitHub Pages must be configured to serve from the gh-pages branch in repo settings.
REM ============================================================

set "REMOTE=%~1"
if "%REMOTE%"=="" set "REMOTE=origin"

set "REMOTE_BRANCH=%~2"
if "%REMOTE_BRANCH%"=="" set "REMOTE_BRANCH=gh-pages"

REM Ensure we're running from repo root (this script lives in repo root)
cd /d "%~dp0"

REM Basic git sanity checks
git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
  echo [deploy] ERROR: Not a git repository.
  exit /b 1
)

for /f "delims=" %%B in ('git symbolic-ref --short HEAD 2^>nul') do set "CUR_BRANCH=%%B"
if not defined CUR_BRANCH (
  echo "[deploy] ERROR: Detached HEAD. Please checkout a branch (e.g. main) before deploying."
  exit /b 1
)

REM Require clean working tree (deploy should reflect committed state)
for /f "delims=" %%S in ('git status --porcelain') do (
  echo [deploy] ERROR: Working tree is not clean. Commit or stash changes first.
  git status --porcelain
  exit /b 1
)

echo [deploy] Pushing source branch "%CUR_BRANCH%" to "%REMOTE%"...
git push "%REMOTE%" "%CUR_BRANCH%"
if errorlevel 1 (
  echo [deploy] ERROR: Failed to push source branch.
  exit /b 1
)

REM Choose python to run MkDocs:
REM - If you want to override, set MKDOCS_PY before running this script.
REM - Default: use the repo author's conda env python if present, else fallback to python on PATH.
if not defined MKDOCS_PY (
  if exist "C:\Users\46100\miniconda3\envs\rpdeb\python.exe" (
    set "MKDOCS_PY=C:\Users\46100\miniconda3\envs\rpdeb\python.exe"
  ) else (
    set "MKDOCS_PY=python"
  )
)

echo [deploy] Deploying MkDocs to "%REMOTE%/%REMOTE_BRANCH%" ...
"%MKDOCS_PY%" -m mkdocs gh-deploy --clean --remote-name "%REMOTE%" --remote-branch "%REMOTE_BRANCH%"
if errorlevel 1 (
  echo [deploy] ERROR: mkdocs gh-deploy failed.
  exit /b 1
)

echo [deploy] Done. GitHub Pages may take ~1-2 minutes to update.
exit /b 0

