echo "Enter commit message: "
read -r message
echo "The commit message is: $message"
npm run build
git add .
git commit -am "$message"
git push origin master
#git push heroku master
firebase deploy