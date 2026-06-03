package ua.nure.lab3.data.model

data class PostAuthor(val name: String)

data class Post(
    val id: Int,
    val title: String,
    val content: String,
    val authorId: Int,
    val categoryId: Int,
    val createdAt: String,
    val updatedAt: String,
    val category: Category? = null,
    val author: PostAuthor? = null
)

data class CreatePostRequest(
    val title: String,
    val content: String,
    val categoryId: Int
)

data class PostListResponse(
    val posts: List<Post>
)


data class SinglePostResponse(
    val post: Post
)

data class CreatePostResponse(
    val message: String,
    val post: Post
)
