package ua.nure.lab3.data.model

data class CommentAuthor(val name: String)

data class Comment(
    val id: Int,
    val content: String,
    val postId: Int,
    val authorId: Int,
    val createdAt: String,
    val updatedAt: String,
    val author: CommentAuthor? = null
)

data class CreateCommentRequest(
    val content: String
)

data class CommentsResponse(
    val comments: List<Comment>
)

data class CreateCommentResponse(
    val message: String,
    val comment: Comment
)