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
