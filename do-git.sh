for i in "$@"
do
case $i in
    -m|--message)
    MESSAGE="$2"
    shift
    ;;
    *)
    ;;
esac
done
echo "Commit with message: ${MESSAGE}"
git add .
git commit -a -m "${MESSAGE}"
git push -u origin master