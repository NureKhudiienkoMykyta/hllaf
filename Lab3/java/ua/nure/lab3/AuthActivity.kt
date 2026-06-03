package ua.nure.lab3

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.*
import ua.nure.lab3.data.model.LoginRequest
import ua.nure.lab3.data.model.RegisterRequest
import ua.nure.lab3.data.network.RetrofitClient
import ua.nure.lab3.data.network.TokenManager


class AuthActivity : AppCompatActivity() {

    private var isLoginMode = true

    private lateinit var tvAuthTitle: TextView
    private lateinit var etName: EditText
    private lateinit var etEmail: EditText
    private lateinit var etPassword: EditText
    private lateinit var btnAuthAction: Button
    private lateinit var tvToggleMode: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val savedToken = TokenManager.getToken(this)
        if (savedToken != null) {
            navigateToMain()
            return
        }

        setContentView(R.layout.activity_auth)

        tvAuthTitle = findViewById(R.id.tvAuthTitle)
        etName = findViewById(R.id.etName)
        etEmail = findViewById(R.id.etEmail)
        etPassword = findViewById(R.id.etPassword)
        btnAuthAction = findViewById(R.id.btnAuthAction)
        tvToggleMode = findViewById(R.id.tvToggleMode)

        tvToggleMode.setOnClickListener {
            isLoginMode = !isLoginMode
            if (isLoginMode) {
                tvAuthTitle.text = "Вхід у Блог"
                btnAuthAction.text = "Увійти"
                tvToggleMode.text = "Немає акаунту? Зареєструватися"
                etName.visibility = View.GONE
            } else {
                tvAuthTitle.text = "Реєстрація"
                btnAuthAction.text = "Створити акаунт"
                tvToggleMode.text = "Вже є акаунт? Увійти"
                etName.visibility = View.VISIBLE
            }
        }

        btnAuthAction.setOnClickListener {
            handleAuthAction()
        }
    }

    fun handleAuthAction() {
        val email = etEmail.text.toString().trim()
        val password = etPassword.text.toString().trim()
        val name = etName.text.toString().trim()

        if (email.isEmpty() || password.isEmpty() || (!isLoginMode && name.isEmpty())) {
            Toast.makeText(this, "Будь ласка, заповніть усі поля!", Toast.LENGTH_SHORT).show()
            return
        }

        lifecycleScope.launch {
            try {
                val response = withContext(Dispatchers.IO) {
                    if (isLoginMode) {
                        RetrofitClient.apiService.login(LoginRequest(email, password))
                    } else {
                        RetrofitClient.apiService.register(RegisterRequest(name, email, password))
                    }
                }

                val token = response.token
                val userId = response.user?.id ?: -1
                val userName = response.user?.name ?: "Користувач"

                TokenManager.saveAuthData(this@AuthActivity, token, userId, userName)

                val successMessage = if (isLoginMode) "Успішний вхід!" else "Реєстрація успішна!"
                Toast.makeText(this@AuthActivity, successMessage, Toast.LENGTH_SHORT).show()

                navigateToMain()

            } catch (e: Exception) {
                e.printStackTrace()
                Toast.makeText(
                    this@AuthActivity,
                    "Помилка авторизації: ${e.localizedMessage}",
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }

    fun navigateToMain() {
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish()
    }
}