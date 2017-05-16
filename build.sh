#!/bin/bash
git pull
bundle exec middleman build
grunt addLanguageSel