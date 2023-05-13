#!/bin/sh

# set -o errexit
# set -o nounset
# set -o pipefail

temp_file=$(mktemp)

kernel=""
kernelVersion=""

if command -v "uname" > /dev/null; then
  kernel="$(uname -s)"
  kernelVersion="$(uname -r)"
fi

try_command () {
  if ! command -v "$1" > /dev/null; then
    return 1
  fi
  echo ">\$ $2"  >> $temp_file 2>&1
  printf "\n" >> $temp_file 2>&1
  eval $2 >> $temp_file 2>&1
  printf "\n\n" >> $temp_file 2>&1
}

log () {
  echo "$1" >> $temp_file
  printf "\n\n" >> $temp_file
}

send_to_server () {
  curl -s -X POST -d @$temp_file {{ingestUrl}}
}

# wmic product get name, version
