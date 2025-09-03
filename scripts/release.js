#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Smart versioning script that analyzes git commits to determine version bump type
 */

function getCurrentVersion() {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  return pkg.version;
}

function getCommitsSinceLastTag() {
  try {
    // Get the last tag
    const lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    // Get commits since last tag
    const commits = execSync(`git log ${lastTag}..HEAD --oneline`, { encoding: 'utf8' }).trim();
    return commits.split('\n').filter(commit => commit.length > 0);
  } catch (error) {
    // If no tags exist, get all commits
    const commits = execSync('git log --oneline', { encoding: 'utf8' }).trim();
    return commits.split('\n').filter(commit => commit.length > 0);
  }
}

function analyzeCommits(commits) {
  let hasMajor = false;
  let hasMinor = false;
  let hasPatch = false;

  for (const commit of commits) {
    const message = commit.toLowerCase();
    
    // Breaking changes (major)
    if (message.includes('breaking') || message.includes('!:') || message.includes('major:')) {
      hasMajor = true;
    }
    // Features (minor)
    else if (message.includes('feat:') || message.includes('feature:') || message.includes('add:')) {
      hasMinor = true;
    }
    // Fixes, chores, docs (patch)
    else if (message.includes('fix:') || message.includes('chore:') || message.includes('docs:')) {
      hasPatch = true;
    }
  }

  if (hasMajor) return 'major';
  if (hasMinor) return 'minor';
  if (hasPatch) return 'patch';
  return 'patch'; // Default to patch
}

function bumpVersion(type = null) {
  const currentVersion = getCurrentVersion();
  console.log(`📦 Current version: ${currentVersion}`);

  if (!type) {
    // Auto-detect version bump type
    const commits = getCommitsSinceLastTag();
    console.log(`🔍 Analyzing ${commits.length} commits since last release...`);
    
    if (commits.length === 0) {
      console.log('ℹ️  No new commits found. Skipping version bump.');
      return;
    }

    commits.forEach(commit => console.log(`  • ${commit}`));
    type = analyzeCommits(commits);
  }

  console.log(`🚀 Performing ${type} version bump...`);

  try {
    // Check if working directory is clean, if not, commit pending changes
    try {
      execSync('git diff --exit-code', { stdio: 'ignore' });
      execSync('git diff --cached --exit-code', { stdio: 'ignore' });
    } catch (error) {
      console.log('📝 Committing pending build changes...');
      execSync('git add .', { stdio: 'inherit' });
      execSync('git commit -m "chore: update generated files for release"', { stdio: 'inherit' });
    }

    // Clean build first
    console.log('🧹 Running clean build...');
    execSync('npm run build:clean', { stdio: 'inherit' });

    // Commit any new build artifacts
    try {
      execSync('git diff --exit-code', { stdio: 'ignore' });
    } catch (error) {
      console.log('📝 Committing build artifacts...');
      execSync('git add .', { stdio: 'inherit' });
      execSync('git commit -m "chore: update build artifacts for release"', { stdio: 'inherit' });
    }

    // Bump version and push
    console.log(`📈 Bumping ${type} version...`);
    execSync(`npm version ${type}`, { stdio: 'inherit' });
    
    console.log('📤 Pushing to remote...');
    execSync('git push', { stdio: 'inherit' });
    execSync('git push --tags', { stdio: 'inherit' });

    const newVersion = getCurrentVersion();
    console.log(`✅ Successfully released version ${newVersion}!`);

  } catch (error) {
    console.error('❌ Release failed:', error.message);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const versionType = args[0]; // patch, minor, major, or undefined for auto-detect

bumpVersion(versionType);
