package ua.nure.lab3

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import ua.nure.lab3.data.model.CreateCommentRequest
import ua.nure.lab3.data.network.RetrofitClient
import ua.nure.lab3.data.network.TokenManager

class PostDetailActivity : AppCompatActivity() {
    private lateinit var layoutAuthorActions: LinearLayout
    private lateinit var btnEditPost: Button
    private lateinit var btnDeletePost: Button

    private lateinit var tvDetailTitle: TextView
    private lateinit var tvDetailCategory: TextView
    private lateinit var tvDetailAuthor: TextView
    private lateinit var tvDetailContent: TextView

    private lateinit var etCommentInput: EditText
    private lateinit var btnSendComment: Button
    private lateinit var rvComments: RecyclerView

    private lateinit var commentAdapter: CommentAdapter
    private var postId: Int = -1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_post_detail)

        postId = intent.getIntExtra("POST_ID", -1)

        layoutAuthorActions = findViewById(R.id.layoutAuthorActions)
        btnEditPost = findViewById(R.id.btnEditPost)
        btnDeletePost = findViewById(R.id.btnDeletePost)
        tvDetailTitle = findViewById(R.id.tvDetailTitle)
        tvDetailCategory = findViewById(R.id.tvDetailCategory)
        tvDetailAuthor = findViewById(R.id.tvDetailAuthor)
        tvDetailContent = findViewById(R.id.tvDetailContent)
        etCommentInput = findViewById(R.id.etCommentInput)
        btnSendComment = findViewById(R.id.btnSendComment)
        rvComments = findViewById(R.id.rvComments)

        rvComments.layoutManager = LinearLayoutManager(this)
        commentAdapter = CommentAdapter(emptyList())
        rvComments.adapter = commentAdapter

        btnEditPost.setOnClickListener {
            val intent = Intent(this, EditPostActivity::class.java)
            intent.putExtra("POST_ID", postId)
            startActivity(intent)
        }

        btnDeletePost.setOnClickListener {
            deletePostFromServer()
        }

        btnSendComment.setOnClickListener {
            sendCommentToServer()
        }
    }
    override fun onResume() {
        super.onResume()

        loadPostDetails()
        loadComments()
    }

    fun loadPostDetails() {
        lifecycleScope.launch {
            try {
                val response = withContext(Dispatchers.IO) {
                    RetrofitClient.apiService.getPostById(postId)
                }
                val post = response.post

                tvDetailTitle.text = post.title
                tvDetailContent.text = post.content
                tvDetailCategory.text = post.category?.name
                tvDetailAuthor.text = "Автор: ${post.author?.name ?: "Анонім"}"

                val currentUserId = TokenManager.getUserId(this@PostDetailActivity)
                if (currentUserId == post.authorId) {
                    layoutAuthorActions.visibility = View.VISIBLE
                } else {
                    layoutAuthorActions.visibility = View.GONE
                }

            } catch (e: Exception) {
                e.printStackTrace()
                Toast.makeText(this@PostDetailActivity, "Помилка завантаження статті", Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun loadComments() {
        lifecycleScope.launch {
            try {
                val response = withContext(Dispatchers.IO) {
                    RetrofitClient.apiService.getPostComments(postId)
                }
                commentAdapter.updateData(response.comments)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    fun sendCommentToServer() {
        val commentText = etCommentInput.text.toString().trim()
        if (commentText.isEmpty()) {
            Toast.makeText(this, "Введіть текст коментаря!", Toast.LENGTH_SHORT).show()
            return
        }

        val token = TokenManager.getToken(this) ?: ""
        val requestBody = CreateCommentRequest(commentText)

        lifecycleScope.launch {
            try {
                withContext(Dispatchers.IO) {
                    RetrofitClient.apiService.createComment(token, postId, requestBody)
                }
                etCommentInput.text.clear()
                loadComments()
                Toast.makeText(this@PostDetailActivity, "Коментар додано!", Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                e.printStackTrace()
                Toast.makeText(this@PostDetailActivity, "Помилка додавання коментаря", Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun deletePostFromServer() {
        val token = TokenManager.getToken(this) ?: ""
        lifecycleScope.launch {
            try {
                withContext(Dispatchers.IO) {
                    RetrofitClient.apiService.deletePost(token, postId)
                }
                Toast.makeText(this@PostDetailActivity, "Пост успішно видалено", Toast.LENGTH_SHORT).show()
                finish()
            } catch (e: Exception) {
                e.printStackTrace()
                Toast.makeText(this@PostDetailActivity, "Не вдалося видалити пост", Toast.LENGTH_SHORT).show()
            }
        }
    }
}