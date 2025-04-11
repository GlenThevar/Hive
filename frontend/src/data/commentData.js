import { FormatDateNow } from "../utils/format/date";

export function convertToLikeCount(
  commentUserAddress,
  commentUserName,
  commentDate,
  commentText,
  commentLikeCount,
  commentUserProfilePicture
) {
  return commentUserAddress.map((name, index) => ({
    id: index,
    userAddress: name,
    userName: commentUserName[index],
    userImage: commentUserProfilePicture[index],
    date: FormatDateNow(commentDate[index]),
    text: commentText[index],
    likeCount: commentLikeCount[index],
  }));
}
