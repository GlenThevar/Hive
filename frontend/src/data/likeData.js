export function convertToLikeCount(data) {
  const [names, profileUrls, address] = data;

  return names.map((name, index) => ({
    id: index,
    address: address[index],
    name: name,
    profilePhoto: profileUrls[index],
  }));
}
