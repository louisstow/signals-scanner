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
