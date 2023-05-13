# OS_IMAGES=("opensuse/tumbleweed" "ubuntu" "richxsl/rhel7" "debian" "centos:7")
OS_IMAGES=("richxsl/rhel7")

# docker run -it -v $(pwd):/var/run/scan --entrypoint /var/run/scan/dist/scan.sh ubuntu

for image in "${OS_IMAGES[@]}"; do
  echo
  echo "---------------------------------------"
  echo "Scanning $image"
  docker run -it -v $(pwd):/var/run/scan --entrypoint /var/run/scan/dist/scan.sh $image
  echo "---------------------------------------"
  echo
done