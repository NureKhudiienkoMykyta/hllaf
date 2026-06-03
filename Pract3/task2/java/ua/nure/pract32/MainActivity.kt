package ua.nure.pract32

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var tvCard1: TextView
    private lateinit var tvCard2: TextView
    private lateinit var tvCard3: TextView
    private lateinit var tvAttempts: TextView
    private lateinit var etGuess: EditText
    private lateinit var btnAction: Button

    private val ranks = listOf("6", "7", "8", "9", "10")
    private val suits = listOf("Чирва", "Бубна", "Хреста", "Піка")

    private var hiddenCards = mutableListOf<String>()
    private var attemptsLeft = 3
    private var isGameOver = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        tvCard1 = findViewById(R.id.tvCard1)
        tvCard2 = findViewById(R.id.tvCard2)
        tvCard3 = findViewById(R.id.tvCard3)
        tvAttempts = findViewById(R.id.tvAttempts)
        etGuess = findViewById(R.id.etGuess)
        btnAction = findViewById(R.id.btnAction)

        startGame()

        btnAction.setOnClickListener {
            if (isGameOver) {
                startGame()
            } else {
                checkPlayerGuess()
            }
        }
    }

    fun startGame() {
        attemptsLeft = 3
        isGameOver = false

        tvAttempts.text = "Залишилось спроб $attemptsLeft"
        etGuess.visibility = View.VISIBLE
        etGuess.text.clear()
        btnAction.text = "Перевірити"

        tvCard1.text = "?"
        tvCard2.text = "?"
        tvCard3.text = "?"

        hiddenCards.clear()

        while (hiddenCards.size < 3) {
            val rank = ranks.random()
            val suit = suits.random()
            val card = "$rank $suit"

            if (!hiddenCards.contains(card)) {
                hiddenCards.add(card)
            }
        }
    }

    fun checkPlayerGuess() {
        val playerInput = etGuess.text.toString()

        var indexGuessed = -1

        for (i in 0 until hiddenCards.size) {
            if (hiddenCards[i] == playerInput) {
                indexGuessed = i
                break
            }
        }

        if (indexGuessed != -1) {
            when (indexGuessed) {
                0 -> tvCard1.text = hiddenCards[0]
                1 -> tvCard2.text = hiddenCards[1]
                2 -> tvCard3.text = hiddenCards[2]
            }
            endGame(true)
        } else {
            attemptsLeft--
            tvAttempts.text = "Залишилось спроб: $attemptsLeft"
            etGuess.text.clear()

            if (attemptsLeft <= 0) {
                tvCard1.text = hiddenCards[0]
                tvCard2.text = hiddenCards[1]
                tvCard3.text = hiddenCards[2]

                endGame(false)
            }
        }
    }

    fun endGame(victory: Boolean) {
        isGameOver = true
        etGuess.visibility = View.GONE

        if (victory) {
            tvAttempts.text = "Ви виграли"
        } else {
            tvAttempts.text = "Ви програли"
        }

        btnAction.text = "Нова гра"
    }
}