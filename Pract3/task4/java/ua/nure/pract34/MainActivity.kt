package ua.nure.pract34

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import android.net.Uri
class MainActivity : AppCompatActivity() {

    private lateinit var tvContent: TextView
    private lateinit var etKey: EditText
    private var fileText = ""

    private val ukrLower = "абвгґдеєжзийіїклмнопрстуфхцчшщьюя".toCharArray()
    private val ukrUpper = "АБВГҐДЕЄЖЗИЙІЇКЛМНОПРСТУФХЦЧШЩЬЮЯ".toCharArray()
    private val pickFileLauncher =
        registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
            if (uri != null) {
                fileText =
                    contentResolver.openInputStream(uri)?.bufferedReader()?.use { it.readText() }
                        ?: ""
                tvContent.text = "Файл успішно завантажено! Введіть крок та оберіть дію."
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)


        tvContent = findViewById(R.id.tvContent)
        etKey = findViewById(R.id.etKey)

        val btnLoadFile = findViewById<Button>(R.id.btnLoadFile)
        val btnEncrypt = findViewById<Button>(R.id.btnEncrypt)
        val btnDecrypt = findViewById<Button>(R.id.btnDecrypt)

        btnLoadFile.setOnClickListener {
            pickFileLauncher.launch("text/plain")
        }

        btnEncrypt.setOnClickListener {
            val key = etKey.text.toString().toIntOrNull()

            if (key != null) {
                val encrypted = encryptData(fileText, key)
                tvContent.text = encrypted
            }
        }

        btnDecrypt.setOnClickListener {
            val key = etKey.text.toString().toIntOrNull()
            if (key != null) {
                val decrypted = decryptData(fileText, key)
                tvContent.text = decrypted
            }
        }
    }

    private fun encryptData(text: String, key: Int): String {
        val result = StringBuilder()

        for (char in text) {
            if (ukrLower.contains(char)) {
                val currentIndex = ukrLower.indexOf(char)
                val newIndex = (currentIndex + key) % ukrLower.size
                result.append(ukrLower[newIndex])
            } else if (ukrUpper.contains(char)) {
                val currentIndex = ukrUpper.indexOf(char)
                val newIndex = (currentIndex + key) % ukrUpper.size
                result.append(ukrUpper[newIndex])
            } else {
                result.append(char)
            }
        }
        return result.toString()
    }

    private fun decryptData(text: String, key: Int): String {
        val result = StringBuilder()

        for (char in text) {
            if (ukrLower.contains(char)) {
                val currentIndex = ukrLower.indexOf(char)
                val newIndex = (currentIndex - key + ukrLower.size) % ukrLower.size
                result.append(ukrLower[newIndex])
            } else if (ukrUpper.contains(char)) {
                val currentIndex = ukrUpper.indexOf(char)
                val newIndex = (currentIndex - key + ukrUpper.size) % ukrUpper.size
                result.append(ukrUpper[newIndex])
            } else {
                result.append(char)
            }
        }
        return result.toString()
    }
}