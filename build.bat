git pull
echo "building ..."
bundle exec middleman build
echo "add language selection ..."
grunt addLanguageSel
echo "DONE"