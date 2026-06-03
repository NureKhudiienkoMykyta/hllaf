package ua.nure.lab3.data.network

import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query
import ua.nure.lab3.data.model.AuthResponse
import ua.nure.lab3.data.model.CategoryResponse
import ua.nure.lab3.data.model.CommentsResponse
import ua.nure.lab3.data.model.CreateCommentRequest
import ua.nure.lab3.data.model.CreateCommentResponse
import ua.nure.lab3.data.model.CreatePostRequest
import ua.nure.lab3.data.model.CreatePostResponse
import ua.nure.lab3.data.model.LoginRequest
import ua.nure.lab3.data.model.MessageResponse
import ua.nure.lab3.data.model.PostListResponse
import ua.nure.lab3.data.model.RegisterRequest
import ua.nure.lab3.data.model.SinglePostResponse

interface BlogApiService {
    @POST("auth/registration")
    suspend fun register(
        @Body request: RegisterRequest
    ): AuthResponse

    @POST("auth/login")
    suspend fun login(
        @Body request: LoginRequest
    ): AuthResponse

    @GET("category")
    suspend fun getCategories(): CategoryResponse

    @GET("post")
    suspend fun getPosts(
        @Query("search") search: String?,
        @Query("categoryId") categoryId: Int?
    ): PostListResponse

    @GET("post/{id}")
    suspend fun getPostById(
        @Path("id") id: Int
    ): SinglePostResponse


    @POST("post")
    suspend fun createPost(
        @Header("Authorization") token: String,
        @Body request: CreatePostRequest
    ): CreatePostResponse


    @PUT("post/{id}")
    suspend fun updatePost(
        @Header("Authorization") token: String,
        @Path("id") id: Int,
        @Body request: CreatePostRequest
    ): CreatePostResponse


    @DELETE("post/{id}")
    suspend fun deletePost(
        @Header("Authorization") token: String,
        @Path("id") id: Int
    ): MessageResponse

    @GET("post/{postId}/comments")
    suspend fun getPostComments(
        @Path("postId") postId: Int
    ): CommentsResponse

    @POST("post/{postId}/comments")
    suspend fun createComment(
        @Header("Authorization") token: String,
        @Path("postId") postId: Int,
        @Body request: CreateCommentRequest
    ): CreateCommentResponse
}