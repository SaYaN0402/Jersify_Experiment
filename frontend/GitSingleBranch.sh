#!/bin/bash
# Author: Md Omar Faruk Ali 
URL=$1
FolderName=$(echo $URL | awk -F'/' '{sub(/\.git$/, "", $5); print $5}')

git clone $URL
cd $FolderName

# Add the original repo as a remote
git remote add upstream $URL

echo -e "\n"
read -p "Enter your Branch name (in your repo): " branch

# Fetch all branches from the original repo
git fetch upstream

# Creating you branch
git branch --track "$branch" "upstream/$branch"

# opening your branch
git checkout $branch

# deleting main
git branch -d main