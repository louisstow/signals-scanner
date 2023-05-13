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
  curl -X POST -d @$temp_file http://localhost:3000/scan
}

# wmic product get name, version
get_centos () {
  if [ -f "/etc/os-release" ]; then
    . /etc/os-release
    log ">@ $ID | $VERSION_ID | $PRETTY_NAME | $kernel | $kernelVersion"
  fi
}

is_centos () {
  if [ -f "/etc/os-release" ]; then
    . /etc/os-release
    if [ "$ID" = "centos" ]; then
      return 1
    fi
  fi

  return 0
}

scan_centos () {
  if is_centos; then
    return 0
  fi
  get_centos
  try_command "rpm" "rpm -qa"
  try_command "yum" "yum list installed"
}

scan_centos

get_debian () {
  if [ -f "/etc/os-release" ]; then
    . /etc/os-release
    log ">@ $ID | $VERSION_ID | $PRETTY_NAME | $kernel | $kernelVersion"
  fi
}

is_debian () {
  if [ -f "/etc/os-release" ]; then
    . /etc/os-release
    if [ "$ID" = "debian" ]; then
      return 1
    fi
  fi

  return 0
}

scan_debian () {
  if is_debian; then
    return 0
  fi
  get_debian
  try_command "apt" "apt list --installed"
  try_command "dpkg" "dpkg --list"
}

scan_debian
get_osx () {
  version=$(sw_vers | grep 'ProductVersion:' | awk '{print $2}')
  pretty="macOS $version"
  log ">@ macOS | $version | $pretty | $kernel | $kernelVersion"
}

is_osx () {
  if command -v "sw_vers" > /dev/null; then
    return 1
  fi

  return 0
}

scan_osx () {
  if is_osx; then
    return 0
  fi
  get_osx
  try_command "brew" "brew list --versions"
  try_command "system_profiler" "system_profiler SPApplicationsDataType"
}

scan_osx
get_redhat () {
  if [ -f "/etc/os-release" ]; then
    . /etc/os-release
    name="$ID"
    if [ "$ID" = "rhel" ]; then
      name="redhat"
    fi
    log ">@ $name | $VERSION_ID | $PRETTY_NAME | $kernel | $kernelVersion"
  fi
}

is_redhat () {
  if [ -f "/etc/os-release" ]; then
    . /etc/os-release
    if [ "$ID" = "rhel" ]; then
      return 1
    fi
  fi

  return 0
}

scan_redhat () {
  if is_redhat; then
    return 0
  fi
  get_redhat
  try_command "rpm" "rpm -qa"
  try_command "yum" "yum list installed"
}

scan_redhat
get_suse () {
  if [ -f "/etc/os-release" ]; then
    . /etc/os-release
    part=$(echo $ID | cut -d'-' -f1)
    log ">@ $part | $VERSION_ID | $PRETTY_NAME | $kernel | $kernelVersion"
  fi
}

is_suse () {
  if [ -f "/etc/os-release" ]; then
    . /etc/os-release
    part=$(echo $ID | cut -d'-' -f1)
    if [ "$part" = "opensuse" ]; then
      return 1
    fi
  fi

  return 0
}

scan_suse () {
  if is_suse; then
    return 0
  fi
  get_suse
  try_command "rpm" "rpm -qa"
}

scan_suse
get_ubuntu () {
  if [ -f "/etc/lsb-release" ]; then
    . /etc/lsb-release
    log ">@ $DISTRIB_ID | $DISTRIB_RELEASE | $DISTRIB_DESCRIPTION | $kernel | $kernelVersion"
  fi
}

is_ubuntu () {
  if [ -f "/etc/lsb-release" ]; then
    . /etc/lsb-release
    if [ "$DISTRIB_ID" = "Ubuntu" ]; then
      return 1
    fi
  fi

  return 0
}

scan_ubuntu () {
  if is_ubuntu; then
    return 0
  fi
  get_ubuntu
  try_command "apt" "apt list --installed"
  try_command "dpkg" "dpkg --list"
}

scan_ubuntu

scan_npm () {
  try_command "npm" "npm list --depth=6"
}

scan_npm

wc -c "$temp_file"

cat "$temp_file"

rm "$temp_file"