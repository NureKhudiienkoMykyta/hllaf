package ua.nure.lab3

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.Spinner
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import ua.nure.lab3.data.model.Category
import ua.nure.lab3.data.network.RetrofitClient
import ua.nure.lab3.data.network.TokenManager


class MainActivity : AppCompatActivity() {
    private lateinit var etSearch: EditText
    private lateinit var spinnerCategories: Spinner
    private lateinit var rvPosts: RecyclerView
    private lateinit var btnCreatePost: Button
    private lateinit var btnLogout: Button

    private lateinit var postAdapter: PostAdapter
    private var categoriesList = mutableListOf<Category>()

    private var currentSearchText: String? = null
    private var currentCategoryId: Int? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        etSearch = findViewById(R.id.etSearch)
        spinnerCategories = findViewById(R.id.spinnerCategories)
        rvPosts = findViewById(R.id.rvPosts)
        btnCreatePost = findViewById(R.id.btnCreatePost)
        btnLogout = findViewById(R.id.btnLogout)

        rvPosts.layoutManager = LinearLayoutManager(this)
        postAdapter = PostAdapter(emptyList()) { post ->
            val intent = Intent(this, PostDetailActivity::class.java)
            intent.putExtra("POST_ID", post.id)
            startActivity(intent)
        }
        rvPosts.adapter = postAdapter

        etSearch.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(p0: Editable?) {}
            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {}

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                currentSearchText = p0?.toString()?.trim().orEmpty()
                loadPosts()
            }
        })

        spinnerCategories.onItemSelectedListener =
            object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>?,
                    view: android.view.View?,
                    position: Int,
                    id: Long
                ) {
                    val selectedCategory = categoriesList[position]
                    currentCategoryId =
                        if (selectedCategory.id == -1) null else selectedCategory.id
                    loadPosts()
                }

                override fun onNothingSelected(p0: AdapterView<*>?) {}
            }

        btnLogout.setOnClickListener {
            TokenManager.clearAuthData(this)
            startActivity(Intent(this, AuthActivity::class.java))
            finish()
        }

        btnCreatePost.setOnClickListener {
            val intent = Intent(this, EditPostActivity::class.java)
            startActivity(intent)
        }

        loadCategories()
        loadPosts()
    }

    fun loadCategories() {
        lifecycleScope.launch {
            try {
                val response = withContext(Dispatchers.IO) {
                    RetrofitClient.apiService.getCategories()
                }

                categoriesList.clear()

                categoriesList.add(Category(id = -1, name = "Усі категорії"))
                categoriesList.addAll(response.categories)

                val names = categoriesList.map { it.name }
                val spinnerAdapter =
                    ArrayAdapter(this@MainActivity, android.R.layout.simple_spinner_item, names)
                spinnerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                spinnerCategories.adapter = spinnerAdapter
            } catch (e: Exception) {
                e.printStackTrace()
                Toast.makeText(
                    this@MainActivity,
                    "Помилка завантаження категорій",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }

    fun loadPosts() {
        lifecycleScope.launch {
            try {
                val response = withContext(Dispatchers.IO) {
                    RetrofitClient.apiService.getPosts(currentSearchText, currentCategoryId)
                }

                postAdapter.updateData(response.posts)
            } catch (e: Exception) {
                e.printStackTrace()
                Toast.makeText(
                    this@MainActivity,
                    "Помилка завантаження постів: ${e.localizedMessage}",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }
}