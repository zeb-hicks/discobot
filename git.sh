echo "Commit with message: $@"
git add .
git commit -a -m "$@"
git push -u origin master