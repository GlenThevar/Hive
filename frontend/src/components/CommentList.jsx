import IndivisualComment from "./IndivisualComment";

const CommentList = ({ comments, id, profileUserId }) => {
  return (
    <section className="bg-base-100 py-8 mt-0 pb-0">
      
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
        <p className="text-left text-sm font-secondary font-bold">Comment Section ({comments.length})</p>
        </div>

        {comments.map((comment) => (
          <div key={comment.id} className="mb-2">
            <IndivisualComment comment={comment} id={id} index={comment.id} profileUserId={profileUserId}/>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentList;
