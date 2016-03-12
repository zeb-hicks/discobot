echo "Commit with message: \"$@\""
git add .
git commit -am "$@"
git push -u origin master