for i in "$@"
do
case $i in
    -m|--message)
    MESSAGE="${i#*=}"
    shift
    ;;
    *)
    ;;
esac
done
echo "Commit with message = ${MESSAGE}"
if [[ -n $1 ]]; then
    echo "Last line of file specified as non-opt/last argument:"
    tail -1 $1
fi
git add .
git commit -a -m "${MESSAGE}"
git push -u origin master