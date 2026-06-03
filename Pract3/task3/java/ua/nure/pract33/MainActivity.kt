package ua.nure.pract33

import android.net.Uri
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private val pickFileLauncher =
        registerForActivityResult(ActivityResultContracts.GetContent(), { uri: Uri? ->
            if (uri != null) {
                calculateFileStats(uri)
            }
        })

    private lateinit var btnSelectFile: Button
    private lateinit var tvResult: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btnSelectFile = findViewById(R.id.btnSelectFile)
        tvResult = findViewById(R.id.tvResult)


        btnSelectFile.setOnClickListener {
            pickFileLauncher.launch("text/plain")
        }
    }

    fun calculateFileStats(uri: Uri) {
        contentResolver.openInputStream(uri)?.bufferedReader()?.use { reader ->
            val fullText = reader.readText()

            var lettersCount = 0
            var spacesCount = 0
            var punctuationCount = 0

            for (char in fullText) {
                if (char.isLetter()) {
                    lettersCount++
                } else if (char.isWhitespace()) {
                    spacesCount++
                } else {
                    punctuationCount++
                }
            }

            tvResult.text =
                "Літер: $lettersCount, Пробілів: $spacesCount, Знаків: $punctuationCount, Всього символів: ${fullText.length}"
        }
    }
}