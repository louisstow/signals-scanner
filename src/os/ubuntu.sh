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
