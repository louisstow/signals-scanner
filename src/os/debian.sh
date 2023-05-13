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
