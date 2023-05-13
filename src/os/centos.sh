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

