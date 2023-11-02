#!/bin/bash
set -e

# Parse command-line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --USER_EMAIL) USER_EMAIL="$2"; shift ;;
        --AUTH_TOKEN) AUTH_TOKEN="$2"; shift ;;
        --REPO_NAME) REPO_NAME="$2"; shift ;;
        --BASE_BRANCH) BASE_BRANCH="$2"; shift ;;
        --PACKAGE) PACKAGE="$2"; shift ;;
        --PR_BRANCH) PR_BRANCH="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

git clone https://x-token-auth:$AUTH_TOKEN@bitbucket.org/$REPO_NAME.git .
git config user.email $USER_EMAIL
git config --add --bool push.autoSetupRemote true
git checkout $BASE_BRANCH && git pull
git checkout -b $PR_BRANCH
npm ci --silent
npm install $PACKAGE --silent
git add package.json package-lock.json
git commit -m "update $PACKAGE"
git push
