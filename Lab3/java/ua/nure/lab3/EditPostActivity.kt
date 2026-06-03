package ua.nure.lab3

import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.Spinner
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import ua.nure.lab3.data.model.Category
import ua.nure.lab3.data.model.CreatePostRequest
import ua.nure.lab3.data.network.RetrofitClient
import ua.nure.lab3.data.network.TokenManager


class EditPostActivity : AppCompatActivity() {
    private lateinit var tvScreenTitle: TextView
    private lateinit var etPostTitle: EditText
    private lateinit var etPostContent: EditText
    private lateinit var spinnerCategory: Spinner
    private lateinit var btnSavePost: Button

    private var categoriesList = mutableListOf<Category>()
    private var selectedCategoryId: Int? = null

    private var postIdToEdit: Int = -1
    private var isEditMode = false
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_edit_post)

        tvScreenTitle = findViewById(R.id.tvScreenTitle)
        etPostTitle = findViewById(R.id.etPostTitle)
        etPostContent = findViewById(R.id.etPostContent)
        spinnerCategory = findViewById(R.id.spinnerPostCategory)
        btnSavePost = findViewById(R.id.btnSavePost)

        postIdToEdit = intent.getIntExtra("POST_ID", -1)
        isEditMode = postIdToEdit != -1

        if (isEditMode) {
            tvScreenTitle.text = "Редагування поста"
            btnSavePost.text = "Зберегти зміни"
        }

        loadCategoriesAndData()

        btnSavePost.setOnClickListener {
            savePostToServer()
        }
    }

    fun loadCategoriesAndData() {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val catResponse = withContext(Dispatchers.IO) {
                    RetrofitClient.apiService.getCategories()
                }
                categoriesList.clear()
                categoriesList.addAll(catResponse.categories)

                val names = categoriesList.map { it.name }
                val spinnerAdapter =
                    ArrayAdapter(this@EditPostActivity, android.R.layout.simple_spinner_item, names)
                spinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                spinnerCategory.adapter = spinnerAdapter

                spinnerCategory.onItemSelectedListener =
                    object : AdapterView.OnItemSelectedListener {
                        override fun onItemSelected(
                            p0: AdapterView<*>?,
                            p1: View?,
                            position: Int,
                            p3: Long
                        ) {
                            selectedCategoryId = categoriesList[position].id
                        }

                        override fun onNothingSelected(p0: AdapterView<*>?) {}
                    }

                if (isEditMode) {
                    val postResponse = withContext(Dispatchers.IO) {
                        RetrofitClient.apiService.getPostById(postIdToEdit)
                    }
                    val post = postResponse.post
                    etPostTitle.setText(post.title)
                    etPostContent.setText(post.content)

                    val categoryIndex = categoriesList.indexOfFirst { it.id == post.categoryId }
                    if (categoryIndex != -1) {
                        spinnerCategory.setSelection(categoryIndex)
                    }
                }

            } catch (e: Exception) {
                e.printStackTrace()
                Toast.makeText(
                    this@EditPostActivity,
                    "Помилка завантаження даних",
                    Toast.LENGTH_SHORT
                )
                    .show()
            }
        }
    }

    fun savePostToServer() {
        val title = etPostTitle.text.toString().trim()
        val content = etPostContent.text.toString().trim()
        val categoryId = selectedCategoryId

        if (title.isEmpty() || content.isEmpty() || categoryId == null) {
            Toast.makeText(this, "Заповніть усі поля!", Toast.LENGTH_SHORT).show()
            return
        }

        val token = TokenManager.getToken(this) ?: ""
        val requestBody = CreatePostRequest(title, content, categoryId)

        CoroutineScope(Dispatchers.Main).launch {
            try {
                withContext(Dispatchers.IO) {
                    if (isEditMode) {
                        RetrofitClient.apiService.updatePost(token, postIdToEdit, requestBody)
                    } else {
                        RetrofitClient.apiService.createPost(token, requestBody)
                    }
                }

                Toast.makeText(this@EditPostActivity, "Успішно збережено!", Toast.LENGTH_SHORT)
                    .show()
                finish()
            } catch (e: Exception) {
                e.printStackTrace()
                Toast.makeText(
                    this@EditPostActivity,
                    "Помилка збереження: ${e.localizedMessage}",
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }
}