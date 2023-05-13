#!/bin/sh

temp_file=$(mktemp)

try_command () {
    if ! command -v "$1" > /dev/null; then
        return 1
    fi
    echo ">\$ $2\n"  >> $temp_file 2>&1
    eval $2 >> $temp_file 2>&1
    echo "\n" >> $temp_file 2>&1
}

try_command "apt" "apt list --installed"

try_command "rpmquery" "rpmquery -qa"

wc -c $temp_file

rm "$temp_file"