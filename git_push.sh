#!/usr/bin/env bash


git add .
# if there is 0 argument given to this shell script
if [ $# -eq 0 ]
then
    git commit -m "update"
else
    git commit -m "$1"
fi
git push
