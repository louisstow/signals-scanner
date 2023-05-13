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
