
scan_npm () {
  try_command "npm" "npm list --depth=6"
}

scan_npm
