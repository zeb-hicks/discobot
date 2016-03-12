read -p "Enter your github username: " USER
read -p "Enter the comment/message for this commit: " MESSAGE
git remote set-url origin https://$USER@github.com/zeb-hicks/atotycoon.git
git add .
git commit -am "$MESSAGE"
git push -u origin master