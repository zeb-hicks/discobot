read -p "Enter your github username: " USER
read -p "Enter the comment/message for this commit: " MESSAGE
git remote set-url origin https://$USER@github.com/zeb-hicks/discobot.git
git commit --interactive -m "$MESSAGE"
git push -u origin master